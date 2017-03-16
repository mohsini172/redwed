angular.module("pains").controller("orderController", function ($scope, $rootScope, $http, $mdDialog, $mdSidenav) {
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
        },
        {
            link: '#/summary',
            title: 'Summary',
            icon: 'group_add'
        }
    ];

    $scope.deliver = function(id){
        $http.post('/order/deliver',{"id":id})
        .then(function(data){
            alert("Success");
        },
        function(err){
            alert("There was an error in update");
        })
    }

    $http.get('/labour')
        .then(function (data) {
            $scope.labours = data.data;
        }, function (error) {
            alert("There was an error fetching Labours");
        });


    $scope.deleteOrder = function (id) {
        $http.delete('/order/' + id)
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
            alert("There was an error fetching Customers");
        });

    $http.get('/order/all')
        .then(function (data) {
            $scope.orders = data.data;
            $scope.urgent = 0;
            $scope.warning = 0;
            $scope.successfull = 0;
            var current = new Date();
            for(var i in data.data){
                var deliverydate = new Date(data.data[i].dlvdate);
                var difference = (deliverydate-current)/86400000;
                if((difference) <=10 ){
                    $scope.urgent+=1;
                    $scope.orders[i].type = "urgent";
                }
                else if((difference) <=18 ){
                    $scope.warning +=1;
                    $scope.orders[i].type = "warning";
                }
                else{
                    $scope.successfull += 1;
                    $scope.orders[i].type = "successfull";
                }
            }
        }, function (error) {
            alert("There was an error fetching classes");
        });
    $scope.submit = function () {
        $http.post('/order', $scope.Order)
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
    function DialogController($scope, $rootScope, $mdDialog) {
        $scope.attributes = [];
        var order = $rootScope.dialogData;
        if (order.customerid) {
            order["Customer ID"] = order.customerid._id ? order.customerid._id : "N/A";
            order["Customer Name"] = order.customerid.cname ? order.customerid.cname : "N/A";
            order["Customer Phone Number"] = order.customerid.phone1 ? order.customerid.phone1 : "N/A";
        }
        if (order.items) {
            for (var i in order.items) {
                order["Item " + i + " ID"] = order.items[i]._id;
                order["Item " + i + " Artical Number"] = order.items[i].articlenumber;
                order["Item " + i + " Category"] = order.items[i].category;
                order["Item " + i + " Price"] = order.items[i].price;
            }
        }
        // $rootScope.dialogData.itams="";
        // if(data.items){
        //     for(var i in data.items){
        //         $rootScope.dialogData.itams+="<b>"+i+"</b>: "+data.items[i] + "<br>";
        //     }
        // }
        for (var i in order) {
            if (i!="items" && i != "customerid" && i != "__v" && i != "$$hashKey") {
                $scope.attributes.push({
                    "name": i,
                    "value": order[i]
                });
            }

        }
        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
});
