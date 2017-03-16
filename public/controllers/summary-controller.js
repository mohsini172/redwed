angular.module("pains").controller("summaryController", function ($scope, $rootScope, $http, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.selected = [];
    $scope.formVisible = false;
    $scope.filterer = "";

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }
    $scope.items = function () {
        return new Array($scope.Order.qty);
    }
    $scope.Order = {};
    $scope.Order.items = [];
    $scope.menu = [
        {
            link: '#/',
            title: 'Customer',
            icon: 'dashboard'
        },
        {
            link: '#/labour',
            title: 'Labour',
            icon: 'person_add'
        },
        {
            link: '#/order',
            title: 'Order',
            icon: 'group_add'
        }
    ];

    $http.get('/order/summary')
        .then(function (data) {
            $scope.summary = data.data;
        }, function (error) {
            alert("There was an error fetching Labours");
        });

});
