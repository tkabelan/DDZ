angular.module('starter.controllers')

.controller('aanbevelingenCtrl', function($scope, $state, $http, DataManager){
	const keyStudentInfo = 'ddz.studentinfo';
	
	var studentinfo = JSON.parse(window.localStorage[keyStudentInfo] || '[]');
	var recommendations = studentinfo.recommendations;
	var recommendationsrecommender = studentinfo.recommendations.recommender;

    $scope.goToProfielOverzicht = function() {
            $state.go('app.profielOverzicht')
    } 
	
	$scope.aanbevelingenObject = [];
	for (var i = 0; i < recommendations.length; i++) {

		$scope.aanbevelingenObject[i] = recommendations[i];
	};
    
});