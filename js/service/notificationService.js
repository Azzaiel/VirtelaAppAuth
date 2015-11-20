myApp.service('notificationService', function () {

    var HTTP_CODE_NOT_FOUND = 404;
    var HTTP_CODE_UNAUTHORIZED = 401;
    var HTTP_CODE_EXPECTATION_FAILED = 407;

    this.displayGetError = function (err) {
        switch (err.data.code) {
        case HTTP_CODE_UNAUTHORIZED:
            alert('You do not have Access to retrive the Data');;
            break;
        case HTTP_CODE_NOT_FOUND:
            alert('No Record Found!');;
            break;
        case HTTP_CODE_EXPECTATION_FAILED:
            alert('Data is corrupted or damaged, please contact your Administrator!');;
            break;
        default:
            alert('Internal error please contact your Administrator');
        }

    }

});