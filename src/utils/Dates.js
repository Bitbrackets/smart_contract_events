/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
module.exports = {
    nowInMillis: function () {
        return Date.now();
    },
    format: function () {
        return new Date().toISOString();
    }
};