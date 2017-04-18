var express = require("express");

var app = express();

var port = process.env.PORT;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res){
    res.send('Hello World!!!')
});

app.get('/books', function(req, res){
    res.send('Hello Books!!!');
});

app.listen(port, process.env.IP, function(){
    console.log(process.env.IP);
    console.log("Listening on port "+ process.env.PORT);
});
