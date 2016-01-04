/**
 * Controller class responsible for managing the tasks list.
 */
_controllersModule.controller('TaskController', function($scope, $window, $stateParams, $location,  $route, $routeParams, $timeout, $ionicHistory, $state, DataManager, ArrayTransport, OpdrachtIDTransport) {
    
    
    $scope.opdrachtArray = DataManager.tasks();
    
    var taskIdArray = [];


    $scope.sync = function() {
        console.log("apply");
      
        DataManager.sync().then(function() {
            //$state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
            $scope.opdrachtArray = DataManager.tasks();       
           
        });
    }
    
    DataManager.loadLocalStorages();

    $scope.trackBy = function(task){
        return task.id;
    }   
    
    $scope.pageRe = function() {
        window.location.reload(true);
        console.log("refresh");
    };


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

    $scope.gotoOpdrachtNieuw = function() {
        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
        OpdrachtIDTransport.deleteopdrachtID();
        $state.go('app.opdrachtOverzicht');
        $ionicHistory.clearCache();
    };

    $scope.gotoOpdrachtEdit = function(opdracht) {
        /*mediaTransport.setMedia(OpdrachtX);*/
        OpdrachtIDTransport.setopdrachtID(opdracht.opdrachtID);
        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
        $ionicHistory.clearCache();
        $state.go('app.opdrachtOverzicht', {id:opdracht.id});
    };


//    var menuShow = false;
//
//    $scope.menuShowTo = function(value){
//        if (value === undefined){ menuShow = !menuShow;}
//        else {menuShow = value;}
//    };
//
//    $scope.getMenuShow = function(){
//        return menuShow;
//    };

//    $scope.OrderOptions = [{name: "favoriet", type: "favoriet", direction: 1},
//                           {name: "nieuwste opdracht", type: "__createdAt", direction: 1}, 
//                           {name: "nieuwste update", type: "__updatedAt", direction: 1},
//                           {name: "afgerond", type: "voortgangWaarde", direction: 1},
//                           {name: "minst afgerond", type: "voortgangWaarde", direction: 0},
//                          ];
//
//    $scope.changeOrder = function(orderOption, direction){
//        DbTable.getOrderedTableBy(orderOption, direction).then(function(table) {
//            $scope.opdrachtArray = table;
//        });
//
//        $scope.menuShowTo(false);           
//    }    
	
	$scope.trySync = function(){
		console.log("TRYING TO SYNC");
		$scope.sync();
		$scope.$broadcast('scroll.refreshComplete');
	}

});
