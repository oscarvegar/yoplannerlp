angular.module('yoplanner.cotizar',[])
.controller('CotizarCtrl',function($scope,$http){
	$scope.data = {tipo:""};
	$scope.submit = function() {
		$http.post("/sendmail.php",$scope.data).success(function(data){
			alert(data);
		})
	};

	$scope.submitcv = function() {
		$scope.data.tipo = "";
		if($scope.cbvp){
			$scope.data.tipo += "Viaje Personal; ";
		}
		if($scope.cbvg){
			$scope.data.tipo += "Viaje de Grupo; ";
		}
		if($scope.cbec){
			$scope.data.tipo += "Evento Corporativo; ";
		}
		if($scope.cbes){
			$scope.data.tipo += "Evento Social; ";
		}
		if($scope.cbcr){
			$scope.data.tipo += "Crucero; ";
		}
		$http.post("/sendmailcv.php",$scope.data).success(function(data){
			alert(data);
		})
	};


	
	
})
