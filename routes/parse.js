var Parse = require('node-parse-api').Parse,
    config = require('../config'),
    Meme = require('../models/meme');

var APP_ID = config.parse_appid;
var RESTAPI_KEY = config.parse_restapikey;

var app = new Parse(APP_ID, RESTAPI_KEY);


exports.info = function (req, res) {
    res.render('parse', { message: '' });
}

exports.push = function (req, res) {

    Meme
        .findAll({ where: { flagged: false } })
        .complete(function (err, memes) {
            if (!!err) {
                console.log('An error occurred while searching for Memes:', err)
            } else if (!memes) {
                console.log('No memes found')
            } else {

                for (var k = 0; k < memes.length; k++) {

                    var parseRow = {
                        imgurId: memes[k].imgurId,
                        imgur_user: memes[k].imgur_user,
                        title: memes[k].title,
                        subtype: memes[k].subtype,
                        link: memes[k].link
                    }
                    app.insert("Meme", parseRow, function (err, response) {
                        if (!!err) {
                            console.log(err)

                        } else if (!response) {
                            console.log(response);

                        }
                    });
                }


            }
        });

    res.render('parse', { message: 'Done'});
}
