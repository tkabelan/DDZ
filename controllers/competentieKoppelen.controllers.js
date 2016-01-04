'use strict';

/**
 * @ngdoc controller
 * @author unknown, last edited: G.P Bosch
 * @name starter.controllers:CompetentieKoppelenCtrl
 * @description Controller of competencePage
 */

(function() {
    
    angular.module('starter.controllers')
    // Controller class responsible for matching the competentie(s) with the opdracht.
    .controller('CompetentieKoppelenCtrl', function($scope, $state,$stateParams,$ionicHistory, $window, DataManager, ArrayTransport) {
        // Retrieves task Obj from DataManager based on task id in url
        var task = DataManager.task($stateParams.id);
        // Binds task objec to scope
        $scope.task = task;
        // Stores task.opdrachtID to variable opdrachtID
        $scope.opdrachtID = $scope.task.opdrachtID;

        // Checks if competence exist in task.obj and/or are all filled in when coming into the page.
        var bestaatAlComp = ArrayTransport.competenceExists($scope.task);

        // Variable is beeing used to set progressvalue
        $scope.bestaatAlComp = bestaatAlComp;
        
        // Returns competences from localstorage if keys doesn't exist
        if(task && !task.competenties) { 
            task.competenties = DataManager.competenties();
        }
            
        // Function that is triggered by leaving the page
        $scope.onCheckBoxClick = function(initState, checkboxValue) {
            // When competences where not set the progressvalue should be increased.
            if(!$scope.bestaatAlComp) {
                task.voortgangWaarde += 20;
            }

            // Checks if any changed where made since entering the page.
            $scope.bestaatAlComp = ArrayTransport.competenceExists($scope.task);
       
            // If all competences deselected progressvalue -20.
            if(!$scope.bestaatAlComp) {
                task.voortgangWaarde -= 20;
            }

            // Checks the init state of the button and sets them to task.obj
            task.competenties[initState].checkboxValue = task.competenties[initState].selected;
        };

        // Function is triggered when leaving the page
        $scope.save = function(){
            // Function stores task obj to localStorage
            DataManager.save();
            // Is being redirected to overview page
            $state.go('app.opdrachtOverzicht', $stateParams);
            // Sets progressvalues on overview page.
            $window.setLocalVariables();
        };
    });
})();