var express = require("express");

var app = express();

var port = process.env.PORT || 3000;
var nav = [{ Link: '/Books', Text: 'Books' }, { Link: '/Authors', Text: 'Authors' }]; 
var bookRouter = require('./src/routes/bookRoutes')(nav);
//var port = 3000;

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');

//var handlebars = require("express-handlebars");
//app.engine('.hbs', handlebars({extname: '.hbs'}));

//app.set('view engine','.hbs');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

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
