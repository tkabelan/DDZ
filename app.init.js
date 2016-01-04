var _appModule = angular.module('starter', [
    'ionic', 
    'starter.controllers', 
    'starter.services',
    'ngCordova',
    
]);

var _controllersModule = angular.module('starter.controllers', [
    'ionic', 
    'starter.services', 
    'ngCordova', 
    'ngStorage',
    'ngRoute'
]);

var _servicesModule = angular.module('starter.services', [
    'ionic',
    'ngCordova'
]);