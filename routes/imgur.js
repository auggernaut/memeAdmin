var config = require('../config'),
    Meme = require('../models/meme'),
    request = require('request');

exports.pull = function (req, res) {
    console.log('get memes' + req.params);
    var imgurUrl = "https://api.imgur.com/3/gallery/g/memes/time";

    var options = {
        url: imgurUrl,
        headers: {
            'Authorization': 'Client-ID ' + config.imgur_clientId
        }
    };


    for (var k = 5; k < 25; k++) {
        options.url = imgurUrl + "/" + k;


        request.get(options, function (error, response, body) {

            var body = JSON.parse(body);
            for (var i = 0; i < body.data.length; i++) {
                //console.log(body.data[i]);

                Meme
                    .create({
                        imgurId: body.data[i].id,
                        title: body.data[i].title,
                        imgur_user: body.data[i].account_url,
                        subtype: body.data[i].subtype,
                        link: body.data[i].link,
                        datetime: body.data[i].datetime,
                        flagged: false,
                        pushed: false
                    })
                    .complete(function (err, user) {

                    })
            }



        });

    }

    res.render('imgur', { message: 'memes pulled.' });
};


exports.info = function (req, res) {
    res.render('imgur', { message: '' });
};