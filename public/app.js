angular.module("pains", ["ngRoute", "ngMaterial","md.data.table"]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/customer.html',
            controller: 'customerController'
        })
        .when('/labour',{
            templateUrl:'views/labour.html',
            controller:'labourController'
        })
        .when('/order',{
            templateUrl:'views/order.html',
            controller:'orderController'
        })
        .when('/addStudent',{
            templateUrl:'views/addStudent.html',
            controller:'addStudentController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);