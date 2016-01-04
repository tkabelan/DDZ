angular.module('starter.controllers')

.controller('werkervaringCtrl', function($scope, $state, $http, $ionicModal, DataManager, localStorage, FileService) {
   
    $scope.goToProfielOverzicht = function() {
        $state.go('app.profielOverzicht')
    }
    
    $scope.saveLocalStorage = function() {    
        // Store JSON
        //Array.concat
        //localStorage.setObject(keyTasks, tasks);
        $ionicModal.fromTemplateUrl('templates/workexp.html', {scope: $scope, animation: 'slide-in-up'}).then(function(modal) {
            $scope.workExpModal = modal;
            $scope.openWorkExp();
        });

        $scope.closeWorkExp = function() {
            $scope.workExpModal.hide();
        };

        $scope.openWorkExp = function() {
            $scope.workExpModal.show();
        };
    
        $scope.$on('$destroy', function() {
            $scope.workExpModal.remove();
        });
        
    };
    
    // Checks if the user entered a correct name - empty != correct
    $scope.checkInvoer = function(bedrijfsnaam) {
        var incorrectInputAlert;
        if (bedrijfsnaam === undefined || bedrijfsnaam === "" ) {
            incorrectInputAlert = "Je moet een naam geven!";
        } else if(bedrijfsnaam.length >= 15){ 
            incorrectInputAlert = "Je naam is te lang!";
        }
        return incorrectInputAlert;
    };
    
    $scope.update = function(workexp) {
        $scope.incorrectInputAlert = $scope.checkInvoer(workexp);
        if(($scope.incorrectInputAlert === undefined)) {
            DataManager.workexp().push(workexp);
            console.log("localstorage updated");
            $scope.closeWorkExp();
        }
        DataManager.save();
    }
    
//    Get workexperience student form mongodb
//    var inlogstudentID;
//      var studentID = $scope.inlogstudentID;
//    
//    var url = "https://ddzweb.mybluemix.net/api/students/"+studentID;
//            
//            $http.get(url).then(function(response, status){
//                var student = response.data;
//               $scope.expStudent = student.workexperiences;
//            });
    
    // Get workexperience student from local storage
    var studentworkexp = DataManager.workexp();
    $scope.expStudent = studentworkexp;
    
    //TESTING
	// THIS FUNCTION EXECUTES THE LOADLOCALSTORAGES() FROM DATAMANAGER
    
    console.log(studentworkexp);
    
    $scope.loadWorkExp = function() {
        DataManager.loadWorkExp();
    }
    
//	$scope.loadWorkExp = function() {
//        if (studentworkexp.length === 0) {
//		DataManager.loadWorkExp();
//        } else {
//            DataManager.postWorExp();
//            console.log("work experience is filled, nothing to get");
//        }
//	}
	//
	
	$scope.deleteWorkExp = function() {
		console.log("Should delete this workexperience card");
	}
    
});
