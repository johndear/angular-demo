'use strict';

/**
 * Date Range Picker公用指令
 * 廖金洪   2015-08
 */
angular.module('ar_admin').controller('ViewCtrl', function($scope) {

}).directive('dateRangePicker', function(UtilService,baseResource,bsTable) {
	return {
		restrict : 'A',
		link : function($scope, element, attr) {
			//默认周期为当月
			var firstDate = new Date();
			firstDate.setDate(1); 
			var endDate = new Date(firstDate);
			endDate.setMonth(firstDate.getMonth()+1);
			endDate.setDate(0);
			$(element).daterangepicker({
		        "autoApply": true,
		        "locale": {
		            "format": "YYYY/MM/DD",
		            "separator": "~",
		            "daysOfWeek": ["日","一","二","三","四","五","六"],
		            "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
		            "firstDay": 1
		        },
		        "startDate": firstDate,
		        "endDate": endDate
		    });
		}
	};
}).directive('singleDatePicker', function(UtilService,baseResource,bsTable) {
	return {
		restrict : 'A',
		link : function($scope, element, attr) {
			$(element).daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
		        "locale": {
		            "format": "YYYY/MM/DD",
		            "daysOfWeek": ["日","一","二","三","四","五","六"],
		            "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
		            "firstDay": 1
		        },
		    });
		}
	};
});

;