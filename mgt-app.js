var MgtSmaRRt = angular.module("MgtSmaRRt", ["ngRoute", "ngAnimate"]);


MgtSmaRRt.run(function ($rootScope, RequestsService) {


	G_ME = loadUser();
	G_SPI_LIST = loadSPI();
	
	// G_ROOM_REQUESTS = loadRoomRequests();
	$.when( loadRoomRequests() ).done( (data) => {
	
		console.log("MgtSmaRRt run rr data: ", data);
	
		G_ROOM_REQUESTS = data;
		
	    setTimeout(function() {
	    	document.getElementsByTagName("html")[0].style.visibility = "visible";
	    	$("#loader1").hide();
	    }, 100);
	});
	
	
	
	$rootScope.rr = {};
	$rootScope.rr.buttonForMatchVisible = false;

	
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


	
	$scope.rr.rrList = [];

		
    
    $scope.$watch( 
    	function() {
    		return G_ROOM_REQUESTS;
    	}, 
    	function(grr) {
    	
    		$scope.rr.rrList = grr;

    		
    		
    	}
    );
    
    
    $scope.rr.showLoadedRoomRequests = function() {
  		console.log(" in $scope.rr.showLoadedRoomRequests");
  		
  		// using global -> G_ROOM_REQUESTS
  		setTimeout(function() {  	$("#loader1").show();   });
  		
  		
  		setTimeout( () => { $("#loader-dla-przygotuj-dane").hide(); }, 200);
  		setTimeout(function() {  	$("#loader1").hide();   });
  
  		//console.log("DDD: RequestsService.getFactoryBottomSmarrtListVisible: ", RequestsService.getFactoryBottomSmarrtListVisible());
  		
  		RequestsService.setFactoryBottomSmarrtListVisible(true);	
  		
  		$scope.rr.buttonForMatchVisible = true;
		

    }
    
    
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
    
    
    
    
    
    
    // prepare excel input again in this seperate app
  	$scope.rr.SPI = {};
  	$scope.rr.SPI.FileName = "";
  	$scope.rr.SPI.filenames = G_SPI_LIST;
    
    
    
    $scope.rr.makeMatch = function() {
    
  		console.log("$scope.rr.makeMatch -> przygotujDane dla: ", $scope.rr.SPI.FileName);		
  		
			
	  	setTimeout(function() {  	$("#loader1").show();   });

		
  		let url = G_PATH_TO_INPUT_FILE + $scope.rr.SPI.FileName;
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
  			G_WORKBOOK = XLSX.read(binStr, {type: "binary"});
  			
  			// no rs for mgt app
  			// RequestsService.setFactoryInputWorkbook(G_WORKBOOK);
  			
  			
  			
  			
  			// really big object, try to avoid log
  			//console.log("G_WORKBOOK: ", G_WORKBOOK);
  			
  			$scope.$apply(); 
  
  	    setTimeout(function() {  	$("#loader1").hide();   });
  
  		}
  		
  		req.send();

    	
    }
});


MgtSmaRRt.controller("JoinedListCtrl", function($scope, RequestsService) {

	$scope.joinedList = {};
	$scope.joinedList.headingForJoinedList = "JOINED LIST";
	$scope.joinedList.rr = {};
	$scope.joinedList.wrk = {};
	$scope.joinedList.tabelaWynikowa = {};
	
	
	
	// WATCH!
	$scope.$watch(() => {
		return G_ROOM_REQUESTS;
	}, (data) => {
	
		// console.log("watch in G_ROOM_REQUESTS: ", data);
		
		
		if( !!(data) ) {
			$scope.joinedList.rr.list = data;
			$scope.joinedList.rr.filteredList = data;
		}
		
	}, true);
	// END OF WATCH!


	// WATCH!
	$scope.$watch(() => {
		return G_WORKBOOK;
	}, (data) => {
	
		// console.log("watch in G_WORKBOOK: ", data);
		
		
		if( !!(data) ) {
		
		
			setTimeout(function() {  	$("#loader1").show();   });
		
			$scope.joinedList.wrk = data;
			
			
			let calyDuzyWorkbook = $scope.joinedList.wrk;
			let sh = calyDuzyWorkbook.Sheets["sharepoint_input"];
			let wiersz = 2;
			
			
			// still too big
			//console.log("sh: ", sh);
			
			let arr = [];
			
			
			
			do {
			
			
				let innerArr = [];
			
	    	// sh['A' + wiersz].v
	    	let plt = '';
	    	if( !!( sh['A' + wiersz] ) ) {
	    		plt = sh['A' + wiersz].v;
	    	}
	    	
	    	
	    	let my = '';
	    	if( !!(sh['D' + wiersz] ) ) {
	    		my = sh['D' + wiersz].v;
	    	}
	    	
	    	
	    	let mrd = '';
	    	if( !!(sh['I' + wiersz] ) ) {
	    		mrd = sh['I' + wiersz].v;
	    	}
	    	
	    	let coord = '';
	    	if( !!(sh['L' + wiersz] ) ) {
	    		coord = sh['L' + wiersz].v;
	    	}	
	    	
	    	let resp = '';
	    	if( !!(sh['AB' + wiersz] ) ) {
	    		resp = sh['AB' + wiersz].v
	    	}
	    	
	    	
	    	let duns = '';
	    	if( !!( sh['X' + wiersz] ) ) {
	    		duns = sh['X' + wiersz].v;
	    	}
	    	
      	let fup = '';
      	if( !!( sh['AC' + wiersz] ) ) {
      		fup = sh['AC' + wiersz].v;
      	}
      	
      	let proj = '';
      	if( !!( sh['B' + wiersz] ) ) {
      		proj = sh['B' + wiersz].v;
      	}
      	
      	let faza = '';
      	if( !!(sh['E' + wiersz] ) ) {
      		faza = sh['E' + wiersz].v;
      	}

	
	    	
	    	innerArr.push( "" + plt + resp + fup + proj + faza + mrd + duns );
	    	innerArr.push( plt );
	    	innerArr.push( resp );
	    	innerArr.push( fup );
	    	innerArr.push( proj );
	    	innerArr.push( faza );
	    	innerArr.push( mrd );
	    	innerArr.push( duns );
	    	innerArr.push( { RR: [], } );
	    	
	    	let checkThisOne = ( (el) => {
	    		return (el[0] == ("" + plt + resp + fup + proj + faza + mrd + duns) );
	    	});
	    	let b = arr.find( checkThisOne );
	    	if( !b ) {
	    		arr.push(innerArr);
	    	}
	    	
	    	


 				wiersz++;
				
				// special case for much shorter list
				// if( wiersz == 100 ) { break; }
				
			} while( !!( sh['A' + wiersz] ) );
			
			
			console.log("test arr[0] with innerArrs: ", arr[0]);
			
			$scope.joinedList.tabelaWynikowa.arr = arr;
			$scope.joinedList.tabelaWynikowa.arrFiltered = arr;
			// $scope.$apply(); // already digest!
			
			$scope.joinedList.rr.list.forEach( (rr) => {
				
				let indx = "" + rr.PLT + rr.RESP + rr.FUP + rr.Project + rr.FAZA + rr.MRD + rr.FMA.DUNS;
				
				let tmpScope = $scope.joinedList.tabelaWynikowa.arr.filter( (el) => {
					return (el[0] == indx);
				});
				
				tmpScope[0][8].RR.push(rr);
			});
			
			
			let forTestFilteredData = $scope.joinedList.tabelaWynikowa.arr.filter( (el) => {
				return ( el[8].RR.length > 0 );
			});
			console.log(" $scope.joinedList.tabelaWynikowa.arr.filter -> forTestFilteredData : ", forTestFilteredData  );

			setTimeout(function() {  	$("#loader1").hide();   });
			
		}
		
	}, true);
	// END OF WATCH!
	
	
	
	$scope.joinedList.downloadJoinedList = function() {
		
		
		console.log("try to download downloadJoinedList into local excel file");
    	
   	let txtRequests = [ 
   		"PLT;RESP;FUP;PROJECT;FAZA;MRD;SUPPLIER;COUNT_SMARRTS\n" 
   	];
    	
		$scope.joinedList.tabelaWynikowa.arr.forEach( (item) => { 
			txtRequests.push( "" + item[1] + 
				";" + item[2] + 
				";" + item[3] + 
				";" + item[4] + 
				";" + item[5] + 
				";" + item[6] + 
				";" + item[7] + 
				";" + item[8].RR.length + "\n"
			);
		});
		
		let blob = new Blob( txtRequests, {type: "text/csv"});
		saveAs(blob, "joinedList.csv");
						
					
		
	}
	
	
});


MgtSmaRRt.controller("BottomSmarrtListCtrl", function($scope, RequestsService) {




	
	
	$scope.bottomSmarrtList = {};
	$scope.bottomSmarrtList.title = "SmaRRt list";
	$scope.bottomSmarrtList.visible = false;
	
	$scope.bottomSmarrtList.list = [];
	$scope.bottomSmarrtList.filteredList = [];
	
	$scope.bottomSmarrtList.filterInput;
	
	
	// WATCH!
	$scope.$watch(() => {
		return G_ROOM_REQUESTS;
	}, (data) => {
	
		console.log("watch in G_ROOM_REQUESTS: ", data);
		
		
		if( !!(data) ) {
			$scope.bottomSmarrtList.list = data;
			$scope.bottomSmarrtList.filteredList = data;
		}
		
	}, true);
	// END OF WATCH!

	
	
	
	$scope.bottomSmarrtList.onChange = function() {
	
   
   if( $scope.bottomSmarrtList.filterInput.length == 0 ) {
   	$scope.bottomSmarrtList.filteredList = angular.copy( $scope.bottomSmarrtList.list );
   } else {
    	
    let filtr = $scope.bottomSmarrtList.filterInput;
    let data = angular.copy( $scope.bottomSmarrtList.list );
    	
    if( filtr.indexOf(":") == -1 ) {
    
    	$scope.bottomSmarrtList.filteredList = data.filter( (elementInData) => {
    		let ptrn = new RegExp( filtr );
    		return (ptrn.test(elementInData.FMA.SupplierName)); 
    	});
    
    } else {
    
    	if( filtr.indexOf(": ") == 0 ) {
    
    
    		filtr = filtr.replace(": ","");
    	
    		$scope.bottomSmarrtList.filteredList = data.filter( (elementInData) => {
    			let ptrn = new RegExp( filtr );
    			return (ptrn.test(elementInData.STATUS)); 
    		});
    
    	}
    	
    	if( filtr.indexOf("#: ") == 0 ) {
    
    
    		filtr = filtr.replace("#: ","");
    	
    		$scope.bottomSmarrtList.filteredList = data.filter( (elementInData) => {
    			let ptrn = new RegExp( filtr );
    			return (ptrn.test(elementInData.FMA.DUNS)); 
    		});
    
    	}
    	
    	if( filtr.indexOf("FUP: ") == 0 ) {
    
    
    		filtr = filtr.replace("FUP: ","");
    	
    		$scope.bottomSmarrtList.filteredList = data.filter( (elementInData) => {
    			let ptrn = new RegExp( filtr );
    			return (ptrn.test(elementInData.FUP)); 
    		});
    
    	}


    }
   }
	}
	
	
	
	let tmpInterval= setInterval( function() {
	
	
		// console.log("$scope.bottomSmarrtList.visible: ", $scope.bottomSmarrtList.visible);
	
		if( RequestsService.getFactoryBottomSmarrtListVisible() ) {
			$scope.bottomSmarrtList.visible = true;
			
			
			$scope.bottomSmarrtList.list = G_ROOM_REQUESTS;
			$scope.bottomSmarrtList.filteredList = G_ROOM_REQUESTS;
			
			
			$scope.$apply();
			clearInterval(tmpInterval);
		}
	}, 1000);
	
	
	
	
	
	
	$scope.fillInputFields = function(item) {
		
		console.log("BottomSmarrtListCtrl, fillInputFields item: ", item);
		
		document.getElementById("wybierz-fupa").value = item.FUP;
		document.getElementById("wybierz-proj").value = item.Project;
		document.getElementById("wybierz-faze").value = item.FAZA;
		
	}
	
	
	
	
	// EYE
	$scope.bottomSmarrtList.showLeafInTreeIfPossible = (item) => {
		console.log("showLeafInTreeIfPossible : item: ", item);
		
		// przygotuj array
		let arr = [];
		arr.push( item.PLT );
		arr.push( item.RESP );
		arr.push( item.FUP );
		arr.push( item.Project );
		arr.push( item.FAZA );
		arr.push( item.MRD );
		// need to work on that later
		//arr.push( item.FMA.DUNS );
		
		$scope.bottomSmarrtList.doSomeClicksOnMainTree( arr );
		
	}
	
	$scope.bottomSmarrtList.doSomeClicksOnMainTree = mainListEventHandler.doAllClicks;

});