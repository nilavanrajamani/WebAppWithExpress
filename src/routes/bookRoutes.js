var express = require("express");
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var sql = require('mssql');
console.log('This page is executing');
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
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
        });

    bookRouter.route('/:id')
        // .all(function (req, res, next) {
        //     var id = req.params.id;
        //     var ps = new sql.PreparedStatement();
        //     ps.input('Id', sql.Int);
        //     ps.prepare('select * from books where id=@id', function (err) {
        //         ps.execute({
        //             id: req.params.id
        //         }, function (err, recordset) {
        //             if (recordset.length === 0) {
        //                 res.status(404).send('Not found');
        //             }
        //             else {
        //                 req.book = recordset[0];
        //                 next();
        //             }
        //         });
        //     });
        // })
        .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.findOne({_id: id}, function (err, results) {
                    //console.log(err);
                    res.render('bookView', {
                        nav: nav,
                        title: 'Hello from ejs',
                        book: results
                    });
                });
            });
        });
    return bookRouter;
};

module.exports = router;
