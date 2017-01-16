var nodemailer = require('nodemailer');
var Todo = require('../models/todo');
var mongoose = require('mongoose');


//var to = 'jarko_krupa@o2.pl, pdk.grody@zhr.pl';

var transporter =  nodemailer.createTransport(
{
	  service: 'Gmail',
		  auth: {
		    user: 'pdk.grody@zhr.pl',
		    pass: 'monter#234'
		  }
	}
);

var footer = `
<br /><br />
--<br />
Wiadomość wysłana z serwisu KHO </br>
<strong>Czuwaj!</strong>
`;




exports.send = function (mailOptions) {

		mailOptions.to = mailOptions.author + ', ';

		Todo.find(function (err, todos) {

			for(var i = 0 ; i < todos.length; i++) {
				if(todos[i].role == 'Członek kapituły' || todos[i].role == 'Administrator'){
				 	mailOptions.to += todos[i].email + ", ";
				 }
			};

			mailOptions.from =  '"KHO KUŹNIA" <pdk.grody@zr.pl>', // sender address
			mailOptions.html += footer;

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});

		});

}

exports.confirmPresent = function(mailOptions){

		mailOptions.to = '';

		Todo.find(function (err, todos) {

			for(var i = 0 ; i < todos.length; i++) {
				if(todos[i].role == 'Członek kapituły' || todos[i].role == 'Administrator'){
				 	mailOptions.to += todos[i].email + ", ";
				 }
			};

			mailOptions.subject = 'Potwierdzenie obecności - wiadomość od ' + mailOptions.nameAndSurname; // Subject line
			mailOptions.from =  '"KHO KUŹNIA" <pdk.grody@zr.pl>', // sender address
			mailOptions.html = 'Cześć, <br /><br />Potwierdzam swoją obecność na najbliższej kapitule: '  + mailOptions.nameAndSurname;
			mailOptions.html += footer;

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});

		});

};

exports.report = function(mailOptions){

		mailOptions.to = '';

		Todo.find(function (err, todos) {

			for(var i = 0 ; i < todos.length; i++) {
				if(todos[i].role == 'Członek kapituły' || todos[i].role == 'Administrator'){
				 	mailOptions.to += todos[i].email + ", ";
				 }
			};

			mailOptions.subject = 'Potwierdzenie obecności - wiadomość od ' + mailOptions.nameAndSurname; // Subject line
			mailOptions.from =  '"KHO KUŹNIA" <pdk.grody@zr.pl>', // sender address
			mailOptions.html = 'Cześć, <br /><br />Potwierdzam swoją obecność na najbliższej kapitule: '  + mailOptions.nameAndSurname;
			mailOptions.html += footer;

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});

		});

};


// exports.area = function () {

// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport(
// {
//   service: 'Gmail',
//   auth: {
//     user: 'pdk.grody@zhr.pl',
//     pass: 'monter#234'
//   }
// }
// );



// 	///'smtps://pdk.grody%gmail.com:monter#234@smtps.gmail.com');

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"KHO KUŹNIA ?" <pdk.grody@zr.pl>', // sender address
//     to: 'jarko_krupa@o2.pl', // list of receivers
//     subject: 'Co tygodniowe informacje z Kapituły ✔', // Subject line
//     text: 'Hello world ?', // plaintext body
//     html: '<b>Hello world ?</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });

//  };