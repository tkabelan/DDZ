angular.module('starter.controllers')

.controller('competentiesCtrl', function($scope, $state, $http){

    $scope.goToProfielOverzicht = function() {
            $state.go('app.profielOverzicht')
    }  
    
    var inlogstudentID;
    var studentID = $scope.inlogstudentID;
    
    var url = "https://ddzweb.mybluemix.net/api/students/" + studentID;
            
            $http.get(url).then(function(response, status){
                var student = response.data;
                //console.log(student.competences);
                
//                for(i = 0; i < student.competences.length; i++) {
                    $scope.test = student.competences;
//                    $scope.test = student.competences[1].name;
                    //console.log($scope.test);
//                }
                
            });

});