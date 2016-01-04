
angular.module('starter.controllers')

/**
 * Controller class responsible for adding a name to a bewijsstuk.
 */  
.controller('bewijsstukBevestigingCtrl', function($scope, PhotoTransport, $state, $window, DatumPicker, ArrayTransport, OpdrachtIDTransport) {

    $scope.image = PhotoTransport.getLast();
    $scope.opdrachtID = OpdrachtIDTransport.getopdrachtID();

    $scope.saveMedia = function(media) {

        media.contentid = $scope.image;
        media.datuminput = DatumPicker.getdate();
        media.opdrachtID = OpdrachtIDTransport.getopdrachtID();

        // Save the current media in array's and DB
//        DbTable.saveCurrentMedia(media);
        ArrayTransport.insertNieuwInbewijsstukkenPerOpdrachtArray(media);

        // Als drie dan progressbar omhoog
        var currentLength = ArrayTransport.getbewijsstukkenPerOpdrachtArray().length;
        if(currentLength === 3){
            //alert(currentLength)
//            DbTable.updateOpdrachtStatus($scope.opdrachtID, 20);
            ArrayTransport.changeValueProgressbar($scope.opdrachtID, 20);
        }
        else if(currentLength ===1){
            ArrayTransport.setEersteFoto(media.contentid, $scope.opdrachtID);
        }

       /* alert("Deleting the picture from PhotoTransport");
        PhotoTransport.delLast();
        alert("deleting the image");
        $scope.image = null;
        */
        
        // Reset media
        media = null;

        $scope.reset();     
        $state.go('app.opdrachtOverzicht',  {}, { reload: true });
    };

    $scope.goToBewijsstukNew = function() {
        $state.go('app.bewijsstukNieuw');
    };

    $scope.reset = function() {
        $scope.media = {};
    };

    $scope.reset();
});

