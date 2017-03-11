angular.module('KHO_CRM').factory('SendEmailToGroup', sendEmailToGroup);

sendEmailToGroup.$inject = [
	'$http',
	'Todos'
];

function sendEmailToGroup($http, Todos) {

	return {
		//Wysyłanie wiadomości do kapituły po dodaniu komentarza do próby przez petenta
		sendFromAddComment : function(commData) {

			var mailOptions = {
			    subject: 'Wiadomość od ' + commData.author + ' z serwisu KHO' , // Subject line
			    text: 'Hello world ?',
			    html: 'Cześć, <br /><br />Chciałbym Was poinformować o swojej próbie. <br /><br />' +
			    '<b>Autor: </b>' + commData.author + ' ' + commData.username + '<br />' +
			    '<b>Kategoria wpisu: </b>' + commData.category + '<br />' +
			    '<b>Wiadomość: </b>' + commData.description + '<br />',
			    author: commData.username,
			    whom: 'Kapitula'
			};
			console.log(mailOptions);


			Todos.sendEmail(mailOptions);

		},
		sendFromAddCommentToCandidate : function(commData) {

			var mailOptions = {
			    subject: 'Wiadomość od ' + commData.author + ' z serwisu KHO' , // Subject line
			    text: 'Hello world ?',
			    html: 'Cześć, <br /><br />Dodałem nową wiadomość do Twojej próby. <br /><br />' +
			    '<b>Autor: </b>' + commData.author + ' ' + commData.username + '<br />' +
			    '<b>Kategoria wpisu: </b>' + commData.category + '<br />' +
			    '<b>Wiadomość: </b>' + commData.description + '<br />',
			    author: commData.username,
			    whom: 'Candidate',
			    toCandidate : commData.sendToCandidate
			};


			Todos.sendEmail(mailOptions);
		},

	}

}