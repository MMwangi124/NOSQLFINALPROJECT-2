var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');






var app = express();



app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));




app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.engine('html', exphbs());
app.set('view engine', 'html');


app.set('port', process.env.PORT || 3030);


app.get('/', function(req, res) {
 res.render('home', {
   aboutme: modules.nosqlwork(),
 });
});

app.get('/About', function(req, res) {
res.render('about', {
      });
    });
});

app.post('/contact', (req, res) => {
    var email = req.body.email;
    var firstname = req.body.firstname;

    handleForm.postForm(email, firstname, function(status, message){
      if(status === 'suc') {
			     req.session.success = message;
			     res.redirect('/');
		}else{
			req.session.danger = message;
			res.redirect('/contact');
		  }
    })
})

app.listen(app.get('port'), function(){
 console.log('My Site is Running on Port 3030')
});
