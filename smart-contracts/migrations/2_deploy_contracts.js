var AgeVerifier = artifacts.require("./AgeVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(AgeVerifier);
};
