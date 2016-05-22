angular.module("expanderModule", [])
.directive('expander', function() {
	return {
		restrict : 'EA',
		replace : true,
		transclude : true,
		template : '<div>' + 
						'<div class="title" ng-click="toogle()">{{title}}</div>' + // 这个title属于当前directive isolate scope的property
						'<div class="body" ng-show="opened" ng-transclude></div>' + // 这里的东西，获取的是父scope的property咯
					'</div>',
		require: '^?accordion',
		scope : {
			title : "=expanderTitle"// 绑定directive元素身上的zippy-title属性
		},
		link : function(scope, element, attrs, accordionController) {
			//var title = angular.element(element.children()[0]);
			scope.opened = false;

			//title.bind("click", toogle);
			//element.addClass("closed");
			
			accordionController.addExpander(scope);

			scope.toogle = function () {
				scope.opened = !scope.opened;
				//element.removeClass(scope.opened ? "closed" : "opened");
				//element.addClass(scope.opened ? "opened" : "closed");
				
				accordionController.gotOpened(scope);
			}
		}
	};
}).directive('accordion', function() {
	return {
		restrict : 'EA',
		replace : true,
		transclude : true,
		template : '<div ng-transclude></div>',
		controller: function(){
			var expanders = [];
			
			this.addExpander = function(expander){
				expanders.push(expander);
			}
			
			this.gotOpened = function(selectedExpander){
				angular.forEach(expanders, function(expander){
					if(selectedExpander != expander){
						expander.opened = false;
					}
				});
			}
		}
	};
	
});

