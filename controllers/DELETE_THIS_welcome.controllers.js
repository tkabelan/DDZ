    
//_controllersModule.controller('WelcomeController', function($scope, $timeout, $ionicHistory, $state, DataManager, ArrayTransport, OpdrachtIDTransport) {
    
//    $scope.opdrachtArray = DataManager.tasks();
//
//    console.log("$scope.opdrachtArray", $scope.opdrachtArray[0].opdrachtID);
//    
//    var taskIdArray = [];
//
//    $scope.sync = function() {
//        DataManager.sync().then(function() {
//            $scope.opdrachtArray = DataManager.tasks(); 
//        });
//    }
//
//    $scope.trackBy = function(task){
//        return task.id;
//    }   
//    
//    $scope.pageRe = function() {
//        window.location.reload(true);
//        $state.go('app.opdrachtenLijst');
//        console.log("refresh");
//    };
//
//
//    $scope.getImage = function(id) {
//        // @oleg: need to replace to url (web/file)
//
//        if ( typeof index == "undefined"){
//            index = 0;
//        }        
//
//        imgArray = DataManager.taskImages(id);
//        for (j=0; j < imgArray.length; j++){           
//            if (imgArray[j].cover == true){
//                index = j;  
//                break;              
//            }
//            else if(j == (imgArray.length-1)){
//                index =0;
//            }
//        }        
//                                
//        var images = DataManager.taskImages(id);
//        return (images && images.length > 0) ? images[index].contentid : '';
//    }
//
//    $scope.gotoOpdrachtNieuw = function() {
//        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
//        OpdrachtIDTransport.deleteopdrachtID();
//        $state.go('app.opdrachtOverzicht');
//        $ionicHistory.clearCache();
//    };
//
//    $scope.gotoOpdrachtEdit = function(opdracht) {
//        /*mediaTransport.setMedia(OpdrachtX);*/
//        OpdrachtIDTransport.setopdrachtID(opdracht.opdrachtID);
//        ArrayTransport.deletebewijsstukkenPerOpdrachtArray();
//        $ionicHistory.clearCache();
//        $state.go('app.opdrachtOverzicht', {id:opdracht.id});
//    };
//
//
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
//
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

//});
