var electrifyContract = artifacts.require("./Electrify.sol");

module.exports = function (deployer) {
  deployer.deploy(electrifyContract);
};
