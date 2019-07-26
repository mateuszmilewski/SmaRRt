SmaRRt.controller("MapCtrl", function($scope, RequestsService) {


	$scope.mapHandler = {};
	$scope.mapHandler.currentSmarrtData;



    $scope.$watch( 
    	function() {
    		return RequestsService.getDataForSmarrtForm();
    	}, 
    	function(smarrtData) {
	    	if( !!(smarrtData) ) {
	    		if( !!(smarrtData.x) ) {
	    			$scope.mapHandler.currentSmarrtData = smarrtData;	    			
	    		}
	    	}
    	}
    );
    
    
    
  	document.getElementById("outer-map").style.height = "0px";
		document.getElementById("outer-map").style.width = "0px";
		document.getElementById("outer-map").style.overflow = "hidden";
		
		document.getElementById("nie-schow").style.height = "50px";
		document.getElementById("nie-schow").style.width = "100px";
		document.getElementById("nie-schow").style.overflow = "auto";



  
  	// hide all
  	$scope.schow = () => {
  	
  		console.log("schow wogule ");
  		// map-text-details
  		document.getElementById("outer-map").style.height = "0px";
  		document.getElementById("outer-map").style.width = "0px";
  		document.getElementById("outer-map").style.overflow = "hidden";
  		
  		document.getElementById("nie-schow").style.height = "50px";
  		document.getElementById("nie-schow").style.width = "100px";
  		document.getElementById("nie-schow").style.overflow = "auto";
  
  
  	}
  	
  	$scope.nieSchow = () => {
  	
  		console.log("nie-schow wogule ");
  		// map-text-details
  		document.getElementById("outer-map").style.height = "800px";
  		document.getElementById("outer-map").style.width = "500px";
  		document.getElementById("outer-map").style.overflow = "visible";
  		
  		document.getElementById("nie-schow").style.height = "0px";
  		document.getElementById("nie-schow").style.width = "0px";
  		document.getElementById("nie-schow").style.overflow = "hidden";
  
  
  	}



  
  	$scope.minMapDetails = () => {
  		console.log("minMapDetails ");
  		// map-text-details
  		document.getElementById("map-text-details").style.height = "0px";
  		document.getElementById("map-text-details").style.width = "0px";
  		document.getElementById("map-text-details").style.overflow = "hidden";
  
  	}
  	$scope.maxMapDetails = () => {
  		console.log("maxMapDetails ");
  		document.getElementById("map-text-details").style.height = "400px";
  		document.getElementById("map-text-details").style.width = "400px";
  		document.getElementById("map-text-details").style.overflow = "auto";
  		document.getElementById("map-text-details").style.left = "0px";
  
  	}


	
	$scope.minMap = () => {
		console.log("minMap ");
		document.getElementById("map").style.height = "0px";
		document.getElementById("map").style.width = "0px";
		document.getElementById("map").style.left = "0px";
		
		console.log("maxMapDetails ");
		document.getElementById("map-text-details").style.height = "400px";
		document.getElementById("map-text-details").style.width = "400px";
		document.getElementById("map-text-details").style.overflow = "auto";
		document.getElementById("map-text-details").style.left = "0px";

	}
	
	$scope.maxMap = () => {
		console.log("maxMap ");
		document.getElementById("map").style.height = "500px";
		document.getElementById("map").style.width = "1000px";
		document.getElementById("map").style.left = "-500px";
		
		console.log("minMapDetails ");
		// map-text-details
		document.getElementById("map-text-details").style.height = "0px";
		document.getElementById("map-text-details").style.width = "0px";
		document.getElementById("map-text-details").style.overflow = "hidden";
		document.getElementById("map-text-details").style.left = "0px";

	}
	
	$scope.normMap = () => {
		console.log("normMap ");
		document.getElementById("map").style.height = "500px";
		document.getElementById("map").style.width = "500px";
		document.getElementById("map").style.left = "0px";
		
		console.log("minMapDetails ");
		// map-text-details
		document.getElementById("map-text-details").style.height = "0px";
		document.getElementById("map-text-details").style.width = "0px";
		document.getElementById("map-text-details").style.overflow = "hidden";
		document.getElementById("map-text-details").style.left = "0px";


	}
	
	
	$scope.mapAndDetails = () => {
		console.log("normMap and mapDetails");
		document.getElementById("map").style.height = "500px";
		document.getElementById("map").style.width = "500px";
		document.getElementById("map").style.left = "-500px";
		
		document.getElementById("map-text-details").style.height = "400px";
		document.getElementById("map-text-details").style.width = "400px";
		document.getElementById("map-text-details").style.overflow = "auto";


	}
	
	
	
	$scope.getDetailsFromPacInput = () => {
	
		let currRR;
		
		
		$scope.mapHandler.nm = "";
		// map-text-details-adr
		$scope.mapHandler.adr = "";
		$scope.mapHandler.vic = "";
		$scope.mapHandler.tel = "";
		$scope.mapHandler.placeid = "";
		$scope.mapHandler.lat = "";
		$scope.mapHandler.lng = "";
		$scope.mapHandler.url = "";
		$scope.mapHandler.photoLink = "#";
		
	
		if( !!($scope.mapHandler.currentSmarrtData) ) {
			currRR = $scope.mapHandler.currentSmarrtData;
		}
		
			
		if( !!(currRR) ) {
			
			console.log("MAPA CTRL IN getDetailsFromPacInput and get curr RR : ", currRR);
			console.log("pokaz guzik mapa: ",	G_PLACE );
			
			G_PLACE = G_AUTOCOMPLETE.getPlace();
		    G_MARKER = new google.maps.Marker({
		    	map: G_MAP,
		    	position: G_PLACE.geometry.location,
		    	title: G_PLACE.name
		  	});
		  	
			console.log( "place: ", G_PLACE );
		  	G_MAP.setCenter(G_PLACE.geometry.location);
		  	G_MARKER.setVisible(true);
		  	
		  	
		  	if( !!(G_PLACE.name) ) { $scope.mapHandler.nm = G_PLACE.name; }
		  	if( !!(G_PLACE.formatted_address) ) { $scope.mapHandler.adr = G_PLACE.formatted_address; }
		  	if( !!(G_PLACE.vicinity) ) { $scope.mapHandler.vic = G_PLACE.vicinity; }
		  	if( !!( G_PLACE.international_phone_number ) ) { $scope.mapHandler.tel = G_PLACE.international_phone_number; }
		  	if( !!( G_PLACE.place_id ) ) { $scope.mapHandler.placeid = G_PLACE.place_id; }
		  	if( !!( G_PLACE.geometry.location.lat() ) ) { $scope.mapHandler.lat = G_PLACE.geometry.location.lat(); }
		  	if( !!( G_PLACE.geometry.location.lng() ) ) { $scope.mapHandler.lng = G_PLACE.geometry.location.lng(); }
		  	if( !!( G_PLACE.url ) ) { $scope.mapHandler.url = G_PLACE.url; }

			
		} else {
			alert("Mapa nie jest aktualnie powiązana z żadnym Room Requestem!");
		}
		
	}
		
	
	$scope.mapHandler.updateSelectedSupplierFromMap = function() {
		// alert("aktualizacja danych dostawcy!");
		
		
		console.log("$scope.mapHandler.updateSelectedSupplierFromMap");
		console.log(" $scope.mapHandler.currentSmarrtData: ", $scope.mapHandler.currentSmarrtData);
		
		
		let daneX;
		let obj;
		
		if( !!($scope.mapHandler.currentSmarrtData) ) {
		
		
			if( !!($scope.mapHandler.currentSmarrtData.x) ) {
				if( $scope.mapHandler.currentSmarrtData.x.length > 0 ) {
				
					// very simple : just take data from first one
					daneX = { 
						duns: $scope.mapHandler.currentSmarrtData.x[0].data[2],
						supplier: $scope.mapHandler.currentSmarrtData.x[0].data[3],
					}
					
				}
			}
		
		
		
			if( !!($scope.mapHandler.currentSmarrtData.sharepoint) ) {
				if( $scope.mapHandler.currentSmarrtData.sharepoint.length > 0 ) {
				
					if( !!(daneX) ) {
						// daneX available
						//
						
						$scope.mapHandler.currentSmarrtData.sharepoint.unshift({
							Address: $scope.mapHandler.adr,
							City: $scope.mapHandler.vic,
							DUNS: daneX.duns,
							Supplier: $scope.mapHandler.nm,
							lat: $scope.mapHandler.lat,
							lng: $scope.mapHandler.lng,
							placeid: $scope.mapHandler.placeid,
							source: "NEW",
							Phone: $scope.mapHandler.tel,
						});
						
						obj = {
    						DUNS: daneX.duns,
    						SupplierName: $scope.mapHandler.nm,
    						Address: $scope.mapHandler.adr,
    						City: $scope.mapHandler.vic,
    						Phone: $scope.mapHandler.tel,
    						Latitude: $scope.mapHandler.lat,
    						Longitude: $scope.mapHandler.lng,
    						placeid: $scope.mapHandler.placeid,
    						comment: "Google Maps contribution",
						};
						// addSupplier(obj);

						//
						//
					} else {
						alert("Brak # części!");
					}
					
				} else {
					// jest zero
					//
					
					// length == 0 
					$scope.mapHandler.currentSmarrtData.sharepoint = [];
					$scope.mapHandler.currentSmarrtData.sharepoint.push({
						Address: $scope.mapHandler.adr,
						City: $scope.mapHandler.vic,
						DUNS: daneX.duns,
						Supplier: $scope.mapHandler.nm,
						lat: $scope.mapHandler.lat,
						lng: $scope.mapHandler.lng,
						placeid: $scope.mapHandler.placeid,
						source: "NEW",
						Phone: $scope.mapHandler.tel,
					});
					
					obj = {
						DUNS: daneX.duns,
						SupplierName: $scope.mapHandler.nm,
						Address: $scope.mapHandler.adr,
						City: $scope.mapHandler.vic,
						Phone: $scope.mapHandler.tel,
						Latitude: $scope.mapHandler.lat,
						Longitude: $scope.mapHandler.lng,
						placeid: $scope.mapHandler.placeid,
						comment: "Google Maps contribution",
					};
					
					//
					//
				}
			} else {
				// prop sharepoint nie istnieje!
				if( !!(daneX) ) {
				
					$scope.mapHandler.currentSmarrtData.sharepoint = [];
					
					$scope.mapHandler.currentSmarrtData.sharepoint.push({
						Address: $scope.mapHandler.adr,
						City: $scope.mapHandler.vic,
						DUNS: daneX.duns,
						Supplier: $scope.mapHandler.nm,
						lat: $scope.mapHandler.lat,
						lng: $scope.mapHandler.lng,
						placeid: $scope.mapHandler.placeid,
						source: "NEW",
						Phone: $scope.mapHandler.tel,
					});
					
					obj = {
						DUNS: daneX.duns,
						SupplierName: $scope.mapHandler.nm,
						Address: $scope.mapHandler.adr,
						City: $scope.mapHandler.vic,
						Phone: $scope.mapHandler.tel,
						Latitude: $scope.mapHandler.lat,
						Longitude: $scope.mapHandler.lng,
						placeid: $scope.mapHandler.placeid,
						comment: "Google Maps contribution",
					};
					
					// adding a new supplier during adding request to CCC
					// addSupplier(obj);

				} else {
				
					alert("Brak # części!");
				}
			}
		} else {
			alert("brak danych w ogole!");
		}
		
		
	}


});







