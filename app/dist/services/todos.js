angular.module('KHO_CRM').factory('Todos', dataTodos);

    dataTodos.$inject = ['$http', '$resource'];

    function dataTodos($http, $resource) {

	return {
			get : function() {
				var tmp = $http.get('/api/todos');
				console.log(tmp);
				return tmp;
			},
			create : function(todoData) {
				console.log(todoData);
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			findById : function(id) {
				return $http.get('/api/todos/findById/' + id);
			},
			update : function(todoData){
				return $http.put('/api/todos/updateScout', todoData);
			},
			deleteAttempt : function(id){
				return $http.delete('/api/todos/deleteAttempt/' + id);
			}
		}

    }