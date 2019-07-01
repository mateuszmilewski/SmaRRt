SmaRRt.controller("GetInputDataCtrl", function($scope, RequestsService) {


	$scope.wrk;
	
	
	$scope.przygotujDane = function() {
	
	
	
		console.log("GetInputDataCtrl -> przygotujDane ");
		
		
		// odswiezenie calego drzewa!
		// NOK!
		//treeMaker.refreshAllTree();

		
		
		setTimeout( () => { $("#loader-dla-przygotuj-dane").show(); }, 1);
			
	    setTimeout(function() {  	$("#loader1").show();   });

		
		
		let url = G_TEST_PATH_TO_INPUT_FILE;
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