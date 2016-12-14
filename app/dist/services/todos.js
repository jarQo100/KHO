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
				return $http.put('/api/todos/addAttempt/' + user_id, todoData);
			},
			deleteAttempt : function(user_id, attempt_id){
				return $http.delete('/api/todos/deleteAttempt/' + user_id + '/' + attempt_id);
			},
			findByIdTask : function(taskId){
				return $http.get('/api/todos/findTask/' + taskId);
			},
			addComment: function(taskId, commData){
				console.log(commData.category);
				return $http.post('/api/todos/createComment/' + taskId, commData);
			}
		}

    }