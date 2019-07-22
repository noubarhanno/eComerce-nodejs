const Sequelize = require('sequelize');

const sequelize = new Sequelize("node-complete", "root", "N0ub@rH@nn01987", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;