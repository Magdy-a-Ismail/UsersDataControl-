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
          
         //   $http.get('http://www.mocky.io/v2/5e9a2083330000b2c27b2f1a').success(function (data) {
            $scope.AllData = [
                { "id": 1, "FileNo": "89", "Area": "القاهرة","ManName": "علاء احمد زايد عبد الحليم", "ManAge": "40", "WomanName": "سميه معاذ سيد محمد عيسى", "WomanAge": "35", "Count": "19", "Status": "متزوج" }   ,
{ "id": 2, "FileNo": "23", "Area": "القاهرة","ManName": "ممدوح محمد بدرمختار", "ManAge": "50", "WomanName": "ليلي محمود علي السيد", "WomanAge": "34", "Count": "98", "Status": "ارمل" }                             ,
{ "id": 3, "FileNo": "24", "Area": "القاهرة","ManName": "ارملة شعبان عبد التواب محمد حسان", "ManAge": "45", "WomanName": "رضا عبدالتواب حزين حزين ", "WomanAge": "25", "Count": "43", "Status": "اعزب" }          ,
{ "id": 4, "FileNo": "26", "Area": "القاهرة","ManName": "احمد رمضان شعبان شحات ", "ManAge": "38", "WomanName": "سناء حسين شعبان  عبد الفتاح ", "WomanAge": "55", "Count": "73", "Status": "مطلق" }                 ,
{ "id": 5, "FileNo": "43", "Area": "القاهرة","ManName": "يوسف محمد على احمد ", "ManAge": "52", "WomanName": "رضا ابراهيم مصطفى  ابراهيم ", "WomanAge": "45", "Count": "29", "Status": "متزوج" }                    ,
{ "id": 6, "FileNo": "20", "Area": "القاهرة","ManName": "حسان عبد الفتاح عبد اللطيف حسان ", "ManAge": "37", "WomanName": "عنبه على محمد على ", "WomanAge": "32", "Count": "49", "Status": "ارمل" }                 ,
{ "id": 7, "FileNo": "19", "Area": "القاهرة","ManName": "عادل عبد الظاهر جوده ", "ManAge": "48", "WomanName": "شاميه على محمد على ", "WomanAge": "41", "Count": "39", "Status": "متزوج" }                           
            ]
;
           // });
            $scope.FirstResult = $scope.AllData;
         
            changepage();    
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

        
           
            $scope.AllData = [];
            const FileNoRes = $filter('filter')($scope.FirstResult, { 'FileNo': $scope.SearchValue });
            const ManNameRes = $filter('filter')($scope.FirstResult, { 'ManName': $scope.SearchValue });
            const WomanNameRes = $filter('filter')($scope.FirstResult, { 'WomanName': $scope.SearchValue });
            FileNoRes.concat(ManNameRes);
            ManNameRes.concat(WomanNameRes);
          
            
                $scope.AllData=  $scope.AllData.concat(FileNoRes);
            $scope.AllData = $scope.AllData.concat(ManNameRes);
            $scope.AllData = $scope.AllData.concat(WomanNameRes);
           

            changepage();

        }


        $scope.$watch('currentPage + numPerPage', function (newvalu, oldvalue) {

            if (newvalu != oldvalue) {
                changepage();

            }
        });

    var changepage = function () {
        $scope.PagingLingth = $scope.AllData.length
            $scope.SerialNo = ($scope.currentPage - 1) * $scope.numPerPage;
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.namesData = $scope.AllData.slice(begin, end);

        }
    });
