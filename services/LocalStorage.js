// $local storage test
_servicesModule.factory('localStorage', function($window) {
  
    return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    removeItem: function(key) {
      $window.localStorage.removeItem(key);
    },
    clear: function() {
      $window.localStorage.clear();
    },
  }
})

.factory('localStorageContent', function() {
    return{
        isEmpty:function(jsonObj){
            if(jsonObj.length == 0){
                alert("Empty");
            }

        },
        getContent: function(taskName, taskDescription, zelfRef, competence){
            var localStorageArray = [];
            localStorageArray.push(taskName, taskDescription, zelfRef, competence);
            return localStorageArray;

        }
    }
});
