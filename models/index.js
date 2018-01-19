var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
	title: {
		type: Sequelize.String,
		allowNull: false},
	urlTitle: {
		type: Sequelize.String, 
		isUrl: true,
		allowNull: false},
	content: {
		type: Sequelize.Text},
	status: {
		type: Sequelize.Boolean,
		allowNull: false,
		defaultValue: false
	}
})

const User = db.define('user', {
	name: {
		type: Sequelize.String,
		allowNull: false},
	email: {
		type: Sequelize.String,
		allowNull: false,
		isEmail: true
	}
})

module.exports = {
	Page: Page,
	User: User
};