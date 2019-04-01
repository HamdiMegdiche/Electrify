const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      websockets: true
    },
    remote: {
      host: "192.168.1.69",
      port: 9501,
      network_id: "1515",
      websockets: true
    }
  },
  // compilers: {
  //   solc: {
  //     version: "0.4.19+commit.c4cbbb05.Emscripten.clang"
  //   }
  // }
};
