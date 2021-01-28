const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users.js")(sequelize, Sequelize);
db.Posts = require("./posts.js")(sequelize, Sequelize);

module.exports = db;