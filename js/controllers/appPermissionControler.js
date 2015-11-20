myApp.controller('appPermissionControler', function ($scope, $filter, $route, accountFactory, notificationService, commonService) {
    $scope.route = $route;

    $scope.appRoleGridPromise = null;

    $scope.appRoleGridOptions = {
        enableSorting: true,
        enableRowSelection: true,
        multiSelect: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            {
                field: 'name',
                displayName: 'Role',
                cellEditableCondition: function ($scope) {
                    return $scope.row.entity.name != 'Host';
                },
                width: 150
            },
            {
                field: 'description',
                displayName: 'Description',
            },

            {
                field: 'lastModby',
                displayName: 'Last Modified By',
                enableCellEdit: false,
                width: 150
            },
            {
                field: 'lastModDate',
                displayName: 'Last Modified Date',
                enableCellEdit: false,
                cellFilter: 'date:\'MMM-dd-yyyy\'',
                width: 150
            }
            ]
    };

    $scope.applicationLov = [];

    this.onload = function () {
        var promise = accountFactory.getApplications();
        promise.then(function (data) {
            if (data.data) {
                $scope.applicationLov = data.data;
            }
        }, function (err) {
            $scope.applicationLov = [];
        })
    };


    this.onload();


    $scope.appRoleGridOptions.data = []
    $scope.appRoleGridPromise = null;

    $scope.loadApplicationRoles = function () {
        if ($scope.filter && $scope.filter.vapplication) {
            $scope.appRoleGridOptions.data = [];
            $scope.appRoleGridPromise = accountFactory.getAppRoles($scope.filter.vapplication.name);
            $scope.appRoleGridPromise.then(function (data) {
                if (data.data) {
                    $scope.appRoleGridOptions.data = data.data;
                    $scope.gridApi.grid.modifyRows($scope.appRoleGridOptions.data);
                    $scope.gridApi.selection.selectRow($scope.appRoleGridOptions.data[0]);
                }
            }, function (err) {
                notificationService.displayGetError(err);
            })
        } else {
            alert("Please select an Application!!");
        }
    }

    $scope.appPermissionPromise = null;
    $scope.rolePermissionPromise = null;

    $scope.populatePermissionList = function () {
        $scope.rolePermissionLov = [];
        $scope.appPermissionLov = [];
        $scope.appOpt = null;
        $scope.roleOpt = null;

        roleSelected = $scope.gridApi.selection.getSelectedRows();
        roleSelected = roleSelected[0];
        if (roleSelected) {

            $scope.appPermissionPromise = accountFactory.getAppRolePermission($scope.filter.vapplication.id, 0);
            $scope.appPermissionPromise.then(function (appPermission) {
                if (appPermission.data) {
                    $scope.appPermissionLov = commonService.removeFormArray(appPermission.data, $scope.rolePermissionLov);
                }
            });

            $scope.rolePermissionPromise = accountFactory.getAppRolePermission($scope.filter.vapplication.id, roleSelected.id);
            $scope.rolePermissionPromise.then(function (rolePermissions) {
                if (rolePermissions.data) {
                    $scope.rolePermissionLov = rolePermissions.data;

                }
            });

        }

    }

    $scope.selectedRole = null;

    $scope.appRoleGridOptions.onRegisterApi = function (gridApi) {

        $scope.gridApi = gridApi;

        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {

            if ($scope.selectedRole == null) {
                $scope.selectedRole = row.entity;
                $scope.populatePermissionList();
            } else if ($scope.selectedRole.id != row.entity.id) {
                $scope.selectedRole = row.entity;
                $scope.populatePermissionList();
            }

        });

        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
            if (newValue != oldValue) {
                if (colDef.field == "name" && !newValue) {
                    rowEntity.name = oldValue;
                } else {
                    //                    Send to WS
                }
            }

        });
    };

    $scope.movePermissionToRole = function () {
        if ($scope.appOpt && $scope.appOpt.permission[0]) {
            $scope.rolePermissionLov.push($scope.appOpt.permission[0]);
            var removeList = [];
            removeList.push($scope.appOpt.permission[0]);
            $scope.appPermissionLov = commonService.removeFormArray($scope.appPermissionLov, removeList);
        }
    }

    $scope.movePermissionToApp = function () {
        if ($scope.roleOpt && $scope.roleOpt.permission[0]) {
            $scope.appPermissionLov.push($scope.roleOpt.permission[0]);
            var removeList = [];
            removeList.push($scope.roleOpt.permission[0]);
            $scope.rolePermissionLov = commonService.removeFormArray($scope.rolePermissionLov, removeList);
        }
    }

    $scope.resetRoloPermission = function () {

    }

});