/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
require('dotenv').config();

module.exports = (environment) => {
    const defaultConf = require('./default');

    const envs = new Map();
    envs.set('rinkeby', require('./rinkeby'));
    envs.set('mainnet', require('./mainnet'));
    envs.set('geth', require('./geth'));
    
    const currentEnv = envs.get(environment);
    
    if(typeof currentEnv === 'undefined') {
        throw new Error("Current environment is not defined. Available: 'rinkeby', 'mainnet' or 'geth'.");
    }

    return {
        dbUrl: currentEnv.dbUrl || defaultConf.dbUrl,
        scUrlWs: currentEnv.scUrlWs || defaultConf.scUrlWs,
        queueUrl: currentEnv.queueUrl || defaultConf.queueUrl,
        baseOutputJson: currentEnv.baseOutputJson || defaultConf.baseOutputJson,
        verbose: currentEnv.verbose || defaultConf.verbose,
        startBlockNumber: currentEnv.startBlockNumber || defaultConf.startBlockNumber,
        pollTime: currentEnv.pollTime || defaultConf.pollTime
    };
};