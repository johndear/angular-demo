angular.module("expanderModule", [])
.directive('expander', function() {
	return {
		restrict : 'EA',
		replace : true,
		transclude : true,
		template : '<div>' + 
						'<div class="title">{{title}}</div>' + // 这个title属于当前directive isolate scope的property
						'<div class="body" ng-transclude></div>' + // 这里的东西，获取的是父scope的property咯
					'</div>',
		scope : {
			title : "@expanderTitle"// 绑定directive元素身上的zippy-title属性
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
			
			this.gotOpened = function(){
				angular.forEach(expanders, function(expander){
					if(selectedExpander != expander){
						expander.showMe = false;
					}
				});
			}
		}
	};
	
});

.expander{
	border: 1px solid black;
	width:250px;
}
.expander > .title{
	backgroud-color:black;
	color:white;
	padding: .1em .3em;
	cursor: pointer;
}
.expander > .body{
	padding: .1em .3em;
}
<accordion>
	<expander class="expander" ng-repeat="expander in expanders" expander-title="expander.title">
		{{expander.text}}
	</expander>
</accordion>