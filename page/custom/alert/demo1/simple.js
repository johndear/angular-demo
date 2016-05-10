'use strict';

angular.module('myApp.demo1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/demo1', {
    templateUrl: 'demo1/simple.html',
    controller: 'Demo1Ctrl'
  });
}]).controller('Demo1Ctrl', ["$scope", function($scope) {
	$scope.myDateValue = "09/02/2015";

}]).directive('datepicker', function() {
   return function(scope, element, attrs) {
       element.datepicker({
           inline: true,
           dateFormat: 'dd.mm.yy',
           onSelect: function(dateText) {
               var modelPath = $(this).attr('ng-model');
               //putObject(modelPath, scope, dateText);
               scope.$apply();
           }
       });
   }
}).controller("TestAlertCtrl", ["$scope", "AlertService", function ($scope, AlertService) {
	$scope.myAlert = function () {
		AlertService.alert({
			title: "测试",
			content: "你好，我是警告"
		})
			.then(function () {
				alert("你刚才点了确定");
			});
	};

	$scope.myConfirm = function () {
		AlertService.confirm({
			title: "测试",
			content: "你好，确定吗？"
		})
			.then(function () {
				alert("你刚才点了确定");
			}, function () {
				alert("你刚才点了取消");
			});
	};
}]).controller("TestDialogCtrl", ["$scope", "DialogService", function ($scope, DialogService) {
	
	$scope.dialog = function () {
		DialogService.modal({
			key: "sn.controls.test.dialog",
			url: "templates/alert/dialog.html",
			accept: function (params) {
				//alert(params);
				$scope.inputout = params;
			},
			refuse: function(reason) {
				alert("用户拒绝了，原因是：" + reason);
			}
		}, {name: $scope.inputin});
	};

}]).controller("DialogCtrl", ["$scope", "DialogService", function ($scope, DialogService) {
	$scope.ok = function () {
		DialogService.accept("sn.controls.test.dialog", $scope.name);
	};

	$scope.cancel = function () {
		DialogService.refuse("sn.controls.test.dialog", "我不想填");
	};

	$scope.close = function () {
		DialogService.dismiss("sn.controls.test.dialog");
	};
}]);;