var express = require("express");

var app = express();
// var sql = require('mssql');
// var config = {
//     user: 'nilavanrajamani',
//     password: '43Ddr87f3',
//     server: 'nilavanrajamani.database.windows.net',
//     database: 'Books',
//     options: {
//         encrypt: true
//     }

// };

// sql.connect(config, function(err){
//     console.log(err);
// });

var port = process.env.PORT || 3000;
var nav = [{ Link: '/Books', Text: 'Books' }, { Link: '/Authors', Text: 'Authors' }]; 
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

//var port = 3000;

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');

//var handlebars = require("express-handlebars");
//app.engine('.hbs', handlebars({extname: '.hbs'}));

//app.set('view engine','.hbs');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', { nav: [{ Link: '/Books', Text: 'Books' }, { Link: '/Authors', Text: 'Authors' }], title: 'Hello from ejs' });
});

app.get('/books', function (req, res) {
    res.send('Hello Books!!!');
});

app.listen(port, process.env.IP, function () {
    //console.log(process.env.IP);
    console.log("Listening on port " + port);
});
