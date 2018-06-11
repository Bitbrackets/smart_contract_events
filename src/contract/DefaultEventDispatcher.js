/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
function DefaultEventDispatcher (_conf, _web3, _listenContract, _eventService) {
  this.conf = _conf;
  this.web3 = _web3;
  this.listenContract = _listenContract;
  this.eventService = _eventService;

  this.dispatchSuccess = async (event) => {
    const eventData = event.data;
    console.log(`Processing event data ${eventData}.`);
  };
  this.dispatchError = (data) => {
    console.error(`ERROR: Event data dispatched`, data);
  };
};

module.exports = DefaultEventDispatcher;