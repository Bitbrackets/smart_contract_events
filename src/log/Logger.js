/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const dates = require('../utils/Dates');

const rangeLog = (_from, _to) => {
  const countBlocks = (_to - _from).toString().padStart(8);
  const rangeTitle = _from + '-' + _to;
  const rangeLog = 'Range: ' + rangeTitle.padStart(15) + ' (' + countBlocks + ' blocks)'
  return rangeLog;
}

module.exports = {
  info: (_contract, _address, _title, _from, _to, _details = "") => {
    const details = typeof _details !== 'undefined' ? _details : '';
    console.log(dates.format(),'|', _contract.padStart(25),'|',_address, '|', _title.padStart(10), '|', rangeLog(_from, _to), '|', details.padStart(15));
  },
  event: (_contract, _address, _title, _from, _to, _event) => {
    const event = typeof _event.event !== 'undefined' ? _event.event : _event.eventType;
    const eventId = typeof _event.transactionHash !== 'undefined' ? _event.transactionHash : _event.eventId;
    console.log(dates.format(), '|', _contract.padStart(25),'|',_address, '|', _title.padStart(10),'|', rangeLog(_from, _to),'| Block Number:', _event.blockNumber,  '| Event:', event,'| TxHash:', eventId);
  }
};