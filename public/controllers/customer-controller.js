angular.module("pains").controller("customerController", function ($scope, $rootScope, $http, $mdSidenav, $mdDialog) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.selected = [];

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }
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

    $scope.deleteCustomer = function (id) {
        $http.delete('/customer/' + id)
            .then(function () {
                alert("SUCCESS")
            }, function (error) {
                alert("there was an error in deletion");
            });
    }
    $http.get('/customer')
        .then(function (data) {
            $scope.customers = data.data;
        }, function (error) {
            alert("There was an error fetching classes");
        });
    $scope.submit = function () {
        $http.post('/customer', $scope.Customer)
            .then(function () {
                alert("SUCCESS")
            }, function (error) {
                alert("there was an error in insertion");
            });
    }
    $scope.logout = function () {
        $http.post('/user/logout')
            .then(function () {
                window.location = "/";
            }, function (error) {
                alert(error);
            });
    }
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.openDialog = function (ev, data) {
        $rootScope.dialogData = data;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../views/info.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    function DialogController($scope, $http, $rootScope, $mdDialog) {
        $scope.attributes = [];
        var customer = $rootScope.dialogData;
        for (var i in customer) {
            if(i!='$$hashKey' && i!='__v')
            $scope.attributes.push({
                "name": i,
                "value": customer[i]
            })
        }
        $http.get('/customer/order/' + customer._id).
            then(function (data) {
                var total = 0;
                var price = 0;
                for (var i in data.data) {
                    for (var j in data.data[i].items) {
                        $scope.attributes.push({
                            "name": "Article No: ",
                            "value": data.data[i].items[j].articlenumber
                        })
                        total += 1;
                        price +=data.data[i].items[j].price;
                    }
                }
                $scope.attributes.push({
                    "name": "Total Items: ",
                    "value": total
                });
                $scope.attributes.push({
                    "name": "Total Price: ",
                    "value": price
                });

            },
            function (error) {
            });
        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
});
