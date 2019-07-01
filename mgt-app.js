var MgtSmaRRt = angular.module("MgtSmaRRt", ["ngRoute", "ngAnimate"]);


MgtSmaRRt.run(function ($rootScope, RequestsService) {


	G_ME = loadUser();
	
	// G_ROOM_REQUESTS = loadRoomRequests();
	$.when( loadRoomRequests() ).done( (data) => {
	
		console.log("MgtSmaRRt run rr data: ", data);
	
		G_ROOM_REQUESTS = data;
		
	    setTimeout(function() {
	    	document.getElementsByTagName("html")[0].style.visibility = "visible";
	    	$("#loader1").hide();
	    }, 100);
	});

	
});




MgtSmaRRt.controller("HeaderCtrl", function($scope, RequestsService) {


	$scope.appTitle = "Mgt WORKBENCH";

	$scope.hello = "Witaj ";
	$scope.usr;
	
    
    $scope.$watch( 
    	function() {
    		return G_ME;
    	}, 
    	function(value) {
    	
    		$scope.usr = value;
    		$scope.hello += $scope.usr.nm + "!";
    		
    		//console.log("set user ", $scope.usr);
    	}
    );
});

MgtSmaRRt.controller("RRCtrl", function($scope, RequestsService) {


	$scope.rr = {};
	$scope.rr.rrList = [];

		
    
    $scope.$watch( 
    	function() {
    		return G_ROOM_REQUESTS;
    	}, 
    	function(grr) {
    	
    		$scope.rr.rrList = grr;

    		
    		
    	}
    );
    
    
    $scope.rr.downloadAllCsv = function() {
    	console.log("try to download data from rr list into local excel file");
    	
    	//console.log("$scope.rr.rrList ", $scope.rr.rrList);
    	
    	
    	let txtRequests = [ 
    		"ID;RRID;usrid;STATUS;PLT;RESP;FUP;PROJ;FAZA;MRD;DUNS;NAZWA;CC;ZIP;ADR;" + 
    		"CCC_CarrierCode;CCC_CustomsMaterial;CCC_DELIVERY_DATE;CCC_EstimatedCostForPTA;" + 
    		"CCC_PickupDate;CCC_RDC_Code;CCC_RDC_Date;CCC_Route;CCC_RouteAvailable;CCC_ServiceType;" + 
    		"LAT;LNG;PLACEID;CREATED;MODIFIED\n" 
    	];
    	
	    	
		$.when( loadRoomRequests() ).done( function(x) {
		
			setTimeout(function() {	
					
					
				x.forEach( (item) => { 
					txtRequests.push( "" + 
						item.ID + ";" + item.RR_ID + ";" + item.AID + 
						";" + item.STATUS + 
						";" + item.PLT +
						";" + item.RESP + 
						";" + item.FUP + 
						";" + item.Project + 
						";" + item.FAZA +
						";" + item.MRD + 
						";" + item.FMA.DUNS + 
						";" + item.FMA.SupplierName + 
						";" + item.FMA.CC + 
						";" + item.FMA.ZIP + 
						";" + item.FMA.Address + 
						";" + item.CCC.CarrierCode + 
						";" + item.CCC.CustomsMaterial + 
						";" + item.CCC.DELIVERY_DATE + 
						";" + item.CCC.EstimatedCostForPTA + 
						";" + item.CCC.PickupDate + 
						";" + item.CCC.RDC_Code + 
						";" + item.CCC.RDC_Date + 
						";" + item.CCC.Route + 
						";" + item.CCC.RouteAvailable + 
						";" + item.CCC.ServiceType + 
						";" + item.MAP.LAT + 
						";" + item.MAP.LNG + 
						";" + item.MAP.PLACEID +
						";" + item.Created + 
						";" + item.Modified + "\n"
					) 
				});
				
				let blob = new Blob( txtRequests, {type: "text/csv"});
				saveAs(blob, "rr.csv");
						
					
			}, 400);
			
	    	
		});

    	
    }
});



