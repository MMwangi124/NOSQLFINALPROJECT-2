var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');






var modules = require('./LIBS/modules.js');


var app = express();



app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));




app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3030);


app.get('/', function(req, res) {
 res.render('home', {
   aboutme: modules.getabout(),
   achievements: modules.getachievements()
 });
});

app.get('/about', function(req, res) {
    pageinfo.getFirstName(function(FirstName, AgeNumber, SchoolName, MajorsName, BeginningDate, EndDate, WorkTitle, WorkTime, WorkDescription) {
res.render('about', {
    first_name : FirstName,
    age_number : AgeNumber,
    school_name : SchoolName,
    majors_name :  MajorsName,
    beginning_date : BeginningDate,
    end_date : EndDate,
    work_title: WorkTitle,
    work_time: WorkTime,
    work_description: WorkDescription,
      });
    });
});

app.post('/contact', (req, res) => {
    var email = req.body.email;
    var firstname = req.body.firstname;
    var age = req.body.age;

    handleForm.postForm(email, firstname, age, function(status, message){
      if(status === 'suc') {
			     req.session.success = message;
			     res.redirect('/');
		}else{
			req.session.danger = message;
			res.redirect('/contact');
		  }
    })
})


app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

app.listen(app.get('port'), function(){
 console.log('My Site is Running on Port 3030')
});
