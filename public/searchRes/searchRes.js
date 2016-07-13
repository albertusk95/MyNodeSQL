angular.module('searchRes', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/searchRes', {
        templateUrl: 'public/searchRes/searchRes.html',
        controller: 'searchResCtrl'
    });
}])
 
.controller('searchResCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {       
	var TypeTimer;                
	var TypingInterval = 1000;

	$scope.keyup = function() {
		console.log("key up");
		$timeout.cancel(TypeTimer);
		TypeTimer = $timeout( function(){ get_data(); }, TypingInterval);
	};

	$scope.keydown = function(){
		console.log("key down");
		$timeout.cancel(TypeTimer);
	};

	function get_data(){
		var name = $scope.name;
		console.log("get_data: " + name);
		$http.post('/get_data', {name: name}).success(function(data, status, headers, config) {
			$scope.data_server = data;
			console.log("success fetching data");
			console.log(data[0]);
		}).error(function(data, status) {
			alert("Connection Error");
		});
	}            
}]);