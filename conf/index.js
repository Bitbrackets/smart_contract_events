/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const events = require('./events/');

module.exports = (environment) => {
	const app = require('./env')(environment);
	return {
		app,
		events,
	}
};