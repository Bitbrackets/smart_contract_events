/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const environment = process.argv[2];
const CONF = require('../../conf')(environment);

const jackrabbit = require('jackrabbit');
const Events = require('../data/events');
const ContractsInfo = require('../data/contractsInfo');
const {info} = require('../log/Logger');
const eventLog = require('../log/Logger').event;

const rabbitQueue = jackrabbit(CONF.app.queueUrl);

const _makeGetLastBlock = (eventModel) => {
    return async () => {
        try {   
            const res = await eventModel.aggregate(
                [
                    { 
                        "$group" : {
                            "_id" : {}, 
                            "MAX(blockNumber)" : {
                                "$max" : "$blockNumber"
                            }
                        }
                    },{ 
                        "$project" : {
                            "_id" : 0, 
                            "blockNumber" : "$MAX(blockNumber)"
                        }
                    }
                ]
            )
            if (res && res.length >0) {
                return res[0].blockNumber;
            } else {
                // assume the collection is empty and we are starting to listen to events
                return CONF.app.startBlockNumber;
            }             
        } catch (error) {
            console.log(error);
            throw new Error("Error: Problem getting latest block", error);
        }
    }    
}

const _makeFetchInitConfig = (ContractsInfoModel) => {
    return async () => {
            try {
                const contracts = await ContractsInfoModel.find({});
                if (!contracts || contracts.length ==0) {
                    return Promise.reject('Error: could not find any contract information in DB');
                }
                return Promise.resolve(contracts);
            } catch (error) {
                return Promise.reject(error);
            } 
    }
}

module.exports = ({ model, argJackRabbit }) => {
    const getLatestBlockNumber = _makeGetLastBlock(model || Events);
    const fetchContractsInfo = _makeFetchInitConfig(model || ContractsInfo);

    return {
        getLatestBlockNumber,
        fetchContractsInfo
    }; 
};