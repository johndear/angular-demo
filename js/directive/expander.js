var myModule = angular.module("ZippyModule", ['expanderModule']);
myModule.controller("MyCtrl", function($scope) {
	$scope.title = "这里是标题";
	$scope.text = "这里是内容哇。。。";
	
	$scope.expanders = [
	   {title:'test1', text: '中文1'},
	   {title:'test2', text: '中文2'},
	   {title:'test1', text: '中文1'},
	   {title:'test2', text: '中文2'}
	];
});
myModule.directive('zippy', function() {
	return {
		template : 
		'<div>' + 
			'<div class="title">{{title}}</div>' + // 这个title属于当前directive isolate scope的property
			'<div class="body" ng-transclude></div>' + // 这里的东西，获取的是父scope的property咯
		'</div>',
		replace : true,
		transclude : true,
		restrict : 'C',
		scope : {
			title : "@zippyTitle"// 绑定directive元素身上的zippy-title属性
		},
		link : function(scope, element, attrs) {
			var title = angular.element(element.children()[0]), opened = false;

			title.bind("click", toogle);
			element.addClass("closed");

			function toogle() {
				opened = !opened;
				element.removeClass(opened ? "closed" : "opened");
				element.addClass(opened ? "opened" : "closed");
			}
		}
	};
});