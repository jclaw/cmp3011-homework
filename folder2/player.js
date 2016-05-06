angular.module('earApp')
.controller('PlayerCtrl', function($scope) {
   $scope.first = "Info";
    $scope.customers=[
        {name:'jerry',city:'chicago'},
        {name:'tom',city:'houston'},
        {name:'enslo',city:'taipei'}
    ];
});
