angular.module('starter.controllers')

/**
 * Controller class responsible for adding and displaying the bewijsstukken (a delete function will also be a part of this controller).
 */

    .controller('opdrachtOverzichtCtrl', function($ionicPopup, $q, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, DatumPicker, $scope, $state, $stateParams, $window, ArrayTransport, OpdrachtIDTransport, DataManager, FileService, localStorage, $http) {
    
    // Checks whether the opdracht has a ID, if not a modal is opened where the user can enter a name for the opdracht
    var task = DataManager.task($stateParams.id);
    
    $scope.myActiveSlide = 1;

    $scope.task = task;
    
    $scope.opdrachtID = $stateParams.id;    
    $scope.imageFavorietStatus = false;
    $scope.imageCoverStatus = false;
    
    $scope.DataManager = DataManager;
	
    // Beeing used when page is reloaded.
    $window.setLocalVariables = function() {
        $scope.descriptionFilledIn = ArrayTransport.descriptionExists($scope.task);
        $scope.competenceFilledIn = ArrayTransport.competenceExists($scope.task);
        $scope.selfreflectionFilledIn = ArrayTransport.selfreflectionExists($scope.task);   
    };
    
	//KL
	var competencesObject = DataManager.getCompetencesObject();
	var questionsObject = DataManager.getQuestionsObject();
//	console.log(competencesObject);
//	console.log(questionsObject);
	//KL

    // Sets default value from JSON key favoriet
    if (task != undefined) {
        $scope.favorieteStatus = task.favoriet;
    };    

    $scope.changeOpdrachtNaam = function() {
        $ionicModal.fromTemplateUrl('templates/changeOpdrachtNaam.html', {scope: $scope, animation: 'slide-in-up'}).then(function(modal) {
            $scope.changeModal = modal;
            //console.log("changeModal is :", $scope.changeModal);
            $scope.openChangeModal();
        });

        $scope.closeChangeModal = function() {
            $scope.changeModal.hide();
            $state.go('app.opdrachtenLijst');
        };

        // Open the login modal.
        $scope.openChangeModal = function() {
            $scope.changeModal.show();
        };

        $scope.$on('$destroy', function() {
            $scope.changeModal.remove();
        });
    };

    if(!task) {

        var date = new Date();
        var timeInSeconds = date.getTime();
		

        // CREATING A NEW TASK FROM APP (LOCAL FORMAT)
		console.log("UPDATE LOCAL FORMAT FOR NEW TASK FROM APP");
		//
			var competencesTest = [];
//			console.log(competencesObject.length);
			for(i = 0; i < competencesObject.length; i++){
				competencesTest[i] = {
										competence: competencesObject[i].competence,
										name: competencesObject[i].name,
										selected: false,
										explanation: '',
										checkboxValue: false,
										approved: false,
										feedback: '',
									}
			}
		//
			var selfreflectionTest = [];
//			console.log(questionsObject.length);
			for(i = 0; i < questionsObject.length; i++){
				selfreflectionTest[i] = {
										question: questionsObject[i].question,
										selfreflection: questionsObject[i].selfreflection,
										answer: '',
										approved: false
									}
			}
		
        $scope.task = {            
            id: 'task' + timeInSeconds,                             //localID
            opdrachtID: 'opdracht' + timeInSeconds,                 //localID met andere naam
            description: '',                                   		//description
            favoriet: false,                                        // favorite
            opdrachtnaam: '',                   					//name
            selfreflecties: selfreflectionTest,                        //selfreflections[]
            competenties: competencesTest,                        //competences[]
            datuminput: DatumPicker.getdate(),                      //date
            feedback:{                                              //feedback
                description: {
					feedback: '',
					approved: false,
					pending: false,
				},
                competences: {
					approved: false,
					pending: false,
				},                                       
                selfreflections: {
					feedback: '',
					approved: false,
					pending: false,
				},                                
                evidence: {
					feedback: '',
					approved: false,
					pending: false,
				},                                     
                generalRemarks: '',                        
            },                                                      //
            voortgangWaarde: 0,                                     //progress
            status: 1,                                              //status
			teacher: '',
			//KL testing
			
			//
            contentid: "img/placeholder.png",                       //contentID
        };

        $scope.imagesArray = [];
        $scope.changeOpdrachtNaam();
        $scope.imagesArray2 = [];
                     
        // If the opdracht has an ID and name, then retrieve them and store them locally.
    } else {

        $scope.descriptionFilledIn = ArrayTransport.descriptionExists($scope.task);
        $scope.competenceFilledIn = ArrayTransport.competenceExists($scope.task);
        $scope.selfreflectionFilledIn = ArrayTransport.selfreflectionExists($scope.task);

        FileService.setTaskName($scope.task.opdrachtnaam);                    

        $scope.opdrachtID = task.opdrachtID;
//        $scope.opdrachtID = task.id;
        $scope.opdrachtNaam = task.opdrachtnaam;


        $scope.imagesArray = DataManager.taskImages(task.opdrachtID);    
        //console.log("IMAGES ARE : " + JSON.stringify($scope.imagesArray));      
        OpdrachtIDTransport.setopdrachtID($scope.opdrachtID);
            
        }


        if ($scope.imagesArray && $scope.imagesArray.length == 1){                        
                        $scope.image_index = 0;
            }
        else if ($scope.imagesArray.length > 1){           
            for (i=0; i< $scope.imagesArray.length; i++){                
                if ($scope.imagesArray[i].cover == true){
                    $scope.image_index = i;                       
                    break;             
                }        
                else if (i == ($scope.imagesArray.length-1)){
                    $scope.image_index = 0;
                }
            }
        }   
      
        
    /* This function is currently not used as the client decided to move back to showing a modal. */
    $scope.selectFoto = function(index) {
        $scope.image = document.getElementById("groteFoto");
        $scope.image.src = $scope.imagesArray[index].contentid;
    };

    $scope.openThumbnailModal = function(index) {
        $scope.myActiveSlide = index;
        $scope.indTest = index;
              
        $ionicModal.fromTemplateUrl('image-modal.html', {scope: $scope, animation: 'slide-in-up'}).then(function(modal) {
            $scope.modal = modal;
            $scope.currentmedia = $scope.imagesArray[index].contentid;
            $scope.modal.show();
            
            $scope.themedia = $scope.imagesArray[index];            
            $ionicSlideBoxDelegate.update();

        });
    };

       
    $scope.closeThumbnailModal = function() {        
        $scope.modal.hide();        

    };  

    // Disables the slide functionality of the modal.
    $scope.slideStop = function(index) {
              
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.update();        
    };


    $scope.nextSlide = function() {
        $scope.currentmedia = $scope.imagesArray[index].contentid;
        $ionicSlideBoxDelegate.next();
    };

    var menuShow = false;
    $scope.getMenuShow = function() {return menuShow; };
    $scope.menuShowTo = function(value){
        if (value === undefined) {menuShow = !menuShow;}
        else {menuShow = value;}
    };

    var menuShowLonger = false;
    $scope.getMenuShowLonger = function() { return menuShowLonger; };
    $scope.menuShowLongerTo = function(value) {
        if (value === undefined) {menuShowLonger = !menuShowLonger;}
        else {menuShowLonger = value;}
    };
    
    const keyTasks = 'ddz.tasks';
    var tasks = JSON.parse(window.localStorage[keyTasks] || '[]');
    const keyDeleteID = 'ddz.deleteid';
//    var deteleid = JSON.parse(window.localStorage[keyDeleteID] || '[]');
    
    $scope.makeOpdrachtFavoriet = function() { 
        
        if(!$scope.favorieteStatus) {
            $scope.favorieteStatus = true;
            $scope.task.favoriet = true;
//            ArrayTransport.setFavorieteStatus($scope.opdrachtID,$scope.favorieteStatus);
            ArrayTransport.setFavorieteStatus($scope.opdrachtID, true);
        }
        else {
            $scope.favorieteStatus = false;
            $scope.task.favoriet = false;
            ArrayTransport.setFavorieteStatus($scope.opdrachtID, false);
        }
        
        DataManager.save();
                
//        DbTable.updateOpdrachtFavoriet($scope.opdrachtID,!$scope.favorieteStatus);
//        $scope.menuShowTo(false);
//        ArrayTransport.setFavorieteStatus($scope.opdrachtID,!$scope.favorieteStatus);
//        $scope.favorieteStatus = !$scope.favorieteStatus;       
    };

    $scope.deleteOpdracht = function() {
//        DbTable.deleteOpdrachtTable($scope.opdrachtID);
        ArrayTransport.deleteOpdrachtArray($scope.opdrachtID);
        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
        OpdrachtIDTransport.deleteopdrachtID();
        
        $state.go('app.opdrachtenLijst');
    };

    // Confirmation dialog for deleting the opdracht.
    $scope.showConfirm = function() {

        var confirmPopup = $ionicPopup.confirm({
            
            title: 'Verwijderen',
            template: 'Weet je zeker dat je deze opdracht wilt verwijderen?',
            buttons: [{
                text: 'Nee',
                type: 'button-positive',
                onTap: function(e) {
                    // e.preventDefault() will stop the popup from closing when tapped.
                }
            }, {
                text: 'Ja',
                type: 'button-positive',
                onTap: function(e) {
                    // Returning a value will cause the promise to resolve with the given value.
                    return 1;
                }
            }]
        }); 

        confirmPopup.then(function(res) {
            
//                            var oldIDs = [];
//                localStorage.setObject(keyDeleteID, oldIDs);
            
            if(res) {
                console.log('You are sure');
                
                // Delete function here for MongoDB
                var inlogstudentID;
                var taskID = $scope.opdrachtID;
                var studentID = $scope.inlogstudentID;
                
                var oldIDs = [];
                var oldIDs = localStorage.getObject(keyDeleteID || []);
                
                if (taskID.length > 21) {
                    oldIDs.push(taskID);
                    localStorage.setObject(keyDeleteID, oldIDs);
                }
                
//                $http.delete("https://ddzweb.mybluemix.net/api/students/" + studentID + "/tasks/" + taskID);

                
                // DB delete function till here                
                
                var taken = localStorage.getObject(keyTasks);
                console.log(taken);
                
                ArrayTransport.deleteOpdrachtArray($scope.opdrachtID);
                ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
                OpdrachtIDTransport.deleteopdrachtID();
                DataManager.save();
                $state.go('app.opdrachtenLijst');
                
            } else {
                console.log('You are not sure');
                $scope.menuShowTo(false);
                $state.go('app.opdrachtOverzicht');
            }
        });
    };

    $scope.deleteOpdracht = function() {
        $scope.showConfirm();
    };

    $scope.goToOpdrachtenLijst = function() {
        $ionicViewService.nextViewOptions({disableBack: true});
        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
        OpdrachtIDTransport.deleteopdrachtID();
        $state.go('app.opdrachtenLijst');
    };   

    // Function to check length
    $scope.controlExists = function() {
        var images = DataManager.taskImages(task.opdrachtID);
        if (images.length >= 1) {
            $scope.exists = true;
        } else {
            $scope.exists = false;
        }
    }; 

    // Initialize variable exists.
    if(task){
        $scope.controlExists();
    }
    

    $scope.goToBewijsstukNieuw = function() {    

        FileService.setTaskName($scope.task.opdrachtnaam);         

        FileService.pickFile(function(data){
            
            var images = DataManager.taskImages(task.opdrachtID);   
            
            //var images = DataManager.taskImages(task.opdrachtID);          
            var media = {
                contentid  : data,
                datuminput : DatumPicker.getdate(),
                opdrachtID : task.opdrachtID,
                favoriet : $scope.imageFavorietStatus,
                cover: $scope.imageCoverStatus
            };            
            
            images.push(media); 
            //console.log("images details are : " + JSON.stringify(images));          
                                          
            DataManager.save();
            ArrayTransport.insertNieuwInbewijsstukkenPerOpdrachtArray(media);

            // Adds progressvalue.
            if(!$scope.exists) {
                $scope.task.voortgangWaarde += 20;
            }
            // Checks if anything changed.
            $scope.controlExists();

            if(!$scope.exists) {
                $scope.task.voortgangWaarde -= 20;                
            }
          
            $scope.$apply(function(){
                 $scope.imagesArray = images;                
                
            });                 

        });                      
            
    };    


    $scope.goToProfiel = function() {
        $state.go('app.profiel');
    };

    $scope.goToBewijsstukkenPerOpdrachtLijst = function() {
        $state.go('app.bewijsstukkenPerOpdrachtLijst', $stateParams);
    };

    // Checks if the user entered a correct name - empty != correct
    $scope.checkInvoer = function(naam) {
        var incorrectInputAlert;

        if (naam === undefined || naam === "" ) {
            incorrectInputAlert = "Je moet de opdracht een naam geven!";
        }
        else if(naam.length >= 25){ 
            incorrectInputAlert = "Je naam is te lang, schrijf een deel op bij de omschrijving van de opdracht";
        }

        return incorrectInputAlert;
    };
    
    $scope.checkInvoer2 = function(naam) {
        var incorrectTeacher;

        if (naam === undefined || naam === "" ) {
            incorrectTeacher = "Selecteer een docent!";
        }
        return incorrectTeacher;
    };

    $scope.update = function() {
        // Check op foutieveInvoer
        $scope.incorrectInputAlert = $scope.checkInvoer($scope.task.opdrachtnaam);
        $scope.incorrectTeacher = $scope.checkInvoer2($scope.task.teacher);
        
            var listTeachers = DataManager.teacherinfo();
                      
            for (var i = 0; i < listTeachers.length; i++) {
                $scope.teacherID;
                if (listTeachers[i].name === $scope.task.teacher.trim()) {
                     $scope.teacherID = listTeachers[i].teacherID;
                }
            }
        
        
        var inlogstudentID;
        var studentID = $scope.inlogstudentID;        
        if(($scope.incorrectInputAlert === undefined && $scope.incorrectTeacher === undefined )) {

            console.log($scope.studentinfo.mentor);
            // creata new
            if(!task){
                task = $scope.task;
                
                  task.teacher = $scope.teacherID;
//                task.feedback.competences = "";
//                task.feedback.description = "";
//                task.feedback.evidence = "";
//                task.feedback.comments = "";
//                task.feedback.selfreflections = "";
      
                OpdrachtIDTransport.deleteopdrachtID();
                ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
                DataManager.tasks().push(task);
            }
            
//            console.log("feedback : " + JSON.stringify(task));
            // POSTING INTO MONGODB (MONGOKEY: LOCALKEY)
//            $http.post("https://ddzweb.mybluemix.net/api/students/" + studentID + "/tasks", {
//                name: task.opdrachtnaam, 
//                favorite: task.favoriet, 
//                feedback: task.feedback,
//                selfreflections: task.questions,
//                competences: task.competenties,
//                progress: task.voortgangWaarde,
//                description: task.description,
//            });
            
            DataManager.save();
            $scope.closeChangeModal();
			$scope.goToOpdrachtOverzicht();
			
        }
    };

    $scope.goToOpdrachtenLijst = function() {
        $state.go('app.opdrachtenLijst');
    };

    $scope.goToOpdrachtOverzicht = function() {
        $state.go('app.opdrachtOverzicht', $stateParams);

        // Very important function - throws away the view and therefore reloads the controller - so that variables are updated.
        $ionicHistory.clearCache();
    };
    

    $scope.showConfirmPhoto = function(media, index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Verwijderen',
            template: 'Weet je zeker dat je dit bewijsstuk wilt verwijderen?',
            buttons: [{
                text: 'Nee',
                type: 'button-positive',
                onTap: function(e) {
                    // e.preventDefault() will stop the popup from closing when tapped.
                }
            }, {
                text: 'Ja',
                type: 'button-positive',
                onTap: function(e) {
                    // Returning a value will cause the promise to resolve with the given value.
                    return 1;
                    
                }
            }]
        }); 

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                
                var opdrachtID = media.opdrachtID;
                var dateInput = media.datuminput;

                
                $scope.imagesArray.splice(index, 1);                         
                DataManager.save();

                if ($scope.imagesArray.length === 0) {
                    $scope.task.voortgangWaarde -= 20;
                }
                
                //DbTable.deleteCurrentMedia(opdrachtID, dateInput);
                ArrayTransport.deletebewijsstukPerOpdrachtArray($scope.themedia);
                $scope.modal.hide();
                $scope.slideIndex = index-1;
                
                // check if there are still 3 pictures available - if not then lower the progress bar.
                var currentLength = ArrayTransport.getbewijsstukkenPerOpdrachtArray().length;
                if(currentLength === 0) {
//                    DbTable.updateOpdrachtStatus(opdrachtID, -20);
                    ArrayTransport.changeValueProgressbar(opdrachtID, -20); 
                    ArrayTransport.setEersteFoto("img/placeholder.png", opdrachtID);
                }


            } else {
                console.log('You are not sure');
                $scope.modal.hide();
            }
        });
    };

    $scope.deleteMedia = function(media, index) {
        
        $scope.showConfirmPhoto(media, index);
    };

    $scope.updateCover = function(media, index){   
    
        $scope.image_index = index;

        if (media.cover == false){
            media.cover = true;
            ArrayTransport.setCoverImageIndex(index); 
            $scope.removeImageCoverTag($scope.imagesArray, index);
        }
        else{
            media.cover = false;
        }
        DataManager.save();       
    }
   

    $scope.removeImageCoverTag = function(array, index){        
        for (i =0; i< array.length; i++){
            if (i != index){                
                media_cover = array[i];
                media_cover.cover = false;                
            }
        }
    }
    
    $scope.teachersArray = DataManager.teacherinfo();
    $scope.studentinfo = DataManager.studentinfo();
    
//      var inlogstudentID;
//      var studentID = $scope.inlogstudentID;
//      var taskID = $scope.opdrachtID;
//      var url = "https://ddzweb.mybluemix.net/api/students/" + studentID + "/tasks/" + taskID;

//    $http.get(url).then(function(response, status){ //commented out on 8-7-2015 by KL
//       $scope.eenTaskObj = response.data;
//       var taakObj = $scope.eenTaskObj;
//       $scope.eenTaskObjDescription = taakObj.description;
//        
//       // Feedback
//       if(taakObj.feedback){
//            $scope.check1 = taakObj.feedback.evidence;
//            $scope.check2 = taakObj.feedback.description;
//            $scope.check3 = taakObj.feedback.competences;
//            $scope.check4 = taakObj.feedback.selfreflections;
//            $scope.check5 = taakObj.feedback.comments;
//
//            if($scope.check1.length == 0 && $scope.check2.length == 0 && $scope.check3.length == 0 && $scope.check4.length == 0 && $scope.check5.length == 0){
//                $scope.feedbackFilledIn = false;
//            }
//            else{
//                $scope.feedbackFilledIn = true;
//            }
//        }
//       // 
//       // Check if description is filled in via MongoDB
////        if($scope.eenTaskObjDescription){
////        if($scope.eenTaskObjDescription.length > 0){
////            $scope.descriptionBestaat = true;
////        }
////        }
//    }); //commented out on 8-7-2015 by KL

    
});
