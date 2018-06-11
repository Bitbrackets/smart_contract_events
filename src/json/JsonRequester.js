/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
function JsonRequester (_app, _smartContractJsonPath) {
  this.app = _app;
  this.smartContractJsonPath = jsonPathFormatter(_smartContractJsonPath);

  this.getJson = () => {
    return require(this.app.baseOutputJson + this.smartContractJsonPath);
  };
  
  this.getAbi = () => {
    const json = this.getJson();
    return json.abi;
  };
};

function jsonPathFormatter(name) {
  if (!name.includes('.json')) {
    return name + '.json';
  }

  return name;
}

module.exports = JsonRequester;