var Meme = require('../models/meme'),
    Squishle = require('../models/squishle');


exports.info = function (req, res) {
    res.render('parse', { message: '', memes: null  });
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

                    var group = Math.floor(k/3);

                    var parseRow = {
                        group: group,
                        imgurId: memes[k].imgurId,
                        imgur_user: memes[k].imgur_user,
                        title: memes[k].title,
                        subtype: memes[k].subtype,
                        link: memes[k].link
                    }

                    Squishle.insert("Meme", parseRow, function (err, response) {
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

exports.pull = function (req, res) {

    var min = 0;
    var max = 200;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;

    Squishle.findMany('Meme', { group: random }, function (err, response) {
        console.log(response);
        res.render('parse', { message: 'pulled', memes: response.results });
    });
}
