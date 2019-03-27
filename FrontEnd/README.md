# Electrify FrontEnd :

This is the frontend project built with react.

## Installation :

### Only for windows :

  1. There is an issue with the installation of `web3` package, so you need to download `python v2.7.x` from [here](https://www.python.org/ftp/python/2.7.9/python-2.7.9.am.amd64.msi) and install it.

  2. Make sure that you have added `python` in `PATH` variable and check the current version with:

    ```js
    // should return Python 2.7.9
    python --version
    ```

  3. From `PowerShell`, as administrator, write this command line :

    ```js
    npm install global production windows-build-tools
    ```
  4. Finally restart your computer.

First ensure that you have `create-react-app` globally .

1. Run the following command .

   ```js
   npm install -g create-react-app
   ```

2. Then, install all necessary dependencies of frontend project..
   ```javascript
   npm install
   ```
3. Finally, run the frontend project.
   ```javascript
   // ensure that you are inside the Electrify/FrontEnd directory when running this
   npm start
   ```
