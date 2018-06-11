/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const EVENTS = new Map();

/* My contract events. */
require('./myContractEvents')(EVENTS);

module.exports = EVENTS;