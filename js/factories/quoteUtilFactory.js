myApp.factory('quoteUtilFactory', function ($http, serverConfigService) {

    var WS_METHOD_PROJECT_FILE_SEARCH = '/ncop_quote_util/v1.0/document/project_file/search';
    var WS_METHOD_DOWNLOAD_FILE = '/ncop_quote_util/v1.0/document/download/project_file/';

    var baseAppFactory = null

    $http.defaults.headers.common['Security-Token'] = 'N0C0P-@PP-T0k3N';

    quoteUtilFactory = {

        searchProjectFile: function (param) {
            var promise = $http({
                url: serverConfigService.getSalesWsBasePath() + WS_METHOD_PROJECT_FILE_SEARCH,
                method: 'POST',
                data: param
            });
            return promise;
        },
        donloadFile: function (fileId) {
            var promise = $http({
                url: serverConfigService.getSalesWsBasePath() + WS_METHOD_DOWNLOAD_FILE + fileId + '?mode=1',
                method: 'GET',
                responseType: 'arraybuffer'
            });
            return promise;
        }
    }
    return quoteUtilFactory;
});