SmaRRt.controller("GetInputDataCtrl", function($scope, RequestsService) {


	$scope.wrk;
	$scope.SPI = {};
	$scope.SPI.FileName = "";
	$scope.SPI.filenames = RequestsService.getFactorySpi();
	
	
	$scope.getRoomRequests = function() {
		console.log(" in getRoomRequests ");
		
		// using global -> G_ROOM_REQUESTS
		setTimeout(function() {  	$("#loader1").show();   });
		
		
		$.when( loadRoomRequests() ).then( function(data, status) {
		
			console.log("loadRoomRequests: ", data, status);
			G_ROOM_REQUESTS = data;
		});
		
		
		setTimeout( () => { $("#loader-dla-przygotuj-dane").hide(); }, 200);
		setTimeout(function() {  	$("#loader1").hide();   });

		//console.log("DDD: RequestsService.getFactoryBottomSmarrtListVisible: ", RequestsService.getFactoryBottomSmarrtListVisible());
		
		RequestsService.setFactoryBottomSmarrtListVisible(true);	
		
		//console.log("DDD: RequestsService.getFactoryBottomSmarrtListVisible: ", RequestsService.getFactoryBottomSmarrtListVisible());
		
	}
	
	
	$scope.przygotujDane = function() {
	
	
		
  		console.log("GetInputDataCtrl -> przygotujDane dla: ", $scope.SPI.FileName);		
  		
  		// odswiezenie calego drzewa!
  		// NOK!
  		//treeMaker.refreshAllTree();

		
		
			setTimeout( () => { $("#loader-dla-przygotuj-dane").show(); }, 1);
			
	  	setTimeout(function() {  	$("#loader1").show();   });

		
  		let url = G_PATH_TO_INPUT_FILE + $scope.SPI.FileName;
  		let req = new XMLHttpRequest();
  		req.open("GET", url, true);
  		req.responseType = "arraybuffer";
  		
  		req.onload = (e) => {
  			let rawData = new Uint8Array( req.response );
  			let tablicaCzytelna = new Array();
  			
  			for(let i = 0 ; i != rawData.length ; i++) {
  				tablicaCzytelna[i] = String.fromCharCode(rawData[i]);
  			}
  			
  			let binStr = tablicaCzytelna.join("");
  			$scope.wrk = XLSX.read(binStr, {type: "binary"});
  			
  			G_WORKBOOK = $scope.wrk;
  			RequestsService.setFactoryInputWorkbook(G_WORKBOOK);
  			
  			
  			
  			
  			// really big object, try to avoid log
  			// console.log("GetInputDataCtrl: G_WORKBOOK: ", G_WORKBOOK);
  			
  			$scope.$apply(); 
  
  			setTimeout( () => { $("#loader-dla-przygotuj-dane").hide(); }, 200);
  	    setTimeout(function() {  	$("#loader1").hide();   });
  
  		}
  		
  		req.send();
			
		

	}
});