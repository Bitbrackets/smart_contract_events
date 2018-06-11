/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
if(process.argv.length < 3) {
  throw new Error("App needs the environment: node ./app.js environment");
}
const environment = process.argv[2];

const Web3 = require('web3');
const errors = require('./utils/Errors');
const CONF = require('../conf')(environment);
const mongoInit = require('./mongoInit');
const DefaultEventDispatcher = require('./contract/DefaultEventDispatcher');
const ContractCreator = require('./contract/ContractCreator');
const JsonRequester = require('./json/JsonRequester');
const eventService = require('./service/eventService')(CONF);
const {info, event} = require('./log/Logger');

//Registering handler to catch unexpected errors.
errors.registerErrorHandlers();

// map to keep track of contracts we are listening
const contracts = new Map();

if(CONF.app.verbose) {
  console.log(`Starting app...`);
  console.log(`App will use this configuration:\n`, CONF.app);
}

const web3 = new Web3(new Web3.providers.WebsocketProvider(CONF.app.scUrlWs));

const listenContract = (conf, web3, contractName, contractAddress, latestBlockNumber) => {
  try {
    info(contractName, contractAddress, "STARTING", latestBlockNumber, latestBlockNumber, 'Starting to listen events.');
    const defaultEventDispatcher = new DefaultEventDispatcher(conf, web3, listenContract, eventService);
    const jsonRequester = new JsonRequester(conf.app, contractName);
    const creator = new ContractCreator(contractName, conf, web3, jsonRequester, contractAddress);
    const listener = creator.createListener(defaultEventDispatcher);
    listener.watch(latestBlockNumber);
  } catch (error) {
    console.log(`Error on listenContract: ${error}.`);
    throw error;
  }
};

mongoInit(CONF.app).then(async () => {
  console.info('Successful connection to MongoDb');
  try {
    console.info('Retrieving latestBlockNumber...');
    const latestBlockNumber = await eventService.getLatestBlockNumber();
    console.info('Start Listening from Latest BlockNumber: ', latestBlockNumber);
    
    console.info('Retrieving Contracts Configuration...');
    const contractsInformation = await eventService.fetchContractsInfo();

    console.log(`Found ${contractsInformation.length} contracts to start listening`);
    console.log("Eth Node Version: ", web3.version);

    contractsInformation.forEach(contract => {
      contracts.set(contract.address, contract);
      listenContract(CONF, web3, contract.contractName, contract.address, latestBlockNumber);  
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(err => {
  console.error('Error in app: ', err);
  process.exit(1); 
})
