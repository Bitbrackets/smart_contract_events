/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let promise;

module.exports = (config) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.info('Trying MongoDB connection using ', config.dbUrl);
            const res = await mongoose.connect(config.dbUrl);
            resolve();      
        } catch (err) {
            reject(err);
        }
    });
};