/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const APP = {
    dbUrl: process.env.DB_URL,
    scUrlWs: process.env.SC_URL_WS,
    queueUrl: process.env.QUEUE_URL,
    baseOutputJson: './',
    verbose: false,
    startBlockNumber: 0,
    pollTime:25000
};

module.exports = APP;