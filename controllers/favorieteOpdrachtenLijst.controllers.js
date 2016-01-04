angular.module('starter.controllers')

//$ionicPopup, $q, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, DatumPicker, $scope, $state, $stateParams, $window, DbTable, ArrayTransport, OpdrachtIDTransport, DataManager, FileService, localStorage, $http

.controller('favorieteOpdrachtenLijstCtrl', function($scope,$timeout, $ionicHistory, $state, ArrayTransport, OpdrachtIDTransport, $http, localStorage, DataManager) {
    var taskArrayFavorite =[];
//    $scope.getTaskArrayFavorite = function(){return taskArrayFavorite;};
    $scope.getTaskArrayFavorite = function(){return $scope.taskArray;};
    $scope.setTaskArrayFavorite = function(value){ taskArrayFavorite = value;};  

//    DbTable.getOrderedTableWith({'favoriet':true}).then(function(table) {
//            $scope.setTaskArrayFavorite(table);
//                for (var index = 0; index < table.length; index++ ) {
//                    $scope.getFunction(table[index].opdrachtID);
//                    console.log(table[index].opdrachtID);
//                }
//    });
    
    
    // This code for making task favorite 
    // Maybe you can use .push instead of this piece of code to make it more simpel
    // http://stackoverflow.com/questions/6254050/how-to-add-an-object-into-an-array
    const keyTasks = 'ddz.tasks';
    var tasks = JSON.parse(window.localStorage[keyTasks] || '[]');
    var testObject = localStorage.getObject(keyTasks);

	
	//TEST KL
	$scope.getImage = function(id) {
        // @oleg: need to replace to url (web/file)

        if ( typeof index == "undefined"){
            index = 0;
        }        

        imgArray = DataManager.taskImages(id);
        for (j=0; j < imgArray.length; j++){           
            if (imgArray[j].cover == true){
                index = j;  
                break;              
            }
            else if(j == (imgArray.length-1)){
                index =0;
            }
        }        
                                
        var images = DataManager.taskImages(id);
        return (images && images.length > 0) ? images[index].contentid : '';
    }
	//TEST KL
	
    $scope.taskArray = [];
    var j = 0;
    for (var i = 0; i < testObject.length; i++) {
            if (testObject[i].favoriet === true) {
                $scope.taskArray[j] = testObject[i];
                console.log($scope.taskArray[j]);
                j++;
            }
    }
    // End of that piece of code
    
    
    $scope.getFunction = function(ID){
//         Checking local storage for favorite tasks.
         var temp = DataManager.tasks();
        console.log(temp);
         for (var i = 0; i < temp.length; i++) {
             if (temp[i].favoriet === true) {
                 console.log(temp.length);
             }
         }

//        DbTable.getOnName(ID).then(function(table) {
//            if (table.length !== 0 ) {
//            var index = 0;
//            for (var i = 0; i < taskArrayFavorite.length; i++) {
//                if (taskArrayFavorite[i].opdrachtID === table[0].opdrachtID) {
//                    index = i;
//                }
//            }
//            taskArrayFavorite[index].contentid = table[0].contentid;
//            }
//        });
    };


    $scope.gotoOpdrachtEdit = function(OpdrachtX) {
        OpdrachtIDTransport.getopdrachtID(OpdrachtX.opdrachtID);
        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
        $ionicHistory.clearCache();
        $state.go('app.opdrachtOverzicht', {id:OpdrachtX.id}) ;
    };  

    $scope.goToProfielOverzicht = function() {
        $state.go('app.profielOverzicht')
    }     

});