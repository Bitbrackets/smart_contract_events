/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContractsInfoSchema = new Schema({
    address: {
        type: String,
        unique : true, 
        required: [true, 'Contract Address is Required'],
    },
    contractName: {
        type: String,
        required: [true, 'Contract Name is Required'],
    },
});

const ContractsInfo = mongoose.model('ContractsInfo', ContractsInfoSchema);

module.exports = ContractsInfo;
