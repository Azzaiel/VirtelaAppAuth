myApp.factory('accountFactory', function ($http, serverConfigService) {

    var WS_METHOD_GET_APPLICATIONS = '/account/v1.0/applications';
    var WS_METHOD_GET_ROLE_BY_APP_ID = '/account/v1.0/roles/search/find_by_application_name';
    var WS_METHOD_GET_PERMISSION_BY_APP_ROLE = '/account/v1.0/permissions/search/find_by_app_role/';

    var factory = null;

    $http.defaults.headers.common['Security-Token'] = 'N0C0P-@PP-T0k3N';

    factory = {

        getApplications: function () {
            var promise = $http({
                url: serverConfigService.getAccountWsBasePath() + WS_METHOD_GET_APPLICATIONS,
                method: 'GET'
            });
            return promise;
        },
        getAppRoles: function (appName) {
            var promise = $http({
                url: serverConfigService.getAccountWsBasePath() + WS_METHOD_GET_ROLE_BY_APP_ID,
                method: 'GET',
                params: {
                    'application_name': appName
                }
            });
            return promise;
        },
        getAppRolePermission: function (appId, roleId) {
            var promise = $http({
                url: serverConfigService.getAccountWsBasePath() + WS_METHOD_GET_PERMISSION_BY_APP_ROLE + appId,
                method: 'GET',
                params: {
                    'role_id': roleId
                }
            });
            return promise;
        }
    }

    return factory;

});