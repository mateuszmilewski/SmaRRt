SmaRRt.controller("BottomSmarrtListCtrl", function($scope, RequestsService) {






	
	
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