const { Sequelize } = require("sequelize");

const dbConfig = {
	HOST: "localhost",
	USER: "postgres",
	PASSWORD: "password",
	DB: "barberShop",
	dialect: "postgres",
	dialectOptions: {
		ssl: true,
	},
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
});

module.exports = sequelize;
