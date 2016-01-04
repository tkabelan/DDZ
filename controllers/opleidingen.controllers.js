angular.module('starter.controllers')

.controller('opleidingenCtrl', function($scope, $state) {
 
    $scope.goToProfielOverzicht = function() {
        $state.go('app.profielOverzicht')
    }     

});