var express = require("express");
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var sql = require('mssql');
console.log('This page is executing');
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    var bookController = require('../controllers/bookController')(null, nav);
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

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
        .get(bookController.getById);
    return bookRouter;
};

module.exports = router;
