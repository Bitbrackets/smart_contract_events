/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const {info, event} = require('../log/Logger');

function ContractListener(_contractName, _contractInstance, _conf, _web3, _dispatcher) {
  if (!(this instanceof ContractListener)) {
      return new ContractListener(_contractInstance, _conf, _web3);
  }
  this.contractName = _contractName;
  this.contractInstance = _contractInstance;
  this.conf = _conf;
  this.web3 = _web3;
  this.dispatcher = _dispatcher;

  /** Functions */

  this.getEventsMap = () => {
    return this.conf.events;
  };
  
  this.getEventMetadataFor = (eventName) => {
    const eventMetadata = this.getEventsMap().get(eventName);
    if(typeof eventMetadata === 'undefined') {
      throw new Error(`Listener for event ${eventName} not found.`);
    }
    return eventMetadata;
  };
  
  this.listenOnError = (error) => {
    console.error(error);
    this.dispatcher.dispatchError(event);
  }
  
  this.isConfVerbose = () => {
    return this.conf.app.verbose;
  };
  
  this.logIfConfIsVerbose = (logFunction) => {
    if(this.isConfVerbose()) {
      logFunction();
    }
  };
  
  this.createMeta = async (data, eventMetadata) => {
    const block = await this.web3.eth.getBlock(data.blockNumber);
    return {
        sourceId: data.address,
        sourceSystem: 'smart_contracts**HARDCODED**',
        eventSequenceId: data.transactionHash,
        blockNumber: data.blockNumber,
        sourceTimestampCreation: (block.timestamp + data.logIndex),
        eventWorkerId: 'nodejs_events_worker_1**HARDCODED**',
        notes: {
            blockHash: data.blockHash,
            signature: data.signature,
            id: data.id,
            transactionIndex: data.transactionIndex
        }
    };
  };
  
  this.createEventData = async (data, eventMetadata) => {
      const returnValues = data.returnValues;
      const meta = await this.createMeta(data, eventMetadata);
      const payload = await eventMetadata.createPayload(returnValues);
      const eventData = {
        eventId: this.web3.utils.sha3(data.transactionHash + data.logIndex),
        eventType: data.event, //eventos tienen verbo en ingles en pasado
        createdAt: Date.now(),
        blockNumber: data.blockNumber,
        data: {
          meta: meta,
          payload: payload
        }
      }
      return eventData;
  };
  
  this.listenOnData = async (data) => {
      const eventName = data.event;
  
      this.logIfConfIsVerbose(() => {
        console.info(`Event received. Type: '${eventName}'.`);
        console.info(`Event data: `, data);
      });
  
      const eventMetadata = await this.getEventMetadataFor(eventName);
      const eventData = await this.createEventData(data, eventMetadata); 
      const event = {
        data: eventData,
        contractName: eventMetadata.contratName(),
        isEvent: (eventType) => {
          return eventData.eventType === eventType;
        }
      };
      this.dispatcher.dispatchSuccess(event);
  };

  this.hasNotFoundEvents = (event) => {
    return event.toString().indexOf('invalid from and to block combination: from > to') > -1;
  }

  this.poll = async (fn, time) => {
    await fn();
    setTimeout(() => this.poll(fn), this.conf.app.pollTime);
  };

  this.doWatch = async (contractInstance, fromBlock, toBlock, ) => {
    const listener = await contractInstance.events.allEvents({ fromBlock, toBlock });
    await new Promise((resolve, reject) => {
      listener.on('data', (data) => {
          event(this.contractName, contractInstance._address, 'SUCCESS', fromBlock, toBlock, data);
          this.listenOnData(data);
          resolve(data);
      });
      listener.on('error', (event) => {
          if(this.hasNotFoundEvents(event)) {
            info(this.contractName, contractInstance._address, 'NOT_EVENTS', fromBlock, toBlock);
            resolve();
          } else {
            info(this.contractName, contractInstance._address, 'ERROR', fromBlock, toBlock);
            this.listenOnError(event);
            reject(event);
          }
      });
    }).catch(err => {
      console.log('Error on promise: ', err);
      throw err;
    });
  };

  this.watch = async (_fromBlock) => {
    const contractInstance = this.contractInstance;
    let fromBlock = _fromBlock;
    let toBlock;
    this.poll(async () => {
        try {
          toBlock = await this.web3.eth.getBlockNumber();
          info(this.contractName, contractInstance._address, 'LISTENING', fromBlock, toBlock);
          if (fromBlock < toBlock) {
            this.doWatch(contractInstance, fromBlock, toBlock);
            fromBlock = toBlock;
          }
        } catch(error) {
          info(this.contractName, contractInstance._address, 'ERROR', fromBlock, toBlock, "Reason: " + error.message);
          throw Error(error.message);
        }
      },
      this.conf.app.pollTime
    ).catch(err => {
      console.log('Error on poll: ', err);
      throw err;
    });
  };
  
  this.listenAllEvents = (fromBlockNumber) => {
    const contractInstance = this.contractInstance;
    const event = contractInstance.events.allEvents({fromBlock: fromBlockNumber},(error, data) => {});
    event.on("data", this.listenOnData);
    event.on("error", this.listenOnError);
    return event;
  };

}

module.exports = ContractListener;