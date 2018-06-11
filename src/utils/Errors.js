/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const info = require('../log/Logger').info;

const isConnectionError = (error) => {
    let connectionError = false
    connectionError = connectionError || error.toString().indexOf("Couldn't connect to node on WS.") > -1;
    connectionError = connectionError || error.toString().indexOf("connection not open") > -1;
    return connectionError;
};

module.exports = {
    registerErrorHandlers: () => {
        process.on('unhandledRejection', error => {
            console.log(`Error catched. Is connection error? ${isConnectionError(error)}.`);
            console.log(error);
            //TODO It could implement reentry logic, if it receives a new error implementation with the data needed to call listContract function.
            process.exit(1);
        });
    }
    
};