var Sequelize = require('sequelize'),
    request = require('request'),
    fs = require('fs');



// Load config defaults from JSON file.
// Environment variables override defaults.
var config = function loadConfig() {
    var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    for (var i in config) {
        config[i] = process.env[i.toUpperCase()] || config[i];
    }
    console.log('Configuration');
    console.log(config);
    return config;
}();


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
    title: Sequelize.STRING,
    imgur_user: Sequelize.STRING,
    subtype: Sequelize.STRING,
    link: Sequelize.STRING,
    datetime: Sequelize.DATE,
    flag: Sequelize.BOOLEAN
});


exports.list = function (req, res) {
    Meme
        .findAll()
        .complete(function(err, memes) {
            if (!!err) {
                console.log('An error occurred while searching for Memes:', err)
            } else if (!memes) {
                console.log('No memes found.')
            } else {
                res.render('list', { memes: memes });
            }
        })

};

exports.pull = function (req, res) {
    console.log('get memes' + req.params);
    var imgurUrl = "https://api.imgur.com/3/gallery/g/memes/top/year";

    var options = {
        url: imgurUrl,
        headers: {
            'Authorization': 'Client-ID ' + config.imgur_clientId
        }
    };


    for (var k = 0; k < 5; k++) {
        options.url = imgurUrl + "/" + k;


        request.get(options, function (error, response, body) {

            var body = JSON.parse(body);
            for (var i = 0; i < body.data.length; i++) {
                //console.log(body.data[i]);

                Meme
                    .create({
                        title: body.data[i].title,
                        imgur_user: body.data[i].account_url,
                        subtype: body.data[i].subtype,
                        link: body.data[i].link,
                        datetime: body.data[i].datetime,
                        flag: false
                    })
                    .complete(function (err, user) {

                    })
            }



        });

    }

    res.render('index', { message: 'memes pulled.' });
};

exports.clear = function (req, res) {

    sequelize
        .sync({ force: true })
        .complete(function (err) {
            if (!!err) {
                console.log('An error occurred while create the table:', err)
            } else {
                console.log('Db force synced.')
            }
            res.render('index', { message: 'db cleared.' });
        })
};


exports.flag = function (req, res) {
    console.log(req.body.memeid);
    res.json({message: "done"});
};