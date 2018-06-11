# Smart Contract Events

In order to listen the BitBracket's smart contract events, we have developed this project based on NodeJS. 

# Forever script install and usage
 ```
 $ [sudo] npm install forever -g
 $ npm run start-prod
 ```
 See more details in ```https://github.com/foreverjs/forever```

# Configure Environment Variables

Creates a ```.env``` file in the root folder and add into it the following pair key/values:
```
DB_URL="mongodb:url"
SC_URL_WS="ws://127.0.0.1:3001"
```

# <a id="setupLocalEnvironment"></a> Setup your Local Environment

- Create a ```.env``` file based on the ```.env.template```.
- Set your MondoDB URL in the DB_URL key.

# <a id="setupSmartContractFolder"></a> Setup the SmartContracts' Folder

In order to listen the smart contract events, the app needs to read the smart contract's ABI/Interface. The ABI/Interface is a JSON file located in your smart contract project. So, you need to configure where the ABI/Interface folder is located. To do that, you need to change in the configuration:

```
baseOutputJson: "relative/path/to/your/smartconstract/jsons/"
```
> You need to setup those three variables.

We usually use the Rinkeby network to test our contracts. So, you will only need to setup those variable in <b>```./conf/env/rinkeby.js```</b> file.

# <a id="checkAddressesInMondoDB"></a> Check The Current SmartContract addresses in MondoDB.

The app will get the contract's addresses from the DB configured in the DB_URL value. So, when you deploy your smart contracts, you will need to save the addresses in your mongo database.

# <a id="executeRemixIde"></a> Execute Remix-IDE Locally.

First, you need to install the Remix-IDE locally. To do that visit [this URL](https://github.com/ethereum/remix-ide#installation).

In other command line execute the ```remix-ide``` command in the root folder of your smart contract folder. It will start a local Remix instance, and it will be able to be accessed by a browser. 

# How Setup the App

1. Clone the repository.
2. Create your configurarion based on a template file. See [How Setup Local Environment](#setupLocalEnvironment)
3. Configure the Smart Contracts' folder to get the JSON files. See [How Configure Smart Contracts' folder](#setupSmartContractFolder).
4. Check your smart contract's addresses. See [Check Addresses in MongoDB](#checkAddressesInMondoDB).
4. Invoke ```npm run dev-rinkeby```. It will start the app listening the smart contracts' events in the Rinkeby network. When you run the first execution, it will start listening the contract saved in the DB.
5. In <b>other command line</b> execute the Remix-IDE locally. See [Execute Remix-IDE locally](#executeRemixIde).
6. Access to ```http://localhost:8080``` and click on the link button located on the top left. After click it, select your smart contracts folder.
7. Configure Remix to access to the Rinkeby network.
8. Open a smart contract.
9. Now you can invoke function on a smart contract and listen the events in the app.