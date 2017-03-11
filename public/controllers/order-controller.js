angular.module("pains").controller("orderController", function ($scope, $rootScope, $http, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.selected = [];
    $scope.formVisible = false;
    
    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }
    $scope.items = function(){
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
    
    $http.get('/labour')
    .then(function(data){
        $scope.labours = data.data;
    },function(error){
        alert("There was an error fetching Labours");
    });


    $scope.deleteOrder = function(id){
        $http.delete('/order/'+id)
        .then(function(){
            alert("SUCCESS")
        },function(error){
            alert("there was an error in deletion");
        });
    }

    $http.get('/customer')
    .then(function(data){
        $scope.customers = data.data;
    },function(error){
        alert("There was an error fetching Customers");
    });

    $http.get('/order')
    .then(function(data){
        $scope.orders = data.data;
    },function(error){
        alert("There was an error fetching classes");
    });
    $scope.submit = function(){
        $http.post('/order',$scope.Order)
        .then(function(){
            alert("SUCCESS")
        },function(error){
            alert("there was an error in insertion");
        });
    }
    $scope.logout = function(){
        $http.post('/logout')
        .then(function(){
            window.location = "/public";
        },function(error){
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
        var customer = $rootScope.dialogData;
        for (var i in customer) {
            $scope.attributes.push({
                "name": i,
                "value": customer[i]
            })
        }
        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
});
