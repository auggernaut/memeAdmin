var Sequelize = require('sequelize'),
    request = require('request'),
    config = require('../config');

var sequelize = new Sequelize(config.dbname, config.dbuser, config.dbpass, {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306 // or 5432 (for postgres)
});

sequelize
    .authenticate()
    .complete(function (err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    })

var Meme = sequelize.define('Meme', {
    imgurId: Sequelize.STRING,
    title: Sequelize.STRING,
    imgur_user: Sequelize.STRING,
    subtype: Sequelize.STRING,
    link: Sequelize.STRING,
    datetime: Sequelize.STRING,
    flagged: Sequelize.BOOLEAN,
    pushed: Sequelize.BOOLEAN
});


module.exports = Meme;
exports.sequalize = sequelize;