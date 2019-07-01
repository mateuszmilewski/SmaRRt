SmaRRt.controller("PreSmarrtCtrl", function($scope, RequestsService) {


	$scope.preSmarrt = {};
	$scope.preSmarrt.popupIsVisible = false;
	$scope.preSmarrt.whichIndexVisible = -1;
	$scope.preSmarrt.activeFriend = -1;
	
	$scope.preSmarrt.friendsPopupIsVisible = false;
	$scope.preSmarrt.arrayOfDedicatedSmarrts = [];
	
	$scope.preSmarrt.name = "PreSmaRRt";
	
	$scope.preSmarrt.tree = treeMaker.tree;



	$scope.preSmarrt.getSmarrts = function( plt, resp, fup, proj, faza, mrd, duns ) {
	
		let tmpRR = $scope.preSmarrt.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns].RR;
		
		
		// console.log("PreSmarrtCtrl -> getSmarrts: ", tmpRR);
		
		if( !!(tmpRR) ) { 
			return tmpRR; 
		} else { 
			return [];	
		}
	}
	
	
	$scope.preSmarrt.arrowClicked = function(plt) {
		console.log("PreSmarrtCtrl -> arrow clicked -> show friends popup ", plt);
		
		$scope.preSmarrt.arrayOfDedicatedSmarrts = [];
		// $scope.preSmarrt.showFriendsPopup
		$scope.preSmarrt.friendsPopupIsVisible = true;
		
		
		$.when( loadRoomRequestsByPlantAndStatus(plt, 1) ).done( (data) => {
		
			setTimeout(function() {
				$scope.preSmarrt.arrayOfDedicatedSmarrts = data;
				console.log(data);
				$scope.$apply();
			}, 400);
		});
		
		
	}
	
	
	$scope.preSmarrt.onClickForFriend = function(indx, srrt) {
		console.log("onClickForFriend : ", indx, srrt); // OK
		
		$scope.preSmarrt.activeFriend = indx;
	}
	
	
	$scope.preSmarrt.showPopup = function(irr, indx) {
	
		//let tmpObj = JSON.stringify(irr);
		//console.log("JSON.stringify(irr): ", tmpObj, typeof tmpObj);
	
		$scope.preSmarrt.whichIndexVisible = indx;
		$scope.preSmarrt.popupIsVisible = true;
	}
	
	$scope.preSmarrt.showFriendsPopup = function() {
		$scope.preSmarrt.friendsPopupIsVisible = true;
	}

	
	$scope.preSmarrt.hidePopup = function(indx) {
		$scope.preSmarrt.whichIndexVisible = -1;
		$scope.preSmarrt.popupIsVisible = false;
	}
	
	$scope.preSmarrt.hideFriendsPopup = function() {
		$scope.preSmarrt.friendsPopupIsVisible = false;
	}

	
	
	$scope.preSmarrt.generateContentForPopup = function(irr, indx) {
	
		// in vannila.js	
		return generateContentForPreSmarrtComment(irr, indx);
	}
		
	
	$scope.preSmarrt.makeStringFromSmarrtObj = function(obj) {
		
		// JSON.stringify(obj);
		
		let o = {
			ID: obj.ID,
			NM: obj.FMA.SupplierName,
			DUNS: obj.FMA.DUNS
		}
		
		// not really pretty
		//return JSON.stringify(o);
		return "id: " + obj.ID + ", duns: " + obj.FMA.DUNS + " # " + obj.FMA.SupplierName;
	}
	
	
	
	$scope.preSmarrt.submitFriend = function() {
		
		console.log("preSmarrt.submitFriend and hide");
		$scope.preSmarrt.friendsPopupIsVisible = false;
		
	}
	
	$scope.preSmarrt.justCloseThisFormWithoutAnyAction = function() {
		console.log("preSmarrt.justCloseThisFormWithoutAnyAction");
		$scope.preSmarrt.friendsPopupIsVisible = false;

	}

	
	
	
	
});
