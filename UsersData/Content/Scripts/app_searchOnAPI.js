  var app = angular.module('liveApp', ['ui.bootstrap']);

app.controller('liveController', function ($scope, $http, $filter) {

        $scope.formData = {};
        $scope.addData = {};
        $scope.success = false;

        $scope.getTemplate = function (data) {
            if (data.id === $scope.formData.id) {
                return 'edit';
            }
            else {
                return 'display';
            }
        };

        $scope.fetchData = function () {

            $http.get('//Url Here' + "?pageNo=" + $scope.currentPage + "&NoPerPage=" + $scope.numPerPage + "&SearchValue=" + $scope.SearchValue).success(function (data) {
                $scope.namesData = data.Users;
                $scope.PagingLingth = data.count;
            });
         
          
        };

        $scope.insertData = function () {
            $http({
                method: "POST",
                url: "//URl here",
                data: $scope.addData,
            }).success(function (data) {
                $scope.success = true;
                $scope.successMessage = data.message;
                $scope.fetchData();
                $scope.addData = {};
            });
        };

        $scope.showEdit = function (data) {
            $scope.formData = angular.copy(data);
        };

        $scope.editData = function () {
            $http({
                method: "POST",
                url: "//Url Here",
                data: $scope.formData,
            }).success(function (data) {
                $scope.success = true;
                $scope.successMessage = data.message;
                $scope.fetchData();
                $scope.formData = {};
            });
        };

        $scope.reset = function () {
            $scope.formData = {};
        };

        $scope.closeMsg = function () {
            $scope.success = false;
        };

        $scope.deleteData = function (id) {
            if (confirm("هل متأكد انك تريد حذف هذا الحقل؟")) {
                $http({
                    method: "POST",
                    url: "//Url Here",
                    data: { 'id': id }
                }).success(function (data) {
                    $scope.success = true;
                    $scope.successMessage = data.message;
                    $scope.fetchData();
                });
            }
        };
        $scope.sortColumn = "name";
        $scope.reverseSort = false;

        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ?
                !$scope.reverseSort : false;
            $scope.sortColumn = column;
        }

        $scope.getSortClass = function (column) {

            if ($scope.sortColumn == column) {
                return $scope.reverseSort
                    ? 'arrow-down'
                    : 'arrow-up';
            }

            return '';
        };

      
        $scope.currentPage = 1;
        $scope.PagingLingth = 10;
        $scope.numPerPage = 2;
        $scope.maxSize = 5;
        $scope.SerialNo = $scope.currentPage - 1 * $scope.numPerPage;
    $scope.Search = function () {

        $scope.fetchData();

    };


        $scope.$watch('currentPage + numPerPage', function (newvalu, oldvalue) {

            if (newvalu != oldvalue) {
                $scope.fetchData();

            }
        });


    });
