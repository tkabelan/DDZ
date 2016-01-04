/**
 * Controllers class responsible for managing the bewijsstukken per opdracht.
 */ 

_controllersModule.controller('bewijsstukkenPerOpdrachtLijstCtrl', function($ionicPopup, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $scope, $state, $stateParams, $window, DataManager, DatumPicker, ArrayTransport, FileService, OpdrachtIDTransport) {

    $scope.goToOpdrachtOverzicht = function() {
        $state.go('app.opdrachtOverzicht', $stateParams);
        $ionicHistory.clearCache();

    }; 
    
      $scope.goToOpdrachtenLijst = function() {
        $state.go('app.opdrachtenLijst', $stateParams);
        $ionicHistory.clearCache();
    }; 

    var task = DataManager.task($stateParams.id);

    $scope.task = task;
    $scope.opdrachtID = task.opdrachtID;
    $scope.imagesArray = DataManager.taskImages(task.opdrachtID);
    $scope.imageFavorietStatus = false;
    $scope.imageCoverStatus = false;

    /*
     * Functions to load the modal in this page.
     */

    // Image modal (carousel).
    /*--------------------------------------------*/

    $ionicModal.fromTemplateUrl('image-modal.html', {scope: $scope, animation: 'slide-in-up'}).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(index) {
        $scope.currentmedia = $scope.imagesArray[index].contentid;
        $scope.modal.show();
        $scope.themedia = $scope.imagesArray[index];
        //test code *******************************
        $scope.indTest = index;

        //test code *******************************

        // Important: This line is needed to update the current ion-slide's width.
        // Try commenting this line, click the button and see what happens.
        $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // Called each time the slide changes. Currently not used as swiping is disabled.
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

    // Call these functions if you need to manually control the slides. Currently not used as swiping is disabled.
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Disables the swipe functionality of the modal.
    $scope.slideStop = function(index) {
        $ionicSlideBoxDelegate.enableSlide(false);
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.$on('modal.shown', function() {
        //console.log('Modal is shown!');
    });

    /*--------------------------------------------*/

    /*-------*/
    // A confirm dialog

    $scope.showConfirm = function(media, index) {
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

                
                $scope.imagesArray.splice(index,1);
                DataManager.save();

                console.log($scope.imagesArray.length);
                if ($scope.imagesArray.length === 0) {
                    $scope.task.voortgangWaarde -= 20;
                }
                console.log($scope.task.voortgangWaarde);
                
                //DbTable.deleteCurrentMedia(opdrachtID, dateInput);
                ArrayTransport.deletebewijsstukPerOpdrachtArray($scope.themedia);
                $scope.modal.hide();
                $scope.slideIndex = index - 1;

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
        
        $scope.showConfirm(media, index);     
    };

    // $scope.goToBewijsstukNieuw = function() {
    //     $state.go('app.bewijsstukNieuw', $stateParams);
    // }; 

    $scope.updateCover = function(media, index){   

        if (media.cover == false){
            media.cover = true;
            ArrayTransport.setCoverImageIndex(index); 
            $scope.removeImageCoverTag($scope.imagesArray, index);
        }
        else if (media.cover == true){
            media.cover = false;
        }
        DataManager.save();
        ind = ArrayTransport.getCoverImageIndex();
    }
    
    var imageArray = DataManager.images();
    var tasksArray = DataManager.tasks();
    var id_1 = tasksArray[0].id;
    var id_2 = tasksArray[0].opdrachtID;
    
    console.log(tasksArray);
    
    var numOfFavorites = 0;
    
    if (imageArray[id_1] === undefined) {
        for (var i = 0, x = imageArray[id_2].length; i < x; i++) {
            if (imageArray[id_2][i].favoriet === true) {
                numOfFavorites++;
            }
        }
    } else {
        for (var i = 0, x = imageArray[id_1].length; i < x; i++) {
            if (imageArray[id_1][i].favoriet === true) {
                numOfFavorites++;
            }
        }
    }
    
    $scope.updateFavoriet = function(media){
        
        if (media.favoriet == false){
            if (numOfFavorites < 3) {
                media.favoriet = true;
                numOfFavorites++;
            } else {
                alert("Maximaal 3 favoriete foto's!");
            }
        } else {
            media.favoriet = false;
            numOfFavorites--;
        }
        //console.log("image.favoriet :", media.favoriet )
        DataManager.save();
        //DbTable.updateImageFavoriet(media.opdrachtID, media.datuminput, !media.favoriet) 
        //ArrayTransport.updateImageFavoriet(media, !media.favoriet);
    }

    $scope.removeImageCoverTag = function(array, index){        
        for (i =0; i< array.length; i++){
            if (i != index){                
                media_cover = array[i];
                media_cover.cover = false;                
            }
        }
    }


 $scope.goToBewijsstukNieuw = function() {        

        FileService.pickFile(function(data){

            var images = DataManager.taskImages(task.opdrachtID);            
            var media = {
                contentid  : data,
                datuminput : DatumPicker.getdate(),
                opdrachtID : task.opdrachtID,
                favoriet : $scope.imageFavorietStatus,
                cover: $scope.imageCoverStatus
            };

            images.push(media);
            DataManager.save();
            //console.log("images details are : " + JSON.stringify(images));  
            ArrayTransport.insertNieuwInbewijsstukkenPerOpdrachtArray(media);

            $scope.$apply(function(){
                $scope.imagesArray = images;
            });

           
        });
        
    }; 

});