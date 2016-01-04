/**
 * Controller class responsible for adding and saving the zelfreflectie of the student.
 */
_controllersModule.controller('ZelfreflectieKoppelenCtrl', function($scope, $state, $stateParams, $window, DataManager, ArrayTransport) {
    
    var task = DataManager.task($stateParams.id);

    if(task && !task.selfreflecties) {
        task.selfreflecties = DataManager.selfreflecties();
    }

    $scope.task = task;

    // variable used to store if all questions are answered.
    var exists = ArrayTransport.selfreflectionExists($scope.task);
    $scope.exists = exists;

    $scope.save = function() {
    	// If there was nothing in the page when opened add 20.
		if(!$scope.exists) {
            $scope.task.voortgangWaarde += 20;
        }
        //console.log(task.voortgangWaarde);
       
       	// Checks if anything is added on the page.
        $scope.exists = ArrayTransport.selfreflectionExists($scope.task);

        // If there there is nothing in description remove 20.
        if(!$scope.exists) {
        	$scope.task.voortgangWaarde -= 20;
        }

        // Store JSON & go to homescreen.
        DataManager.save();
        $state.go('app.opdrachtOverzicht', $stateParams);
        $window.setLocalVariables();
    };
});