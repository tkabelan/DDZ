/**
   * DbTable is currently the most important factory, with which we retrieve and write the data to the DB. Because it consists of so many different parts,
   * a distinction is made between retrieving, writing, updating, and deleting.
   * Furthermore, in order to keep the oversight, we have chosen to give the functions as return value all the way below. Due to this, it may seem that there
   * are double words, although actually it says outsideworldname:internalname (how can the outside world find this function within the factory: how am I called within the factory).
   */
_servicesModule.factory('DbTable', function($q) {
    // var DB = new WindowsAzure.MobileServiceClient(
    //     //"/ddbb/azure",
    //     "azure", // check ionic.project file. azure -> proxy -> https://..
    //     "GnSlmfkgTImqpvMAaUeprIkKaawhHh76");
//
//     var DB = new WindowsAzure.MobileServiceClient(
//        "https://startapplicatie.azure-mobile.net",
//        "GnSlmfkgTImqpvMAaUeprIkKaawhHh76");


    // var DB = new WindowsAzure.MobileServiceClient(
    //     "https://testapplication.azure-mobile.net/", 
    //     "jodeLaCxGZqaiMuIfyaOgwHZUQTlIy21");
    /**
     * Retrieve tables
     */
    var getOrderedTable = function() {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('id','opdrachtnaam','datuminput', 'opdrachtID', 'voortgangWaarde', 'favoriet').orderByDescending('__updatedAt').read());
        return deferred.promise;
    };

    var getOrderedTableBy = function(orderOption, direction){
         var deferred = $q.defer();
        if(direction === 1){
            deferred.resolve(DB.getTable("Opdrachten").select('id','opdrachtnaam','datuminput', 'opdrachtID', 'voortgangWaarde', 'favoriet').orderByDescending(orderOption).read());
        }
        else{
            deferred.resolve(DB.getTable("Opdrachten").select('id','opdrachtnaam','datuminput', 'opdrachtID', 'voortgangWaarde', 'favoriet').orderBy(orderOption).read());
        }

        return deferred.promise;
    };

    var getOrderedTableWith = function(wherestatement){
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('id','opdrachtnaam','datuminput', 'opdrachtID', 'voortgangWaarde', 'favoriet').orderByDescending('__updatedAt').where(wherestatement).read());
        return deferred.promise;
    }

    var getopdrachtCompetentieTable = function(opdrachtID) { 
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("opdrachtCompetentie").select('CompID', 'opdrachtID', 'inhoud').where({opdrachtID: opdrachtID}).read());
        return deferred.promise;
    };

    var getOnOpdrachtID = function(opdrachtID) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Images").select('contentid','datuminput', 'opdrachtID', 'cover', 'favoriet').where({'opdrachtID': opdrachtID}).orderByDescending('cover','favoriet', '__createdAt').read());
        return deferred.promise;
    };
    
    var getOpdrachtReflectieTable = function(opdrachtID) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("opdrachtReflectie").select('opdrachtID', 'AntwoordVraag', 'vraagID').where({'opdrachtID': opdrachtID}).orderByDescending('vraagID').read());
        return deferred.promise;
    };

    var getBeschrijvingTable = function(opdrachtID) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("opdrachtBeschrijving").select('opdrachtID', 'inhoud').where({opdrachtID: opdrachtID}).orderByDescending('__updatedAt').read());
        return deferred.promise;
    };

    var getCompetenties = function() {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Competenties").select('CompNaam', 'CompID', 'value').read());
        return deferred.promise;
    };
    
    var getGebruikerBijEmail = function(email) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Gebruikers").select('naam', 'achternaam', 'wachtwoord', 'salt').where({email: email}).read());
        return deferred.promise;
    };
    
    var getGebruikerBijToken = function(token) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Gebruikers").select('naam', 'achternaam', 'wachtwoord', 'salt').read());
        return deferred.promise;
    };

    var getDB = function() {
        return DB;
    };

    var getReflectieVragen = function(){
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("reflectieVragen").select('vraagID', 'Vraag').orderBy('vraagID').read());
        return deferred.promise; 
    };

    /**
     * New input for tables
     */
    var saveOpdracht = function(media) {
        DB.getTable("opdrachten").insert(media);
    };

    var saveBewijsstuk = function(media) {
        DB.getTable("Images").insert({
            'contentid': media.contentid, 
            'datuminput': media.datuminput, 
            'opdrachtID': media.opdrachtID
        });
    };

    var saveOpdrachtCompetentie = function(compID, opdrachtID, inhoud) {
        DB.getTable("opdrachtCompetentie").insert({
            'CompID':compID, 
            'OpdrachtID': opdrachtID, 
            'inhoud':inhoud
        });
    };

    var saveOpdrachtReflectie = function(opdrachtID, vraagID, AntwoordVraag) {
        DB.getTable("opdrachtReflectie").insert({
            'opdrachtID': opdrachtID, 
            'vraagID': vraagID,
            'AntwoordVraag': AntwoordVraag
        });
    };
    
    var registreerGebruiker = function(naam, achterNaam, email, wachtwoord, rol) {
        DB.getTable("Gebruikers").insert({
            'naam': naam,
            'achternaam': achterNaam,
            'email': email, 
            'wachtwoord': wachtwoord,
            'rol': rol
        });
    };
    
    /**
     * Update tables
     */
    var updateOpdrachtStatus = function(opdrachtID, plusWaarde) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('ID', 'opdrachtID', 'voortgangWaarde').where({opdrachtID: opdrachtID}).read());
        deferred.promise.then(function(table) {
            huidigeTable = table;
            DB.getTable("opdrachten").update({
                id: table[0].ID,
                voortgangWaarde: (table[0].voortgangWaarde + plusWaarde)
            });
        });
    };

    var updateOpdrachtFavoriet = function(opdrachtID, value) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('ID', 'opdrachtID', 'favoriet').where({opdrachtID: opdrachtID}).read());
        deferred.promise.then(function(table) {
            huidigeTable = table;

            DB.getTable("opdrachten").update({
                id: table[0].ID,
                favoriet: value
            });
        });
    };

    var updateOpdrachtNaam = function(opdrachtID, opdrachtNaam) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('ID', 'opdrachtID', 'opdrachtnaam').where({opdrachtID: opdrachtID}).read());
        deferred.promise.then(function(table) {
            huidigeTable = table;
            DB.getTable("opdrachten").update({
                id: table[0].ID,
                opdrachtnaam: opdrachtNaam
            });
        });
    };

     var updateOpdrachtReflectie = function(opdrachtID, vraagID, invoer) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("opdrachtReflectie").select('ID', 'opdrachtID', 'vraagID').where({'opdrachtID': opdrachtID, 'vraagID': vraagID}).read());
        deferred.promise.then(function(table) {
            huidigeTable = table;
            DB.getTable("opdrachtReflectie").update({
                id: table[0].ID,
                AntwoordVraag: invoer
            });
        });
    };

    var updateImageCover= function(opdrachtID, datuminput, CoverWaarde) {
        if(CoverWaarde){
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Images").select('ID', 'opdrachtID', 'datuminput').where({'opdrachtID': opdrachtID}).read());
        deferred.promise.then(function(table) {

            huidigeTable = table;
            for (var index = 0; index < table.length;index++){
                DB.getTable("Images").update({
                    id: table[index].ID,
                    cover: false
                });
            }
        });
        }

        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Images").select('ID', 'opdrachtID').where({'opdrachtID': opdrachtID, 'datuminput':datuminput}).read());
        deferred.promise.then(function(table) {

            huidigeTable = table;
            DB.getTable("Images").update({
                id: table[0].ID,
                cover: CoverWaarde
            });
        });
   


    };

    var updateImageFavoriet= function(opdrachtID, datuminput, FavorietWaarde) {

        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Images").select('ID', 'opdrachtID', 'favoriet').where({'opdrachtID': opdrachtID, 'datuminput':datuminput}).read());
        deferred.promise.then(function(table) {

            huidigeTable = table;
            DB.getTable("Images").update({
                id: table[0].ID,
                favoriet: FavorietWaarde
            });
        });

    };

    
    var saveToken = function(token, email) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Gebruikers").select('token').where({email: email}).read());
        deferred.promise.then(function(table) {
            huidigeTable = table;
            DB.getTable("gebruikers").update({
//                Commented out this id for hardcode inlog purposes
//                id: table[0].ID,
                id: true,
                token: token
            });
        });
    };

    /**
     * Delete tables
     */
    var deleteOpdrachtTable = function(opdrachtID) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Opdrachten").select('ID', 'opdrachtID').where({opdrachtID: opdrachtID}).read());
        deferred.promise.then(function(table) { 
            DB.getTable("opdrachten").del({
                id: table[0].ID
            });
        });
    };

    var deleteHuidigeCompetenties = function(opdrachtID) {
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("opdrachtCompetentie").select('ID', 'opdrachtID').where({opdrachtID: opdrachtID}).read());
        deferred.promise.then(function(table) {

            for(var indexI = 0 ; indexI < table.length; indexI++) {
                DB.getTable("opdrachtCompetentie").del({
                    id: table[0].ID
                });                
            }
        });
    };

    var deleteCurrentMedia = function(opdrachtID, datuminput) { // add _createdAt - do not seem to be able to get it working with __createdAt
        var deferred = $q.defer();
        deferred.resolve(DB.getTable("Images").select('ID', 'opdrachtID', 'datuminput').where({'opdrachtID': opdrachtID, 'datuminput': datuminput}).read());
        deferred.promise.then(function(table) {
            DB.getTable("Images").del({
                id: table[0].ID
            });
        });
    };

    /**
     * Return values
     */
    return {
        getDB: getDB,

        // READ
        getOrderedTable: getOrderedTable,
        getOrderedTableBy:getOrderedTableBy,
        getOrderedTableWith:getOrderedTableWith,
        getOpdrachtCompetentieTable: getopdrachtCompetentieTable,
        getBeschrijvingTable: getBeschrijvingTable,
        getOpdrachtReflectieTable: getOpdrachtReflectieTable,
        getReflectieVragen:getReflectieVragen,
        getCompetenties: getCompetenties,
        getOnName: getOnOpdrachtID,
        getGebruikerBijEmail: getGebruikerBijEmail,
        getGebruikerBijToken: getGebruikerBijToken,

        // CREATE
        saveOpdracht: saveOpdracht,
        saveCurrentMedia: saveBewijsstuk,
        saveOpdrachtCompetentie: saveOpdrachtCompetentie,
        saveOpdrachtReflectie: saveOpdrachtReflectie,
        registreerGebruiker: registreerGebruiker,
        saveToken: saveToken,
        
        // UPDATE
        updateOpdrachtStatus: updateOpdrachtStatus,
        updateOpdrachtNaam:updateOpdrachtNaam,
        updateOpdrachtReflectie:updateOpdrachtReflectie,
        updateOpdrachtFavoriet:updateOpdrachtFavoriet,
        updateImageCover: updateImageCover,
        updateImageFavoriet: updateImageFavoriet,

        // DELETE
        deleteOpdrachtTable: deleteOpdrachtTable,
        deleteHuidigeCompetenties: deleteHuidigeCompetenties,
        deleteCurrentMedia: deleteCurrentMedia,
    };
})

.factory('taskCtrl', function(ArrayTransport, DataManager) {
    var description_str = "";
    var selfRef_str = {};
    var competence ={};

  return {    
    getKey: function(opdrachtID){
        return DataManager.opdracht(opdrachtID).opdrachtnaam;
    },

    getName: function(opdrachtID) {
        
        return DataManager.opdracht(opdrachtID).opdrachtnaam;
         
    },

    setDescription:function(description) {        

        if (description === undefined || description === null){
            description_str = "";
        } 
        else{
            description_str = description;
        }
        //return description_str;
    },

    getDescription: function(){
        return description_str;
    },

    setSelfReflection:function(description){
        var str1;

        if (description === undefined || description === null || description === ""){
            selfRef_str = {};
        } 
        else{
            selfRef_str = description;
        }        
    },

    getSelfReflection: function(){
        return selfRef_str;
    },

    setCompetencies:function(description){
        var str1;

        if (description === undefined || description === null || description === ""){
            competence = {};
        } 
        else{
            competence = description;
        }        
    },

    getCompetencies: function(){
        return competence;
    },
   
  }
});
