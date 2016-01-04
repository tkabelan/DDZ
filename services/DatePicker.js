'use strict';

/**
 * @ngdoc factory
 * @author unknown, last edited: G.P Bosch
 * @name starter.services:DatumPicker
 * @description Service for returning current time
 */

 (function() {
    angular.module('starter.services')
    // This factory returns time object
    .factory('DatumPicker', function() {
        var options = {
            date: new Date(),
            mode: 'date'
        };

        var getdate = function() {
            // Simple index lookup
            return options.date;
        };
        
        // From global : local
        return {
            getdate: getdate,
        };
    });
})();