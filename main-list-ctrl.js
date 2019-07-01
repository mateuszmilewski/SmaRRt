// QuickStatsCtrl -> stats & quick valid on wizard standards
SmaRRt.controller("MainListCtrl", function($scope, RequestsService) {


	$scope.communication = "";
	
	$scope.loadedSupplierFromSharepoint = null;
	
	$scope.mainList = {};
	$scope.mainList.filtrDostawcy = "";	
	
	
	// main object
	// initial graph
	// plt -> resp -> fup -> proj -> phase -> mrd
	$scope.tree = treeMaker.tree;
	$scope.plants = [];
	
	
	// click handlers
	//
	//$scope.itemInPlantsClickEvent = mainListEventHandler.common;
	//$scope.itemInItemInPlantsClickEvent = mainListEventHandler.common;
	$scope.spanClick = mainListEventHandler.common;
	//
	//
	
	
	// make from
	//
	//
	$scope.makeFromPlant = function(item) {
		let p = $scope.tree['' + item];
		return Object.keys(p);
	}
	
	$scope.makeFromResp = function(item, resp) {
		let x = $scope.tree['' + item]['' + resp];
		return Object.keys(x);
	}
	
	$scope.makeFromFup = function(item, resp, fup) {
		let x = $scope.tree['' + item]['' + resp]['' + fup];
		return Object.keys(x);
	}
	
	$scope.makeFromProj = function(item, resp, fup, proj) {
		let x = $scope.tree['' + item]['' + resp]['' + fup]['' + proj];
		return Object.keys(x);
	}

	$scope.makeFromFaza = function(item, resp, fup, proj, faza) {
		let x = $scope.tree['' + item]['' + resp]['' + fup]['' + proj]['' + faza];
		return Object.keys(x);
	}
	
	$scope.makeFromMrd = function(item, resp, fup, proj, faza, mrd, filtr) {
		let x = $scope.tree['' + item]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd];
		let pre = Object.keys(x);
		let toReturn = [];
		pre.forEach( (e) => {
			if( $scope.regExpFiltrDostawcy(e, item, resp, fup, proj, faza, mrd, filtr) ) {
				toReturn.push(e);
			}
		});
		
		return toReturn;
	}
	
	$scope.makeFromDuns = function(item, resp, fup, proj, faza, mrd, duns) {
		let dunsHandler = $scope.tree['' + item]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
		return dunsHandler.x;
	}


	
	//
	//
	//
	
	
	//
	// REG EXP
	$scope.regExpFiltrDostawcy = function(e, plt, resp, fup, proj, faza, mrd, filtr) {
		// console.log( "dupa test: regExpFiltrDostawcy ", $scope.filtrDostawcy , e );
		
		let ptrn = new RegExp( filtr );
		let regExpByFiltrDuns = ptrn.test( e );
		let regExpBySupplierName = true;
		
		let dunsHandler = $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + e]
		
		let supplierName = "";
		
		if ( !!(dunsHandler.x) ) {
			supplierName = dunsHandler.x[0].name;
			regExpBySupplierName = ptrn.test( supplierName );
		}
		
		return regExpByFiltrDuns || regExpBySupplierName;
	}
	//
	//
	
	
	$scope.dupa = function(x) {
		console.log("dupa: ", x);
	}
	
	
	$scope.passSuppliernameIntoMap = function(arg) {
		console.log("passSuppliernameIntoMap : ", arg);
		
		//
		//
		let pacInputHandler = document.getElementById("pac-input");
		pacInputHandler.value = arg;
		
	}
	
	
	$scope.getSupplierName = function( plt, resp, fup, proj, faza, mrd, duns ) {
		return $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns].x[0].name;
	}
	
	$scope.loadSupplierDataFromSpAndCreateRoomRequestProperty = function(plt, resp, fup, proj, faza, mrd, duns) {
	
		setTimeout(function() {  	
			$("#loader1").show();   
		});
		//
		//
	
		$.when( loadSuppliersByDuns(duns) ).done( (data) => {
			$scope.loadedSupplierFromSharepoint = data;
			
			let tmpDataFromDuns = $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];			
			tmpDataFromDuns.sharepoint = data;
			tmpDataFromDuns.sharepoint.source = ""; // jak SP to nie dajemy nic
			
			// important!
			// stworzenie nowego sub-obiektu dla danych pod room request
			//
			//
			tmpDataFromDuns.RR = loadRoomRequestsByPathArray(plt, resp, fup, proj, faza, mrd, duns);
			tmpDataFromDuns.RR.unshift({
				CCC: {},
				FMA: {},
				MAP: {},
				RESP: resp,
				FAZA: faza,
				Project: proj,
				FUP: fup,
				PLT: plt,
				MRD: mrd,
				STATUS: 0,
			});
			console.log("loadSupplierDataFromSpAndCreateRoomRequestProperty  -> tmpDataFromDuns.RR ", tmpDataFromDuns.RR);
			
			//
			//
			//
			// mamy gotowe .sharepoint oraz .RR pokazmy na mapie zatem rowniez tego dostawce z indexu zero
			//
			if( !!( data ) ) {
				if( !!(data[0]) ) {
					let dostawcaDoPokazaniaNaMapie = data[0];
					
					let lat = dostawcaDoPokazaniaNaMapie.lat;
					let lng = dostawcaDoPokazaniaNaMapie.lng;
					
					let thisLatLng = new google.maps.LatLng( lat, lng );
					// G_PLACE = thisPlace;
					console.log("loadSupplierDataFromSpAndCreateRoomRequestProperty thisLatLng : ", thisLatLng );
					
					G_MAP = new google.maps.Map(document.getElementById("map"), {
						zoom: 10,
						center: thisLatLng,
					});
					
						
					G_MARKER = new google.maps.Marker({
						map: G_MAP,
						position: thisLatLng,
					});
												
			  		G_MARKER.setVisible(true);
					// markers.push(newMarker);
					
					
					setTimeout( () => { $scope.$apply(); }, 200);
				}
			}
			
			//
			//
			//
			// $scope.$apply(); // do not need this 
			
			console.log("main-list-ctrl -> loadSupplierDataFromSp ", $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns]);

			// push data into req service //
			//
			// 
			let dataForReqService = $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
			RequestsService.setDataForSmarrtForm( dataForReqService );
			//
			//
			//
			
			
			//
			//	
			setTimeout( () => { 
				$scope.$apply();
				$("#loader1").hide(); 
			}, 200);

		});

	
	}
	
	
	
	
	$scope.getDownloadedSharepointDataSupplier = function(plt, resp, fup, proj, faza, mrd, duns) {
	
	
		let tmp = $scope.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
		//console.log("getDownloadedSharepointDataSupplier : ", tmp);
	
		if( !!(tmp) ) {
			if( !!(tmp.sharepoint) ) {
				// console.log("getDownloadedSharepointDataSupplier tmp.sharepoint : ", tmp.sharepoint);
				return tmp.sharepoint;
			} else {
				return [];
			}
		} else {
			return [];
		}
	}


	

    $scope.$watch( 
    	function() {
    		return RequestsService.getFactoryInputWorkbook();
    	}, 
    	function(calyDuzyWorkbook) {
    	
    		console.log(" MainListCtrl: calyDuzyWorkbook " , calyDuzyWorkbook );
    		//$scope.listAvail = RequestsService.getFactoryValidWizardStandard();
    		$scope.listAvail = true;
			console.log(" MainListCtrl: $scope.listAvail ", $scope.listAvail );
			
			
			if( $scope.listAvail ) {
    	
	    		if( !!(calyDuzyWorkbook) ) {
   			
	    			let wiersz= 2;
	    			let sh = calyDuzyWorkbook.Sheets["sharepoint_input"];
	    			
	    			
	    			
	    			
	    			
	    			// MAIN LOOP to FILL data in TREE! 
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			do {
	    				    				
	    				let branchInArray = createBrachBasedOnRow( sh, wiersz );
	    				if( !!( branchInArray ) ) {
		    				let objectForBrach = createObjectForBranch( sh, wiersz );
	    					treeMaker.addObjectNodeBasedOnPathArray( branchInArray , objectForBrach );	    				
	    				}
	    				
	    				wiersz++;
	    				
	    				// special case for much shorter list
	    				// if( wiersz == 100 ) { break; }
	    				
	    			} while( !!( sh['A' + wiersz] ) );
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			//////////////////////////////////////////////////////////////////////////////////////////
	    			
	    			
	    			// show me
	    			console.log(" master tree => ", $scope.tree);
	    			$scope.plants = Object.keys($scope.tree);
	    			//delete $scope.plants.id;
	    			//$scope.$apply();
	    		}
			} else {
				$scope.communication = "Lista nie jest dostępna. Krytyczny błąd walidacji danych!";
				// alert($scope.communication);
				console.log($scope.communication);
			}

    	}
    );
    
    
    function createObjectForBranch(sh, wiersz) {
    
    	let arr = [];
    	
    	
    	// [sh['T' + wiersz].v, sh['V' + wiersz].v, sh['X' + wiersz].v, sh['Y' + wiersz].v, sh['AI' + wiersz].v]
	    let pn = '';
    	if( !!( sh['T' + wiersz] ) ) {
    		pn = sh['T' + wiersz].v;
    	}
    	
    	
	    let pname = '';
    	if( !!( sh['V' + wiersz] ) ) {
    		pname = sh['V' + wiersz].v;
    	}
    	
	    let duns = '';
    	if( !!( sh['X' + wiersz] ) ) {
    		duns = sh['X' + wiersz].v;
    	}
    	
	    let supplier = '';
    	if( !!( sh['Y' + wiersz] ) ) {
    		supplier = sh['Y' + wiersz].v;
    	}
    	
	    let qty = '';
    	if( !!( sh['AI' + wiersz] ) ) {
    		qty = sh['AI' + wiersz].v;
    	}
    	
	    let order = '';
    	if( !!( sh['AL' + wiersz] ) ) {
    		order = sh['AL' + wiersz].v;
    	}

	    let conf = '';
    	if( !!( sh['AN' + wiersz] ) ) {
    		conf = sh['AN' + wiersz].v;
    	}


		arr.push( pn );
		arr.push( pname );
		arr.push( duns );
		arr.push( supplier );
		arr.push( qty );
		
		arr.push( order );
		arr.push( conf );



    
    	return { 'name': supplier, 'data': arr };
    }
    
    
    function createBrachBasedOnRow(sh, wiersz) {
    	arr = [];
    	
    	
    	
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



    	
    	
    	
    	let filterOnFup = document.getElementById("wybierz-fupa").value;
    	let filterOnProj = document.getElementById("wybierz-proj").value.toUpperCase();
    	let filterOnFaza = document.getElementById("wybierz-faze").value.toUpperCase();
    	
    	
    	let ptrnProj = new RegExp( filterOnProj );
		let regExpByProj = ptrnProj.test( proj );
		
    	let ptrnFaza = new RegExp( filterOnFaza );
		let regExpByFaza = ptrnFaza.test( faza );


    	
    	if(((filterOnFup.trim() == "") || (filterOnFup.trim().toUpperCase() == fup.toUpperCase())) &&
    		((filterOnProj.trim() == "") || ( regExpByProj )) &&
    		((filterOnFaza.trim() == "") || ( regExpByFaza ))) { 
    	
    	
    	
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
	
	    	
	    	
	    	arr.push( plt );
	    	arr.push( resp );
	    	arr.push( fup );
	    	arr.push( proj );
	    	arr.push( faza );
	    	arr.push( mrd );
	    	arr.push( duns );
	    	
	    	
	    	return arr;
    	} else {
    		return null;
    	}
    }



});