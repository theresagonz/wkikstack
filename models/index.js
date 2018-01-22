const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'closed'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods: {
        route() {
            return `/wiki/${this.urlTitle}`;
        }
    },
    hooks: {
        beforeValidate: (page, options) => {
            if (page.title) {
                page.urlTitle = page.title.replace(/ /g, '_').toLowerCase();
            } else {
                page.urlTitle = Math.random().toString(36).substring(2, 7).toLowerCase();
            }
        }
    }
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

Page.belongsTo(User, { as: 'author' });

module.exports = {
    db: db,
    Page: Page,
    User: User
};