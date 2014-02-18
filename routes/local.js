var Meme = require('../models/meme');

exports.list = function (req, res) {

    var page = req.query.p;
    var limit = req.query.l || 20;
    var offset = (page || 0) * limit;

    console.log("limit:" + limit + "   offset: " + offset);

    Meme
        .count()
        .success(function(c){

            console.log("total:" + c);

            Meme
                .findAndCountAll({
/*                    where: ["title LIKE 'foo%'"],*/
                    offset: offset,
                    limit: limit
                })
                .success(function(result) {

                    res.render('local', { total: c, pages: c / limit, memes: result.rows });

                });

        })

/*    Meme
        .findAll()
        .complete(function(err, memes) {
            if (!!err) {
                console.log('An error occurred while searching for Memes:', err)
            } else if (!memes) {
                console.log('No memes found.')
            } else {
                res.render('list', { memes: memes });
            }
        })*/


};


/*exports.clear = function (req, res) {

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
};*/


exports.flag = function (req, res) {
    var imgurId = req.body.imgurId;
    var flag = req.body.flag === 'true';
    console.log(imgurId);

    Meme
        .find({ where: { imgurId: imgurId } })
        .complete(function(err, meme) {
            if (!!err) {
                console.log('An error occurred while searching for Memes to flag:', err)
            } else if (!meme) {
                console.log('No meme found with id: ' + imgurId)
            } else {
                meme.flagged = flag;
                meme.save().success(function(){
                   console.log("meme " + imgurId + " flagged " + flag);
                });
            }
        });

    res.json({message: imgurId + " flagged."});
};