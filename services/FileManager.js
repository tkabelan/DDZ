'use strict';

/**
 * @ngdoc factory
 * @author unknown, last edited: G.P Bosch
 * @name starter.services:FileService
 * @description Service accessing and 
 *  storing images in filesystem        */

(function() {
    angular.module('starter.services')
    // Stores images in filesystem under ddz
    .factory('FileService', function($rootScope, $q, $cordovaCamera, $cordovaFile, $stateParams) {

        var task_name;
        var global_taskImageArray = [];

        var fail = function(error) {
            console.log("Error: " + error.code);
        };    

        var makeid = function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i=0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        var mediaScanner = function(){

            console.log("you are in mediaScanner function");
                    
            window.MediaScannerPlugin.scanFile(
                function(msg){
                    console.log(msg);
                },
                function(err){
                    console.log(err);
                }
            );
        };

        // path is hard coded, should read the path using the getPicture function 
        var createDirectory = function(){
            window.resolveLocalFileSystemURI("file:///storage/emulated/0/DCIM/Camera", onSuccess, onError); 
            

            function onSuccess(entry) { 
                entry.getDirectory("ddz", {create: true, exclusive: false}, success, fail); 
            }
            function onError(error){
                console.log(error);
            }
            function success(success) {
              //console.log(error.code);
            }
            function fail(error) {
              console.log(error.code);
            }
        };

        var getTaskName = function(){
                
                return task_name;
        };

        // getDetails function called inide the imagesPerTask.    
        var getDetails = function(array){               
                    global_taskImageArray = array.concat();                         
        };


       // images per task function reads images from a particular tasks
       // usefull function to sync with cloud
        var imagesPerTask = function(){                 

            window.resolveLocalFileSystemURL("file:///storage/emulated/0/DCIM/Camera", onSuccess, onError); 
                            
            function onSuccess(entry){
                var taskImageArray = [];
                
                entry.getDirectory("ddz", {create: true, exclusive: false}, function(dirEntry){
                    var dirReader = dirEntry.createReader();
                        dirReader.readEntries(function(entries) {
                            for(var i = 0; i < entries.length; i++) {                                
                              var entry = entries[i];
                              if (entry.isDirectory){                                
                                console.log('Directory : '+ entry.fullPath);
                              }
                              else if (entry.isFile){
                                if (entry.fullPath.indexOf(getTaskName()) > -1){                                    
                                    var str1 = "file:///storage/emulated/0/" + entry.fullPath;
                                    taskImageArray.push(str1);                                   
                                }            
                              }
                            }

                            getDetails(taskImageArray);                                                      

                          }, onError);
                    
                        }, onError);                                                     
            }

            function onError(error){                
                console.log(error);
            }         
        };



        var saveOnDisk = function(file, success) {            
                var copyFile = function(fileEntry) {

                    var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);                

                    var newName = getTaskName() + name;                           

                    var pathOfDir = cordova.file.externalRootDirectory + 'DCIM/Camera/ddz'; 

                    window.resolveLocalFileSystemURL(pathOfDir, function(fileSystemParam) {
                        fileEntry.copyTo(fileSystemParam, newName, success, fail);
                        
                    }, fail);
                    
                }           
                window.resolveLocalFileSystemURL(file, copyFile, fail);          
        };

        var saveFileOnDisk = function(file){
            saveOnDisk(file, function(entry){
                return entry.nativeURL;
            });
        };        

        var setTaskName = function(taskName){
            task_name = taskName;            
        };       

        var getTaskImagesArray = function(){
            imagesPerTask();           
        };

        var readImages = function(){            
            return global_taskImageArray;
        };
                 

        var pickFile = function(success) {           

            if(window.cordova) /* mobile platform */ {

                var options = {
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                    allowEdit : false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                };
                    
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    createDirectory();                                       
                                        
                    saveOnDisk(imageData, function(entry){
                        var filepath = entry.nativeURL;                        
                        success(filepath);                             
                    });
                    //mediaScanner();                                                                                        
                });                      
               
            } else /* other platforms */ {

                var inputElementId = '_app-html5-file-picker';
                var inputElement = document.getElementById(inputElementId);

                if(!inputElement) {
                    var containerElement = document.createElement('div');
                    inputElement = document.createElement('input');
                    inputElement.id = inputElementId;
                    inputElement.type = 'file';
                    containerElement.class = 'file-upload';
                    containerElement.appendChild(inputElement);
                    document.body.appendChild(containerElement);
                }

                inputElement.click();
                inputElement.onchange = function (event) {

                    var file = event.target.files[0];
                    var reader = new FileReader();

                    reader.onload = function(event) {
                        var data = event.target.result;
                        success(data);
                        return data; // base64 encoded file
                    };

                    // Convert Blob into DataURL string
                    reader.readAsDataURL(file);
                } 
            }
           
        };
          
        return { 
            fail: fail,
            makeid: makeid,
            mediaScanner: mediaScanner,
            createDirectory: createDirectory,
            getTaskName: getTaskName,
            getDetails: getDetails,
            imagesPerTask: imagesPerTask,
            saveOnDisk: saveOnDisk,
            saveFileOnDisk: saveFileOnDisk,
            setTaskName: setTaskName,
            getTaskImagesArray: getTaskImagesArray,
            readImages: readImages,
            pickFile: pickFile
        }
    });
})();