angular.module('starter.controllers')

/**
 * Controller class responsible matching an omschrijving with the opdracht.
 */

.controller('omschrijvingKoppelenCtrl', function($scope, $state, $stateParams, $window, OpdrachtIDTransport, DataManager, localStorage, localStorageContent, ArrayTransport, $http){

    $scope.task = DataManager.task($stateParams.id);
    
    $scope.opdrachtID = $stateParams.id;    

    // variable used to store if there is already a description
    var exists = ArrayTransport.descriptionExists($scope.task);
    $scope.exists = exists;
    
    
//     Returns to the opdrachtOverzicht and saves JSON object
//    $scope.goToOpdrachtOverzicht = function() {
////        $state.go('app.tasks/taskID')
//		// If there was nothing in the page when opened add 20.
////        if(!$scope.exists) {
////            $scope.task.voortgangWaarde += 20;
////        }
//    };

    // Returns to the opdrachtOverzicht and saves JSON object
    $scope.goToOpdrachtOverzicht = function() {
//		$scope.goToOpdrachtOverzicht = function(searchText) {
//        var textinput = searchText;
//		console.log(searchText);
        
		// If there was nothing in the page when opened add 20.
        if(!$scope.exists) {
            $scope.task.voortgangWaarde += 20;
//            $http.put(url, {description: textinput});
        }
        
//        $scope.check = function (searchText) {
//        }
        
        // Checks if something changed on the page.
        $scope.exists = ArrayTransport.descriptionExists($scope.task);

        // If there there is nothing in description remove 20.
        if(!$scope.exists) {
        	$scope.task.voortgangWaarde -= 20; 
        }
        

        // Store JSON
        DataManager.save();
        $state.go('app.opdrachtOverzicht', $stateParams);
        $window.setLocalVariables();
    };
    
//        var inlogstudentID;
//        var studentID = $scope.inlogstudentID;
//        var taskID = $scope.opdrachtID;
//
//        var url = "https://ddzweb.mybluemix.net/api/students/" + studentID + /tasks/ + taskID;
//        
//        $http.get(url).then(function(response, status){
//            var student = response.data;
//            $scope.naam = student;            
//        });
    
    //Toggles the ShowHelp.
    $scope.toggleHelp = function(help) {
        if ($scope.isHelpShown(help)) {
            $scope.shownHelp = help;          
        } 
        else {
            $scope.shownHelp = null;
        }
    };
    
    $scope.isHelpShown = function(help) {
        return $scope.shownHelp === null;
    };      
    
       


}); // end of controller
