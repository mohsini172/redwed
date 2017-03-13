angular.module("pains").controller("labourController", function ($scope, $rootScope, $mdDialog, $http, $mdSidenav) {
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
    $http.get('/labour')
    .then(function(data){
        $scope.labours = data.data;
    },function(error){
        alert("There was an error fetching classes");
    });
    $scope.submit = function(){
        $http.post('/labour',$scope.Labour)
        .then(function(){
            alert("SUCCESS")
        },function(error){
            alert("there was an error in insertion");
        });
    }
    $scope.deleteLabour = function(id){
        $http.delete('/labour/'+id)
        .then(function(){
            alert("SUCCESS")
        },function(error){
            alert("there was an error in deletion");
        });
    }
    $scope.logout = function(){
        $http.post('/user/logout')
        .then(function(){
            window.location = "/";
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
