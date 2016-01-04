'use strict';

/**
 * @ngdoc service
 * @author unknown, last edited: G.P Bosch
 * @name starter.services:ArrayTransport
 * @description Service for tracking status of values
 */

 (function() {
    angular.module('starter.services')
    // Service responsible for tracking status of values set in the app
    .service('ArrayTransport', function() {        
        var opdrachtArray;
        var bewijsstukkenPerOpdrachtArray;
        var imageIndex;
        
        // Checks if there is a description
        var descriptionExists = function(taskObject) {
            var descriptionFilledIn;
            return descriptionFilledIn = (!taskObject.description) ? false : true;
        };

        // Checks if competence exists
        var competenceExists = function(taskObject) {
            var competenceFilledIn = false;
            if(!taskObject.competenties) {
                competenceFilledIn = false;
            } else {
                for (var i = 0, x = taskObject.competenties.length; i < x; i++) {
                    if (taskObject.competenties[i].selected === true) {
                        competenceFilledIn = true;
                        break;      
                    }
                }
            }
            return competenceFilledIn;       
        };

        var selfreflectionExists = function(taskObject) {
            var counter = 0;
            var selfreflectionFilledIn = false;
            
            if (!taskObject.selfreflecties) {
                selfreflectionFilledIn = false;
            } else {
                for (var i = 0, x = taskObject.selfreflecties.length; i < x; i++) {
                    if (taskObject.selfreflecties[i].answer) {
                        counter++;  
                    }
                }

                if (counter === taskObject.selfreflecties.length) {
                    selfreflectionFilledIn = true;
                } else {
                    selfreflectionFilledIn = false;
                }    
            }

            return selfreflectionFilledIn;
        };

        var getOpdrachtArray = function() {
            return opdrachtArray;
        };

        var setOpdrachtArray = function(values) {
            opdrachtArray = values;

            for( var i = 0, x = values.length; i < x; i++){
                if (values[i].contentid === undefined){
                    opdrachtArray[i].contentid ="img/placeholder.png";
                }
            }
        };

        var insertNieuwInOpdrachtArray = function(value) {
            if(opdrachtArray === null || opdrachtArray === undefined) {
                opdrachtArray = [];
                opdrachtArray.push(value);
            }
            else {
                opdrachtArray.splice(0,0,value);
            }
        };
            
        var changeValueProgressbar = function(opdrachtID, progress) { 
            var index = 0;

            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                    index = i;
                }
            }
            opdrachtArray[index].voortgangWaarde = opdrachtArray[index].voortgangWaarde + progress;
        };
            
        var setEersteFoto = function(contentid, opdrachtID) { 
            var index = 0;

            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                    index = i;
                }
            }
            opdrachtArray[index].contentid = contentid;
        };

        var changeName = function(opdrachtID, name) { 
            var index = 0;
            
            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                    index = i;
                }
            }
            opdrachtArray[index].opdrachtnaam = name;
        };

        var deleteOpdrachtArray = function(opdrachtID){
            var index = 0;

            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                  index = i;
                }
            }
            opdrachtArray.splice(index, 1);
        };

        var getOpdrachtNaam = function(opdrachtID){
            
            var index;
            
            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                  index = i;
                }
            }
            return opdrachtArray[index].opdrachtnaam;
        };

        var getFavorieteStatus = function(opdrachtID){
            var index;
            
            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                if (opdrachtArray[i].opdrachtID === opdrachtID) {
                  index = i;
                }
            }
            return opdrachtArray[index].favoriet;
        };

        var setFavorieteStatus = function(opdrachtID, value){
            var index;
            
            for (var i = 0, x = opdrachtArray.length; i < x; i++) {
                  index = i;
            }
            opdrachtArray[index].favoriet = value;
        };

        var insertNieuwInbewijsstukkenPerOpdrachtArray = function(media) {
            
            if(bewijsstukkenPerOpdrachtArray === null || bewijsstukkenPerOpdrachtArray === undefined) {
                bewijsstukkenPerOpdrachtArray = [];
                bewijsstukkenPerOpdrachtArray.push(media);                
            }
            else {
                bewijsstukkenPerOpdrachtArray.push(media);                
            }
        };

        var setCoverImageIndex = function(index){
            imageIndex = index; 
        };

        var getCoverImageIndex = function(){
            return imageIndex;
        };
      
        var setProgressValue = function(num){
            progress_value = num;
        };

        var getProgressValue = function(){
            return progress_value;
        };
            
        var deletebewijsstukkenPerOpdrachtArray = function() {
            bewijsstukkenPerOpdrachtArray = null;
        };
            
        var deletebewijsstukPerOpdrachtArray = function(media) {
            
        
            position = bewijsstukkenPerOpdrachtArray.indexOf(media);
            if (~position) {
                bewijsstukkenPerOpdrachtArray.splice(position, 1);
            }
        
        };
            
        var updateImageCover = function(media, nieuweWaarde){

            index = bewijsstukkenPerOpdrachtArray.indexOf(media);

            for(var i = 0, x = bewijsstukkenPerOpdrachtArray.length; i < x; i++){
                if(bewijsstukkenPerOpdrachtArray[i].cover === true){
                     bewijsstukkenPerOpdrachtArray[i].cover = false;
                }
           
            }

            bewijsstukkenPerOpdrachtArray[index].cover = nieuweWaarde;
            tmp = bewijsstukkenPerOpdrachtArray[index]
            bewijsstukkenPerOpdrachtArray.splice(index,1);
            bewijsstukkenPerOpdrachtArray.splice(0,0,tmp);
        };

        var updateImageFavoriet = function(media, nieuweWaarde){
            index = bewijsstukkenPerOpdrachtArray.indexOf(media);
            bewijsstukkenPerOpdrachtArray[index].favoriet = nieuweWaarde;
            tmp = bewijsstukkenPerOpdrachtArray[index]
            bewijsstukkenPerOpdrachtArray.splice(index,1);

            if(bewijsstukkenPerOpdrachtArray[0].cover ===true){
                bewijsstukkenPerOpdrachtArray.splice(1,0,tmp);
            }
            else{
               bewijsstukkenPerOpdrachtArray.splice(0,0,tmp); 
            }

        };
        
        // From global : local
        return {
            /** Functions for tasks *
            **  ---------------------------*/

            // @TODO: Check why not used
            changeName: changeName,
            getOpdrachtNaam: getOpdrachtNaam,

            // @TODO: Check what these functions do
            getOpdrachtArray: getOpdrachtArray,
            setOpdrachtArray: setOpdrachtArray,
            deleteOpdrachtArray: deleteOpdrachtArray,
            insertNieuwInOpdrachtArray: insertNieuwInOpdrachtArray,
            insertNieuwInbewijsstukkenPerOpdrachtArray: insertNieuwInbewijsstukkenPerOpdrachtArray,

            // Tracks if all fields are filled in
            descriptionExists: descriptionExists,
            competenceExists: competenceExists,
            selfreflectionExists: selfreflectionExists,       

            // Keeps track of the task favorite status 
            getFavorieteStatus: getFavorieteStatus,
            setFavorieteStatus: setFavorieteStatus,          

            // Sets progressvalue within the app
            setProgressValue: setProgressValue,
            getProgressValue: getProgressValue,
            changeValueProgressbar: changeValueProgressbar,
            
            /** Functions for the Pictures *
            **  ---------------------------*/
            setEersteFoto: setEersteFoto,
            // Deletes Pictures from the application
            deletebewijsstukkenPerOpdrachtArray: deletebewijsstukkenPerOpdrachtArray,
            deletebewijsstukPerOpdrachtArray: deletebewijsstukPerOpdrachtArray,
            // Sets favorite images and cover image
            updateImageCover: updateImageCover,
            updateImageFavoriet: updateImageFavoriet,
            // @TODO: Check which are the right function
            setCoverImageIndex: setCoverImageIndex,
            getCoverImageIndex: getCoverImageIndex,
        };
    });
})();