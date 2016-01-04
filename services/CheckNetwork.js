'use strict';

/**
 * @ngdoc factory
 * @author fill in, last edited: G.P Bosch
 * @name starter.services:CheckNetwork
 * @description Factory checking network connection
 */

 (function() {
 	angular.module('starter.services')
	// Service responsible for tracking status of values set in the app
	.factory('CheckNetwork', function($cordovaNetwork){

		var checkConnection =  function() {

			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';

			var networkConnection = states[networkState];
			alert(networkConnection);
			return networkConnection;
		};

		connectionOnline = function() {
			var connection = false;
			return connection = (navigator.connection.type === "none") ? false : true;
		};

		// From global : local
		return {
			checkConnection : checkConnection,
			connectionOnline : connectionOnline,			
		};
			
	});
})();