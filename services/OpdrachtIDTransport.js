/**
 * This service provides a way to retrieve opdrachtIDs in each controller.
 * You set opdractID when it is made (with opdrachtNaam).
 * You get opdrachtID on almost every with opdracht related page, so that you can save this.
 * You delete opdrachtID at the moment that you return to the opdrachtenlijst and there is no more clear opdrachtID.
 */
_servicesModule.service('OpdrachtIDTransport', function() {   
    var opdrachtID;

    return {
        getopdrachtID: function() { 
            //alert('opdracht ID = ' + opdrachtID);
            return opdrachtID;
        },
        setopdrachtID: function(value) { 
            opdrachtID = value;
        },
        deleteopdrachtID: function() { 
            opdrachtID = null;
        }
    };
});