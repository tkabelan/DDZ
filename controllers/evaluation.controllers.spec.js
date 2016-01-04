/**
 * @ngdoc Spec file for Evaluation Controller
 * @author G.P Bosch 
 * @description 
 * Test of the evaluation controller
 */

'use strict';

describe('evaluationCtrl', function() {
	//var scope, controller, ArrayTransport, OpdrachtIDTransport, DataManager // declare variables

	// mock application to allow our own dependencies
	beforeEach(angular.module(_appModule));

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('sum', function () {
	    it('1 + 1 should equal 2', function () {
	      var $scope = {};
	      var $state = {};
	      var $ionicModal = {};
	      var $ionicSlideBoxDelegate = {}; 
	      var $stateParams = {};
	      var $window = {}; 
	      var ArrayTransport = {}; 
	      var OpdrachtIDTransport = {}; 
	      var DataManager = {};
	      var $http = {};
	      var controller = $controller('evaluationCtrl', {$scope: $scope});
	      $scope.x = 1;
	      $scope.y = 2;
	      $scope.sum();
	      expect($scope.z).toBe(3);
	    }); 

    // it('z should default to zero', function () {
    //   var $scope = {};
    //   var $state = {};
    //   var controller = $controller('evaluationCtrl', { $scope: $scope, $state:$state  });
    //   expect($scope.z).toBe(0);
    // });
  });
	



})


	      //var controller = $controller('evaluationCtrl', { $scope: $scope, $state:$state, $ionicModal:$ionicModal, $ionicSlideBoxDelegate:$ionicSlideBoxDelegate, $stateParams:$stateParams, $window:$window, ArrayTransport:ArrayTransport, OpdrachtIDTransport:OpdrachtIDTransport, DataManager:DataManager, $http:$http });
