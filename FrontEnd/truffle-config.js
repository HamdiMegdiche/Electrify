const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      websockets: true
    },
    remote: {
      host: "52.50.193.34",
      port: 9501,
      network_id: "1515",
      websockets: true
    }
  }
};
