/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const ContractListener = require('./ContractListener');
function ContractCreator (_contractName, _conf, _web3, _jsonRequester, _smartContractAddress) {
  this.contractName = _contractName;
  this.conf = _conf;
  this.web3 = _web3;
  this.jsonRequester = _jsonRequester;
  this.smartContractAddress = _smartContractAddress;

  this.getSmartContractAbi = () => {
    return this.jsonRequester.getAbi();
  };
  
  this.createInstance = () => {
    const smartContractAbi = this.getSmartContractAbi();
    const contractInstance = new this.web3.eth.Contract(smartContractAbi, this.smartContractAddress);
    return contractInstance;
  };
  
  this.createListener = (_eventDispatcher) => {
    const contractInstance = this.createInstance();
    return new ContractListener(this.contractName, contractInstance, this.conf, this.web3, _eventDispatcher);
  };
};

module.exports = ContractCreator;