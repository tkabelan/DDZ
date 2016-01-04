angular.module('starter.controllers')

/**
 * Controller class responsible for the login. 
 * AppCtrl is one of the example controllers in the start-application.
 * It works with ionicModal and timeouts which might be useful in another controller.
 */
.controller('AppCtrl', function($scope, $ionicModal, DataManager, $ionicPopup, $localStorage, $state, $http, localStorage, sessionStorage, $window) {

    // Form data for the login modal.
    $scope.loginData = {};
    $scope.error = '';

    // Create the login modal that we will use later.
//    $ionicModal.fromTemplateUrl('templates/login.html', {scope: $scope}).then(function(modal) {
//        $scope.loginModal = modal;
//    });
    
    $ionicModal.fromTemplateUrl('templates/logout.html', {scope: $scope}).then(function(modal) {
        $scope.logoutModal = modal;
    });
  
   $ionicModal.fromTemplateUrl('templates/registreer.html', {scope: $scope}).then(function(modal) {
        $scope.registerModal = modal;
    });
    
    $scope.closeLogin = function() {
        $scope.loginModal.hide();
    };
    
    $scope.closeLogout = function() {
        $scope.logoutModal.hide();
    };
    
    $scope.openLogout = function() {
        $scope.logoutModal.show();
    };

    // Open the login modal.
    $scope.openLogin = function() {
        $scope.loginModal.show();
    };
  
    $scope.openRegistreer = function() {
        $scope.registerModal.show();
    };
  
    $scope.closeRegistreer = function() {
        $scope.registerModal.hide();
    };

    function randomString() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for (var i = 64; i > 0; --i) {
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    }

    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        return re.test(email);
    }
    
    // Perform the logout action when the user click on logout button.
    
    $scope.logout = function() {
        var ingelogd;
        $scope.ingelogd = false;
        var inlogstudentID;
        $scope.inlogstudentID = "geen studentID meer = leeg";
        console.log($scope.ingelogd);
        console.log($scope.inlogstudentID);
        
//        localStorage.clear();
//        localStorage.removeItem(keyPassword);
//        localStorage.removeItem(keyUsername);
		localStorage.clear();
        sessionStorage.clear();
        
        $scope.loginData.email = "";
        $scope.loginData.password = "";
        wachtwoord = "";
//        window.location.reload(true);
//        $state.go('app.logouted');
        $state.go('app.welcome');
//		$window.location.reload();
        $scope.logoutModal.hide();
//        window.location.reload(true); 
      };
    
    const keyToken = 'token';
    const keyUsername = 'username';
    const keyPassword = 'password';
    var token = JSON.parse(window.sessionStorage[keyToken] || '{}');
    var username = JSON.parse(window.localStorage[keyUsername] || '{}');
    var password = JSON.parse(window.localStorage[keyPassword] || '{}');
    
    var username = localStorage.getObject(keyUsername);
    var password = localStorage.getObject(keyPassword);
    
    // Perform the login action when the user submits the login form.
    var noInternetLogin = function() {
        $state.go('app.opdrachtenLijst');
    };
    
    var internetLogin = function() {
        
        var getToken = function() {
            var token;
            var url = "https://ddzweb-app.mybluemix.net/auth/local";
            
            return $http.post(url, {
                username: $scope.loginData.email,
                password: $scope.loginData.password
            }).then(function(response){
                console.log("the respons is : " + response);
                sessionStorage.setObject(keyToken, response.data.token);
                localStorage.setObject(keyUsername, $scope.loginData.email);
                localStorage.setObject(keyPassword, $scope.loginData.password);
                return response;
            });
        };
        
        var getPromise = function() {
            getToken().then(function(data) {
//                console.log(data);
                if (data.data.token !== undefined) {
                    getData();
					$window.location.reload();
                    $state.go('app.profielOverzicht');
                } else {
                    console.log("geen data");
                }
            }
        )};
        
        getPromise();
        
        var getData = function() {
            var token = sessionStorage.getObject(keyToken);
            $http.get('https://ddzweb-app.mybluemix.net/api/students/me/tasks', {
                headers: {'Authorization': 'Bearer ' + token }
            }).then(function(response){
                console.log(response.data);
            });
        };
    };

    $scope.login = function() {
        console.log("Geen username in localstorage, moet login");
//        var url = "https://ddzweb.mybluemix.net/api/students/";
        
        var getToken = function() {
            var token;
            var url = "https://ddzweb-app.mybluemix.net/auth/local";
            
            return $http.post(url, {
                username: $scope.loginData.email,
                password: $scope.loginData.password
            }).then(function(response){
                console.log(response);
                sessionStorage.setObject(keyToken, response.data.token);
                localStorage.setObject(keyUsername, $scope.loginData.email);
                localStorage.setObject(keyPassword, $scope.loginData.password);
                return response;
            });
        };
        
        var getPromise = function() {
            getToken().then(function(data) {
//                console.log(data);
                if (data.data.token !== undefined) {
                    getData();
					$window.location.reload();
                    $state.go('app.profielOverzicht');
                } else {
                    console.log("geen data");
                }
            }
        )};
        
        getPromise();
        
        var getData = function() {
            var token = sessionStorage.getObject(keyToken);
            $http.get('https://ddzweb-app.mybluemix.net/api/students/me/tasks', {
                headers: {'Authorization': 'Bearer ' + token }
            }).then(function(response){
                console.log(response.data);
            });
        };
        
//        $state.go('app.profielOverzicht');
//        scope.loginModal.hide();      
    
    };
    
    var localToken = sessionStorage.getObject(keyToken);
    console.log(localToken.length);
    
//    if (username.length !== undefined && password.length !== undefined) {
    if (username.length > 1 && password.length > 1) {
        if (localToken.length === undefined) {
            try {
                $scope.loginData.email = username;
                $scope.loginData.password = password;
                console.log("Heb wel username in localstorage, maar geen token, dus token ophalen");
            }
            catch(err) {
                console.log("error");
            }
            internetLogin();
            $state.go('app.profielOverzicht');
//            console.log("Heb wel username in localstorage, maar geen token, maar geen internet om token op te halen");
        } else {
            noInternetLogin();
            console.log("Heb wel username in localstorage, en ook token");
        }
    }

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
});