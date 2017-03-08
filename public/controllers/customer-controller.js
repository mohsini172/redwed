angular.module("pains").controller("customerController", function ($scope, $http, $mdSidenav) {
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

    $scope.deleteCustomer = function(id){
        $http.delete('/customer/'+id)
        .then(function(){
            alert("SUCCESS")
        },function(error){
            alert("there was an error in deletion");
        });
    }
    $http.get('/customer')
    .then(function(data){
        $scope.customers = data.data;
        console.log(data.data);
    },function(error){
        alert("There was an error fetching classes");
    });
    $scope.submit = function(){
        $http.post('/customer',$scope.Customer)
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


    
});
