/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
module.exports = {
    cleanNulls: function (value) {
        let newValue = value.replace('\0', '');
        newValue = newValue.replace(/\0/g, '');
        return newValue;
    }
};