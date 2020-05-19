var AgeVerifier = artifacts.require("./AgeVerifier.sol");
var NFTPrize = artifacts.require("./NFTPrize.sol");

let tokenImageForAddingTen = 'https://i.imgur.com/bHVMwAj.png'
//let tokenImageForMagicNumber = 'https://i.imgur.com/Ye7YFfX.png'

module.exports = function(deployer) {
  deployer.deploy(NFTPrize).then(function(instance) { 
    instance.addPuzzle(AgeVerifier.address, tokenImageForAddingTen)
  });
};
