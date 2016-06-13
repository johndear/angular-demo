angular.module("fileuploadModule", []).directive('fileupload', function() {
	return {
		restrict : 'A',
		scope : {
			done : "&",// 绑定directive元素身上的zippy-title属性
			process : "&"
		},
		link : function(scope, element, attrs, accordionController) {
			var optionObj = {
					dataType:'json'
			};
			if(scope.done){
				optionObj.done = function(){
					scope.$apply(function(){
						scope.done({e:e, data:data});
					});
				}
			}
			
			if(scope.process){
				optionObj.process = function(){
					scope.$apply(function(){
						scope.process({e:e, data:data});
					});
				}
			}
			
			element.fileupload(optionObj);
			
		}
	}
});