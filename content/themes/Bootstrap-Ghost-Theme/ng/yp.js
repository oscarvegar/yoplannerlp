angular.module('yoplanner.blog',[])
.controller('BlogCtrl',function($scope,$http,$sce,$filter,$timeout){
	
	$scope.init = function(){

		$http.get("/ghost/api/v0.1/posts?client_id=ghost-frontend&client_secret=b1914fda886b&include=author")
		.success(function(data){
			console.log("POSTS",data.posts[1]);
			$scope.posts = data.posts;
			
		})

		//$scope.current = $state.current;
		
	}
	


	
	$scope.deliberatelyTrustDangerousSnippet = function(data) {
		return $sce.trustAsHtml(data);
	};


	$scope.init();
	
	
})
