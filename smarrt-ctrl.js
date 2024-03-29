﻿SmaRRt.controller("SmarrtCtrl", function($scope, RequestsService) {


	$scope.smarrt = {};
	$scope.smarrt.name = "SmaRRt";
	
	$scope.smarrt.tree = treeMaker.tree;
	$scope.smarrt.test;
	
	$scope.smarrt.clipboard = {};
	
	
	$scope.smarrt.copyToClipboard = function(plt, resp, fup, proj, faza, mrd, duns) {

		let fromFormObj = $scope.smarrt.tree[plt][resp][ fup][ proj][faza][mrd][duns];		
		console.log("copyToClipboard : ", fromFormObj ); // OK
		
		if( !!(fromFormObj.RR[0]) ) {
			let currRR = fromFormObj.RR[0];
			$scope.smarrt.clipboard = currRR.FMA;
			RequestsService.setFactoryClipboardForSmarrtFormData( angular.copy( $scope.smarrt.clipboard ) );
			console.log("$scope.smarrt.clipboard: ", $scope.smarrt.clipboard);
			
			
			//
			let tmpDiv = document.getElementById("clipboard-yellow-icon");
			let i = tmpDiv.getElementsByTagName("i")[0];
			
			if( i.classList.contains("fa-clipboard") ) {
				i.classList.remove("far", "fa-clipboard");
			}
			
			if( !( i.classList.contains("fa-clipboard-check") ) ) {
				i.classList.add("fas", "fa-clipboard-check");
			}
			
			
			//if( tmpDiv.classList.contains("animation-for-clipboard-yellow-icon") ) {
			//	tmpDiv.classList.remove("animation-for-clipboard-yellow-icon");
			//}
			
			// ng-class="{'fas fa-clipboard-check fa-3x': (cbh.clipboardNotEmpty), 'far fa-clipboard fa-3x': (cbh.clipboardEmpty)}"
			
			tmpDiv.classList.add("animation-for-clipboard-yellow-icon");
			
			let cl = tmpDiv.cloneNode(true);
			tmpDiv.parentNode.replaceChild(cl, tmpDiv);
			//
			
		} else {
			$scope.smarrt.clipboard = {};
		}
	}
	
	$scope.smarrt.pasteFromClipboard = function(plt, resp, fup, proj, faza, mrd, duns) {
	
		let fromFormObj = $scope.smarrt.tree[plt][resp][ fup][ proj][faza][mrd][duns];	
		let currRR = fromFormObj.RR[0];
		// currR = $scope.smarrt.clipboard;
		// nie chcemy aby ewentualne edycja w formie miala wplyw na to co znajduje sie w clipboardzie :)
		currRR.FMA = angular.copy(RequestsService.getFactoryClipboardForSmarrtFormData());
		console.log("avail data: ", currRR.FMA);
		
		// $scope.$apply();
		
	}
	
	$scope.smarrt.sd;
	
	
    $scope.$watch( 
    	function() {
    		return RequestsService.getDataForSmarrtForm();
    	}, 
    	function(smarrtData) {
    		// console.log(" SmarrtCtrl: watched smarrt data:  " , smarrtData );
	    	if( !!(smarrtData) ) {
	    		if( !!(smarrtData.x) ) {
	    			$scope.smarrt.test = smarrtData.x[0].name;
	    			$scope.smarrt.sd = smarrtData;	    			
	    		} else {
	    			$scope.smarrt.test = "";
	    			$scope.smarrt.sd = null;
	    		}
	    	}
    	}
    );
    
    
    $scope.smarrt.moveInsideArray = function(plt, resp, fup, proj, faza, mrd, duns) {
    	let fromFormObj = $scope.smarrt.tree[plt][resp][ fup][ proj][faza][mrd][duns];
    	
    	if( !!(fromFormObj.sharepoint) ) {
    		
    		let ostatniElement = fromFormObj.sharepoint.pop();
    		fromFormObj.sharepoint.unshift( ostatniElement );
    		// $scope.$apply();
    	}
    }
    
    $scope.smarrt.dimWizard = function(plt, resp, fup, proj, faza, mrd, duns) {
    	console.log("inside: dimWizard ");
    	
    	let fromFormObj = $scope.smarrt.tree[plt][resp][ fup][ proj][faza][mrd][duns];
       	RequestsService.setDataForSmarrtForm( $scope.smarrt.sd );
    	RequestsService.cubeWizard(fromFormObj);
    }
    
    
	
	$scope.smarrt.submitSmaRRtNew = (plt, resp, fup, proj, faza, mrd, duns, ktoryDostawca) => {

		
		let fromFormObj = $scope.smarrt.tree[plt][resp][ fup][ proj][faza][mrd][duns];
		
		
		
		
		console.log("SmaRRt submitting on: ", fromFormObj ); // OK
		
		if( !!(fromFormObj.sharepoint.length > 0) ) {
		
			// taka implementacja jest OK z perspektywy, gdy RR jest tylko jeden
			// let currRR = fromFormObj.RR;
		
			let currRR = fromFormObj.RR[0];
		
		
			currRR.STATUS = 1;
		
		
  		// ktoryDostawca - zawsze zero - i to mi sie podoba :D
  		let wybranyDostawca = fromFormObj.sharepoint[ktoryDostawca];
  		console.log(" $scope.smarrt.submitSmaRRtNew -> wybranyDostawca : ", wybranyDostawca );
		
  		// jesli wpis jest nowy tj. jesi dostawca zostal stworzony ad hoc, to fajnie by bylo od razu tez dodac go do bazy
  		//
  		//
  		if( !!(wybranyDostawca.source) ) {
  			if( wybranyDostawca.source == "NEW" ) {
  				if( fromFormObj.addNewSupplierQ ) {
  				
  					let newSupplierObject = {
  						FU: fup,
  						DUNS: wybranyDostawca.DUNS,
  						SupplierName: wybranyDostawca.Supplier,
  						Address: wybranyDostawca.Address,
  						City: wybranyDostawca.City,
  						ZIP: wybranyDostawca.ZIP,
  						CC: wybranyDostawca.CC,
  						Latitude: wybranyDostawca.lat,
  						Longitude: wybranyDostawca.lng,
  						placeid: wybranyDostawca.placeid,
  						comment: "Google Maps contribution",
  						Phone: wybranyDostawca.Phone,
  					};
  	
  					
  					addSupplier(newSupplierObject);
  				}
  				
  			}
  		}
  		//
  		//
		
		
		
  		// info dla CCC
  		//
  		//
  			
  		let obj = {};
		
  		// ID Title
  		obj.ID = fromFormObj.id;
  		obj.STATUS = currRR.STATUS;
  		
  		// new
  		obj.plt = plt;
  		obj.resp = resp;
  		obj.fup = fup;
  		obj.proj = proj;
  		obj.faza = faza;
  		obj.mrd = mrd;
  		
  		
  		
  		obj.SupplierName = wybranyDostawca.Supplier;
  		obj.DUNS = wybranyDostawca.DUNS;
  		obj.CC = wybranyDostawca.CC;
  		obj.City = wybranyDostawca.City;
  		obj.Address = wybranyDostawca.Address;
  		obj.ZIP = wybranyDostawca.ZIP;

		
		
  		// rest of fields
  		obj.Possible_x0020_Pickup_x0020__x00 = currRR.FMA.PossiblePickUp;
  		obj.Packaging = currRR.FMA.Packaging ;
  		obj.Dimensions = currRR.FMA.Dim;
  		obj.NumberOfContainers = currRR.FMA.NumberOfContainers;
  		obj.Weight = currRR.FMA.Weight;
  		obj.Stackable = currRR.FMA.Stackable;
  		obj.HazardousGoods = currRR.FMA.HazardousGoods;
  		obj.SuggestedRoute = currRR.FMA.SuggestedRoute;
  		obj.DeadlineInPlant = currRR.FMA.DeadlineInPlant;
  		obj.FMA_REMARKS = currRR.FMA.FMA_Remarks;
  
  		
  		// console.log("DDD DDD DDD before addSmaRRt: ", obj.DeadlineInPlant, currRR);
		
  		
  		// lat lng
  		obj.lat = wybranyDostawca.lat;
  		obj.lng = wybranyDostawca.lng;
  		obj.placeid = wybranyDostawca.placeid;
  		
  		
    		
    	console.log(" $scope.smarrt.submitSmaRRtNew -> obj: ", obj );
  		
  		console.log(" assert for dates: curr: ", currRR.FMA.PossiblePickUp, currRR.FMA.DeadlineInPlant, " obj: ", obj.DeadlineInPlant, obj.Possible_x0020_Pickup_x0020__x00);
  		
  		
  		if( isNaN( currRR.FMA.Weight) || isNaN(currRR.FMA.NumberOfContainers) ) {
  		
  			alert("Nie można dodać tego SmaRRta! Brak wartości liczbowych dla wagi oraz ilości kontenerów!");
  		} else if( !!!(currRR.FMA.PossiblePickUp) ) {
  		
  			alert("PossiblePickUp ma niepoprawny format!");
  		} else if( !!!(currRR.FMA.DeadlineInPlant) ) {
  			
  			alert("DeadlineInPlant ma niepoprawny format!");
  		} else {
  		
  			addSmaRRt(obj);
  		}
  		
  		//
  		//
  		//
  	} else {
  		alert("Brak danych dostawcy - nie mozna dodac SmaRRta!");
  	}
	}
});
