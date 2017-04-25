var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
    var middleware = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function (req, res) {
        // var request = new sql.Request();

        // request.query('select * from Books',function(err, recordset){
        //     console.log(recordset);
        // });
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                //console.log(err);
                res.render('bookListView', {
                    nav: nav,
                    title: 'Hello from ejs',
                    books: results
                });
            });
        });
    };

    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({ _id: id }, function (err, results) {
                //console.log(err);
                res.render('bookView', {
                    nav: nav,
                    title: 'Hello from ejs',
                    book: results
                });
            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};

module.exports = bookController;