adminApp.controller('ServicingUserListController', function($scope, $http, $filter,$location,$routeParams,adminCommonFactory) {
		
		 $scope.showName=$routeParams.serviceId;
		 console.log( $scope.showName);

	    // 配置分页基本参数 - 列表页
	    $scope.paginationConf = {
	        currentPage: 1,
	        itemsPerPage: 10,
	        perPageOptions:[5, 10, 15, 20, 30]
	    };
	    
	     // 分页查询
	    function queryByPage(){
	        var postData = {
	            fromDate: $scope.fromDate,
	            untilDate: $scope.untilDate,
	            serverAccount: $scope.serverAccount,
	            customerId:$scope.customerId,
	            page:$scope.paginationConf.currentPage,
	            pageSize:$scope.paginationConf.itemsPerPage
	        }

	        $http({
	            method: 'POST',
	            url: 'admin/MonitorController/queryServicingUserList',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            params: postData
	        }).success(function(response) {
	            $scope.servingClients=response.data;
	            $scope.paginationConf.totalItems=response.total;
	        });



	    }
	    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', queryByPage);
});