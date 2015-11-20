myApp.service('serverConfigService', function () {

    var SERVER_TYPE_LOCAL = 1;
    var SERVER_TYPE_TEST = 2;
    var SERVER_TYPE_SBX = 3;
    var SERVER_TYPE_PROD = 4;

    var MODE = SERVER_TYPE_LOCAL;

    var SALESWS_LOCAL = 'http://localhost:8080/SalesWs/rest';
    var SALESWS_TEST = 'http://dcoeng1-ncoptst-2:8080/SalesWs/rest';
    var SALESWS_SBX = 'http://dcoeng1-ncopsbx-2:8080/SalesWs/rest';
    var SALESWS_PROD = 'http://ncop.virtela.net:8080/SalesWs/rest';

    this.getSalesWsBasePath = function () {
        switch (MODE) {
        case SERVER_TYPE_LOCAL:
            return SALESWS_LOCAL;
        case SERVER_TYPE_TEST:
            return SALESWS_TEST;
        case SALESWS_SBX:
            return SALESWS_SBX;
        }
        return SALESWS_PROD;
    }
    
    var ACCOUNT_LOCAL = 'http://localhost:8080/VirtelaAccountWS/rest';
    var ACCOUNT_TEST = 'http://dcoeng1-ncoptst-2:8080/VirtelaAccountWS/rest';
    var ACCOUNT_SBX = 'http://dcoeng1-ncopsbx-2:8080/VirtelaAccountWS/rest';
    var ACCOUNT_PROD = 'http://ncop.virtela.net:8080/VirtelaAccountWS/rest';
    
     this.getAccountWsBasePath = function () {
        switch (MODE) {
        case SERVER_TYPE_LOCAL:
            return ACCOUNT_LOCAL;
        case SERVER_TYPE_TEST:
            return ACCOUNT_TEST;
        case SALESWS_SBX:
            return ACCOUNT_SBX;
        }
        return ACCOUNT_PROD;
    }

});