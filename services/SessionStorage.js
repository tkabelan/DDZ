// $session storage test
_servicesModule.factory('sessionStorage', function($window) {
  
    return {
    set: function(key, value) {
      $window.sessionStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.sessionStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.sessionStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.sessionStorage[key] || '{}');
    },
    clear: function() {
      $window.sessionStorage.clear();
    },
  }
})

.factory('sessionStorageContent', function() {
    return{
        isEmpty:function(jsonObj){
            if(jsonObj.length == 0){
                alert("Empty");
            }

        },
        getContent: function(taskName, taskDescription, zelfRef, competence){
            var sessionStorageArray = [];
            sessionStorageArray.push(taskName, taskDescription, zelfRef, competence);
            return sessionStorageArray;

        }
    }
});