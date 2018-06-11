/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
module.exports = function (events, contractEvents) {
  events.set('MyContractEvent',{
    contratName: () => {
      return 'MyContract'
    },
    createPayload: (values) => {
      return {
        value1: values.value1,
        value2: values.value2
      };
    }
  })
  ;
};