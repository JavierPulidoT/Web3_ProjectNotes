// permite subir el codigo por defevto de Migrations.sol
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
