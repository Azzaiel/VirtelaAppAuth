myApp.controller('projectFilesControler', function ($scope, $route, quoteUtilFactory, notificationService) {
    
    $scope.route = $route;
  
    $scope.gridDataPromise = null;

    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: [

            {
                field: 'ncopProjectId',
                displayName: '',
                cellTemplate: "<div ng-init=\"imgsrc='img/24px/download1.png'\" ng-mouseover=\"imgsrc='img/24px/download2.png'\" ng-mouseout=\"imgsrc='img/24px/download1.png'\" > <img ng-src='{{imgsrc}}' title = 'Download File' ng-click=\"grid.appScope.downloadFile(row.entity)\" /> </div>",
                enableSorting: false,
                cellTooltip: 'Download File',
                width: 30
            },

            {
                field: 'ncopProjectId',
                displayName: 'NCOP Project ID',
                width: 150
            },
            {
                field: 'salesProjectId',
                displayName: 'SP Project ID',
                width: 150
            },
            {
                field: 'crmId',
                displayName: 'CRM ID',
                width: 150
            },
            {
                field: 'customerName',
                displayName: 'Customer Name',
                width: 250
            },
            {
                field: 'partnerName',
                displayName: 'Partner Name',
                width: 250
            },
            {
                field: 'documentType',
                displayName: 'Document Type',
                width: 150
            },
            {
                field: 'fileName',
                displayName: 'File Name',
                width: 350
            },
            {
                field: 'lastModDate',
                displayName: 'Last Mod Date',
                cellFilter: 'date:\'MMM-dd-yyyy\'',
                width: 150
            }
    ]
    };

    $scope.downloadFile = function (data) {
        var promise = quoteUtilFactory.donloadFile(data.id);
        promise.then(function (response) {
            console.log(response);
            if (response.data) {
                var blob = new Blob([data.data], {});
                var fileName = data.fileName;
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName);
                } else {
                    saveAs(blob, fileName);
                }
            }
        }, function (err) {
            console.log(err);
            notificationService.displayGetError(err);
        })
    }

    $scope.getData = function () {

        $scope.gridOptions.data = [];
        console.log($scope.filter);
        $scope.gridDataPromise = quoteUtilFactory.searchProjectFile($scope.filter);

        $scope.gridDataPromise.then(function (data) {
            console.log(data);
            if (data.data) {
                $scope.gridOptions.data = data.data;
            }
        }, function (err) {
            console.log(err);
            notificationService.displayGetError(err);
        })

    }

    $scope.resetFilters = function () {
        $scope.filter.ncopProjectId = '';
        $scope.filter.salesProjectId = '';
        $scope.filter.crmId = '';
        $scope.filter.customerName = '';
        $scope.filter.partnerName = '';
    }

});