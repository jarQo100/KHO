angular.module('KHO_CRM').factory('Todos', dataTodos);

    dataTodos.$inject = ['$http', '$resource'];

    function dataTodos($http, $resource) {

	return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			findById : function(id) {
				return $http.get('/api/todos/findById/' + id);
			},
			findByEmail : function(email){
				return $http.get('/api/todos/findByEmail/' + email)
			},
			findByIdAttempt : function(id) {
				return $http.get('/api/todos/findByIdAttempt/' + id);
			},
			update : function(todoData){
				return $http.put('/api/todos/updateScout', todoData);
			},
			updateAttempt : function(todoData){
				return $http.put('/api/todos/updateAttempt', todoData);
			},
			addAttempt : function(user_id, todoData){
				console.log("HERE");
				return $http.put('/api/todos/addAttempt/' + user_id, todoData);
			},
			checkRole : function(emial){
				return $http.get('/api/todos/checkRole/' + emial);
			},
			deleteAttempt : function(user_id, attempt_id){
				return $http.delete('/api/todos/deleteAttempt/' + user_id + '/' + attempt_id);
			},
			deleteMeeting : function(meetingId){
				console.log(meetingId);
				return $http.delete('/api/todos/deleteMeeting/' + meetingId);
			},
			findByIdTask : function(taskId){
				return $http.get('/api/todos/findTask/' + taskId);
			},
			addComment: function(taskId, commData){
				console.log(commData.category);
				return $http.post('/api/todos/createComment/' + taskId, commData);
			},
			addMeeting: function(formData){
				return $http.post('/api/todos/createMeeting/', formData);
			},
			confirmPresent: function(formData){
				return $http.put('/api/todos/confirmPresent/', formData);
			},
			getMeeting: function(){
				return $http.get('/api/todos/getMeetings/');
			},
			addPersonToMeeting: function(todoData){
				console.log(todoData);
				return $http.put('/api/meeting/adduser', todoData);
			},
			getAll : function(){
			            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
			        },

			getById : function(id){
			   return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
			},

			getByUsername: function(username){
			   return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
			}

		}

    }