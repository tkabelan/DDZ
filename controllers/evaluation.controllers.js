
angular.module('starter.controllers')

/**
 * Controller class responsible for adding and saving the evaluation (should be only accessible by the teacher).
 */
.controller('evaluationCtrl', function($ionicModal, $ionicSlideBoxDelegate, $scope, $state, $stateParams, $window, ArrayTransport, OpdrachtIDTransport, DataManager, $http){


    var task = DataManager.task($stateParams.id);
    $scope.task = task;
//    console.log($scope.task);
    
    var listTeachers = DataManager.teacherinfo();
//            console.log(listTeachers);
//            console.log($scope.task.teacher.trim());
            
    for (var i = 0; i < listTeachers.length; i++) {
        $scope.teacherID;
        if (listTeachers[i].teacherID === $scope.task.teacher) {
             $scope.teacherName = listTeachers[i].name;
//                    console.log($scope.teacherName);
        }
    }
        
    if(task && !task.feedback) {
        task.feedback = DataManager.feedback();
//        console.log("task print all details :" + JSON.stringify(task));
    }
    
    $scope.opdrachtID = $stateParams.id;    

    $scope.goToOpdrachtOverzicht = function() {
        DataManager.save();
        $state.go('app.opdrachtOverzicht', $stateParams);
        ///
//        $scope.feedbackCheckAll(); //commented out on 8-7-2015 by KL
        // (FOR NOW) Feedback can be read at anytime. But progress value from Feedback will only be added if other assignments are all fulfilled (80%).
//        if($scope.feedbackAllSeen === true && task.voortgangWaarde >=80){ //commented out on 8-7-2015 by KL
//            task.voortgangWaarde += 20;
//        }
        ///
    }

    /*
     * If given group is the selected group, deselect it. Else, select the given group. 
     * When a feedback is opened, this feedback part will be marked as 'feedbackSeen = true'.
     */
     $scope.toggleGroup = function(feedback) {
        if ($scope.isGroupShown(feedback)) {
            $scope.shownGroup = null;          
        } 
        else {
            $scope.shownGroup = feedback;
//            this.feedback.feedbackSeen = true; //commented out on 8-7-2015 by KL
        }
    };
    
    $scope.isGroupShown = function(feedback) {
        return $scope.shownGroup === feedback;
    };      
    
//     Checks if all feedback has been read/seen. Sets value feedbackAllSeen to true if so. //commented out on 8-7-2015 by KL
//        $scope.feedbackCheckAll = function(feedback){
//            $scope.feedbackAllSeen = false; 
//            for(i = 0; i < task.feedback.length; i++){ 
//                if(task.feedback[i].feedbackSeen === true){
//                    $scope.feedbackAllSeen = true;
//                }
//                else {
//                    $scope.feedbackAllSeen = false;
//                    break;
//                }
//            } 
//            return $scope.feedbackAllSeen;
//        }; //commented out on 8-7-2015 by KL
    
//      var inlogstudentID;
//      var studentID = $scope.inlogstudentID;
//      var taskID = $scope.opdrachtID;
      
//    console.log(taskID);
    
//            var url = "https://ddzweb.mybluemix.net/api/students/" + studentID + "/tasks/" + taskID; //commented out on 8-7-2015 by KL
//    
//            $http.get(url).then(function(response, status){
//                $scope.taskObj = response.data;
//                var taakObj = $scope.taskObj;
//
//                $scope.fb = [5];
//
//                if(taakObj.feedback){
//                $scope.fb[0] = taakObj.feedback.evidence;
//                $scope.fb[1] = taakObj.feedback.description;
//                $scope.fb[2] = taakObj.feedback.competences;
//                $scope.fb[3] = taakObj.feedback.selfreflections;
//                $scope.fb[4] = taakObj.feedback.comments;
//            }
//
//            }); //commented out on 8-7-2015 by KL
    
//    $scope.showFeedback = function() {
//        if (taskID.length > 18) {
//            return true;
//            console.log("Yes, please read!");
//        }
//        else {
//            console.log("Nothing here!");
//            return false;
//        }
//    }; 

	
	//EVIDENCE NOT APPROVED
	if(task.feedback.evidence.feedback != undefined){
		var evidenceNotApproved = false;
		if(task.feedback.evidence.feedback.length > 0 && task.feedback.evidence.approved === false){
			var evidenceNotApproved = true;
		}
	}
	//
	//DESCRIPTION NOT APPROVED
	if(task.feedback.description.feedback != undefined){
		var descriptionNotApproved = false;
		if(task.feedback.description.feedback.length > 0 && task.feedback.description.approved === false){
			var descriptionNotApproved = true;
		}
	}
	//
	//COMPETENCES NOT APPROVED
	
	//
	//SELFREFLECTIONS NOT APPROVED
	if(task.feedback.selfreflections.feedback != undefined){
		var selfreflectionsNotApproved = false;
		if(task.feedback.selfreflections.feedback.length > 0 && task.feedback.selfreflections.approved === false){
			var selfreflectionsNotApproved = true;
		}
	}
	//
    
	$scope.feedbackObject = [
								{
									feedbacktitle: "Bewijsstukken",
									feedback: task.feedback.evidence.feedback,
									approved: task.feedback.evidence.approved,
									notApproved: evidenceNotApproved,
								},
								{
									feedbacktitle: "Omschrijving",
									feedback: task.feedback.description.feedback,
									approved: task.feedback.description.approved,
									notApproved: descriptionNotApproved,
								}, 
								{
									feedbacktitle: "Competenties",
//									feedback: task.feedback.competences.feedback,
									approved: task.feedback.competences.approved,
//									notApproved: competencesNotApproved,
								}, 
								{
									feedbacktitle: "Zelfreflecties",
									feedback: task.feedback.selfreflections.feedback,
									approved: task.feedback.selfreflections.approved,
									notApproved: selfreflectionsNotApproved,
								}, 
							];
	
//	console.log(task.feedback);
//	console.log(task.competenties);
	
	
//	SHOWS ONLY SELECTED COMPETENCES
//	var selectedCompetentiesFeedback = [];
//	for(i = 0, j = 0; i < task.competenties.length; i++){
//		if(task.competenties[i].selected === true){
//			selectedCompetentiesFeedback[j] = 
//				{
//					name: task.competenties[i].name,
//					feedback: task.competenties[i].feedback,
//				};
//			j++;
//		}
//	}
//	
//	console.log(selectedCompetentiesFeedback);
//	
    
});