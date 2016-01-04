angular.module('starter.controllers')

/**
 * Controller class responsible for the profile overview.
 */  
.controller('profielOverzichtCtrl', function($scope, $state, $http, $stateParams, DataManager, localStorage, sessionStorage) {
    
    $scope.goToOpdrachtenLijst = function() {
        $state.go('app.opdrachtenLijst');
    };
    
    $scope.goToFavorieteOpdrachtenLijst = function(){
        $state.go('app.favorieteOpdrachtenLijst')
    };
    
    $scope.goToAanbevelingen = function(){
        $state.go('app.aanbevelingen')
    };
    
    $scope.goToCompetenties = function(){
        $state.go('app.competenties')
    };
    
    $scope.goToWerkervaring = function(){
        $state.go('app.werkervaring')
    };    

//    var token = JSON.parse(window.sessionStorage[keyToken] || '{}');
    const keyToken = 'token';
    $scope.loadName = function() {

        var token = sessionStorage.getObject(keyToken);
        
        $http.get('https://ddzweb-app.mybluemix.net/api/students/me/', {
            headers: {'Authorization': 'Bearer ' + token }
        }).then(function(response){
            var student = response.data;
            $scope.naam = student;
            console.log($scope.naam);
        });
        
//        var inlogstudentID;
//        var studentID = $scope.inlogstudentID;
//        var url = "https://ddzweb.mybluemix.net/api/students/"+studentID;
//        $http.get(url).then(function(response, status){
//            var student = response.data;
//            //console.log(student);
//            $scope.naam = student;
//            //console.log(student);
//        };
    };
    
    $scope.loadName();

    var tokenOS = 'AUTH_tk2303b6f8193f4f87a3b8ed8c4f3cec09';
    
    $http.get('https://dal05.objectstorage.softlayer.net/v1/AUTH_5917d289-ee4b-47c5-acf5-3311692989cf/myNewContiner/car1.jpg', {
            headers: {'X-Auth-Token': tokenOS }
        }).then(function(response){
            console.log(response.data);
//            var student = response;
//            $scope.naam = student;
//            console.log($scope.naam);
    });

    
    // Code for menuShow
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
    
	//TESTING
	// THIS FUNCTION EXECUTES THE LOADLOCALSTORAGES() FROM DATAMANAGER
	$scope.loadLocalStorages = function() {
        console.log("delete sessionStorage");
		console.log("CREATING AND LOADING LOCAL STORAGES");
		DataManager.loadLocalStorages();
	}
});