# Electrify FrontEnd

This is the frontend project built with react & truffle.

### Preinstallation 1 (only for windows)

If you have a windows OS you must follow these steps.

1. There is an issue with the installation of `web3` package, so you need to download `python v2.7.x` from [here](https://www.python.org/ftp/python/2.7.9/python-2.7.9.am.amd64.msi) and install it.

2. Make sure that you have added `python` in `PATH(system)` variable and check the current version with:
   ```js
   // should return Python 2.7.9
   python --version
   ```
3. Install `node-gyp` globally:

   ```js
   npm install -g node-gyp
   ```

4. From `PowerShell`, as administrator, write this command line to install a compiler:
   ```js
   npm install global production windows-build-tools
   ```
5. Finally restart your computer.

### Preinstallation 2 (To run a test blockchain)

Install `ganache` [here](https://truffleframework.com/ganache) and make sure that is running at `http://127.0.0.1:7545`.

Install `MetaMask` extension [here](https://metamask.io/) and follow the documentation to :

- Create an account with password
- Add a new RPC network (`http://127.0.0.1:7545`)
- Import a new account from `ganache` with a private key (in ganache interface just click on `Show Keys` from the 1st account and copy paste the code in `MetaMask`)

## Installation

1. Ensure that you have `create-react-app` & `truffle` installed globally :

   ```js
   npm install -g create-react-app truffle
   ```

2. Then, install all necessary dependencies of frontend project.
   ```javascript
   // ensure that you are inside the Electrify/FrontEnd directory when running this
   npm install
   ```
3. Finally, run the frontend project:

   - Before running the app, `ganache` must be started at `http://127.0.0.1:7545`and `MetaMask` connected to that network with the first account imported from `ganache`.

   - Before compiling, delete the content of directory `src/contracts`.

   - Compile and migrate the smart contracts (smart contract changes must be manually recompiled and migrated).
     ```js
     // ensure that you are inside the Electrify/FrontEnd directory when running this
     truffle compile
     truffle migrate
     ```
   - Then you can run the React app.
     ```js
     // ensure that you are inside the Electrify/FrontEnd directory when running this
     npm start
     ```
