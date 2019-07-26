SmaRRt.controller("PreSmarrtCtrl", function($scope, RequestsService) {


	$scope.preSmarrt = {};
	$scope.preSmarrt.popupIsVisible = false;
	$scope.preSmarrt.whichIndexVisible = -1;
	$scope.preSmarrt.activeFriend = -1;
	
	$scope.preSmarrt.friendsPopupIsVisible = false;
	$scope.preSmarrt.arrayOfDedicatedSmarrts = [];
	$scope.preSmarrt.filteredArrayOfDedicatedSmarrts = [];
	
	$scope.preSmarrt.name = "PreSmaRRt";
	
	$scope.preSmarrt.tree = treeMaker.tree;
	$scope.preSmarrt.lastNode;
	$scope.preSmarrt.currentPath = {};
	$scope.preSmarrt.currentPath.PLT = '';
	$scope.preSmarrt.currentPath.RESP = '';
	$scope.preSmarrt.currentPath.FUP = '';
	$scope.preSmarrt.currentPath.PROJ = '';
	$scope.preSmarrt.currentPath.FAZA = '';
	$scope.preSmarrt.currentPath.MRD = '';
	$scope.preSmarrt.currentPath.DUNS = '';
	
	
	$scope.preSmarrt.friendsFilter = '';
	
	$scope.preSmarrt.friendsInputChanged = (function() {
	
		if( $scope.preSmarrt.friendsFilter != '' ) {
		
			let filtr = $scope.preSmarrt.friendsFilter;
  		let data = angular.copy($scope.preSmarrt.arrayOfDedicatedSmarrts);
  		$scope.preSmarrt.filteredArrayOfDedicatedSmarrts = data.filter( (elementInData) => {
  		
  			let ptrn = new RegExp( filtr );
  			return (ptrn.test(elementInData.FMA.SupplierName)); 
  		});
  		
  		
  		// $scope.$apply();
		
		} else {
			$scope.preSmarrt.filteredArrayOfDedicatedSmarrts = angular.copy($scope.preSmarrt.arrayOfDedicatedSmarrts);
		}
		
		console.log("in friendsInputChanged -> $scope.preSmarrt.arrayOfDedicatedSmarrts: ", $scope.preSmarrt.filteredArrayOfDedicatedSmarrts );
	});




	$scope.preSmarrt.getSmarrts = function( plt, resp, fup, proj, faza, mrd, duns ) {
	
		
		let tmpRR = $scope.preSmarrt.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns].RR;
		$scope.preSmarrt.currentPath.PLT = plt;
		$scope.preSmarrt.currentPath.RESP = resp;
		$scope.preSmarrt.currentPath.FUP = fup;
		$scope.preSmarrt.currentPath.PROJ = proj;
		$scope.preSmarrt.currentPath.FAZA = faza;
		$scope.preSmarrt.currentPath.MRD = mrd;
		$scope.preSmarrt.currentPath.DUNS = duns;
		$scope.preSmarrt.lastNode = $scope.preSmarrt.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
		
		
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
		
		
		$.when( loadRoomRequestsByPlantAndStatusWithoutFriends(plt, 1) ).done( (data) => {
		
			setTimeout(function() {
				$scope.preSmarrt.arrayOfDedicatedSmarrts = data;
				$scope.preSmarrt.filteredArrayOfDedicatedSmarrts = data;
				console.log("arrowClicked  -> data: ", data);
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
	
	
	
		console.log("$scope.preSmarrt.lastNode: ", $scope.preSmarrt.lastNode);
		
		if( !!($scope.preSmarrt.lastNode.sharepoint.length > 0) ) {
		
		
  		console.log("preSmarrt.submitFriend and hide");
  		$scope.preSmarrt.friendsPopupIsVisible = false;
  		
  		let indx = $scope.preSmarrt.activeFriend;
  		// console.log("DDD: ", indx, $scope.preSmarrt.arrayOfDedicatedSmarrts[indx]);
  	
    	/*
  
    		["RR_FIREND_ID", friend_ID],
    		["PLT", fullObject.plt],
    		["RESP", fullObject.resp],
    		["FUP", fullObject.fup],
    		["Project", fullObject.proj],
    		["FAZA", fullObject.faza],
    		["MRD", fullObject.mrd],
    		["Supplier_x0020_Name", fullObject.SupplierName],
    		["DUNS", fullObject.DUNS],
    		["FMA_REMARKS", "FRIEND"],
    		
    	*/
    	
    	let tmp = $scope.preSmarrt.arrayOfDedicatedSmarrts[indx];
    	console.log("ddd tmp, $scope.preSmarrt.arrayOfDedicatedSmarrts[indx];: ", tmp);
    	
    	
    	let fullObject = {}
    	
    	let friend_ID = tmp.ID;
    	
    	fullObject.ID = $scope.preSmarrt.lastNode.id;
    	fullObject.STATUS = 1;
    	fullObject.PLT = $scope.preSmarrt.currentPath.PLT;
    	fullObject.RESP = $scope.preSmarrt.currentPath.RESP;
    	fullObject.FUP = $scope.preSmarrt.currentPath.FUP;
    	fullObject.Project = $scope.preSmarrt.currentPath.PROJ;
    	fullObject.FAZA = $scope.preSmarrt.currentPath.FAZA;
    	fullObject.MRD = $scope.preSmarrt.currentPath.MRD;
    	fullObject.DUNS = $scope.preSmarrt.currentPath.DUNS;
    	fullObject.SupplierName = $scope.preSmarrt.lastNode.sharepoint[0].Supplier;
  
    	// in comment section by hard "FIREND"
    	
    	addFriend(fullObject, friend_ID);
    	// only one param because ID for parent is the same!
    	updateSmarrtFriendIdForParent( friend_ID );
    	
    	let tmpRR = $scope.preSmarrt.tree['' + fullObject.PLT]['' + fullObject.RESP]['' + fullObject.FUP]['' + fullObject.Project]['' + fullObject.FAZA]['' + fullObject.MRD]['' + fullObject.DUNS].RR;
    	console.log("DDD: tmpRR: ", tmpRR);
    	
  		tmpRR.push({
  			ID: fullObject.ID,
  			STATUS: 1,
  			FMA: {
  				FMA_Remarks: "FRIEND",
  			}
  		});
		
		
		
		} else {
			alert("Brak danych dostawcy!");
		}
		
		

		
	}
	
	$scope.preSmarrt.justCloseThisFormWithoutAnyAction = function() {
		console.log("preSmarrt.justCloseThisFormWithoutAnyAction");
		$scope.preSmarrt.friendsPopupIsVisible = false;

	}
	
	
	
	
	
	// PUS SECTION
	//
	//
	$scope.preSmarrt.PUS = {};
	$scope.preSmarrt.PUS.popupIsVisible = false;
	$scope.preSmarrt.PUS.innerTableVisible = false;
	$scope.preSmarrt.PUS.whichIndexVisible = -1;
	$scope.preSmarrt.PUS.submitBtnCaption = "Zatwierdź dane do danych dla nowego PUSa";
	$scope.preSmarrt.PUS.RR = null;
	$scope.preSmarrt.PUS.PusNumber = "";
	//$scope.preSmarrt.tree = treeMaker.tree;
	//$scope.preSmarrt.lastNode;

	
	
	$scope.preSmarrt.PUS.justCloseThisFormWithoutAnyAction = function() {
		$scope.preSmarrt.PUS.popupIsVisible = false;
	}
	
	
	
	
	
	
	// for MATRIX for JENNY
	
	$scope.preSmarrt.PUS.changeRRStatus = function(passedStatus) {
		
		console.log("$scope.preSmarrt.PUS.changeRRStatus, passed status: ", passedStatus);
		
		// narazie ta funkcja moze dzialac tylko dla zmiany statusu z 2 na 3
		if(passedStatus == 3) {
		
		
			let ajdi = $scope.preSmarrt.PUS.RR.ID;
			
			if( ajdi > 0 ) {
				changeSmaRRtStatusTo(passedStatus, ajdi);
				
				$scope.preSmarrt.PUS.RR.STATUS = 3;
				console.log("$scope.preSmarrt.PUS.RR: ",$scope.preSmarrt.PUS.RR);
				
			} else {
				alert("Cos nie tak z proba pobrania SmaRRt ID!");
				console.log("Cos nie tak z proba pobrania SmaRRt ID!");
			}
		
		} else {
			alert("Funkcja nie obsługuje takiej możliwości!");
		}
	}
	
	$scope.preSmarrt.PUS.submitPUS = function () {
		console.log("Submitting new PUS!");
		// $scope.preSmarrt.PUS.popupIsVisible = false;
		$scope.preSmarrt.PUS.innerTableVisible = !$scope.preSmarrt.PUS.innerTableVisible;
		
		if($scope.preSmarrt.PUS.innerTableVisible) {
			$scope.preSmarrt.PUS.submitBtnCaption = "Schowaj poniższą tabele...";	
			
			
			
			console.log("test: $scope.preSmarrt.PUS: ", $scope.preSmarrt.PUS );
			
			
			// make raw matrix
			
			$scope.preSmarrt.PUS.rawMatrix = [];
			$scope.preSmarrt.PUS.rawMatrix.push({
				col1: "GENERAL",
				col2: "X",
				col3: "PN",
				col4: "CQTY",
			});
			


			// create arr for first column in raw matrix
			let arrForFstCol = [
				$scope.preSmarrt.PUS.PusNumber,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].DUNS,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].Supplier,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].City,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].Address,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].Contact,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].Mail,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].Phone,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].ZIP,
				$scope.preSmarrt.PUS.leaf.sharepoint[0].CC,
				$scope.preSmarrt.PUS.RR.AID,
				$scope.preSmarrt.PUS.RR.Created,
				$scope.preSmarrt.PUS.RR.FAZA,
				$scope.preSmarrt.PUS.RR.FUP,
				$scope.preSmarrt.PUS.RR.ID,
				$scope.preSmarrt.PUS.RR.MRD,
				$scope.preSmarrt.PUS.RR.Modified,
				$scope.preSmarrt.PUS.RR.PLT,
				$scope.preSmarrt.PUS.RR.Project,
				$scope.preSmarrt.PUS.RR.RESP,
				$scope.preSmarrt.PUS.RR.RR_FRIEND_ID,
				$scope.preSmarrt.PUS.RR.RR_ID,
				$scope.preSmarrt.PUS.RR.RR_PARENT_ID,
				$scope.preSmarrt.PUS.RR.STATUS,
				$scope.preSmarrt.PUS.RR.CCC.CarrierCode,
				$scope.preSmarrt.PUS.RR.CCC.CustomsMaterial,
				$scope.preSmarrt.PUS.RR.CCC.DELIVERY_DATE,
				$scope.preSmarrt.PUS.RR.CCC.EstimatedCostForPTA,
				$scope.preSmarrt.PUS.RR.CCC.PickupDate,
				$scope.preSmarrt.PUS.RR.CCC.RDC_Code,
				$scope.preSmarrt.PUS.RR.CCC.RDC_Date,
				$scope.preSmarrt.PUS.RR.CCC.Route,
				$scope.preSmarrt.PUS.RR.CCC.RouteAvailable,
				$scope.preSmarrt.PUS.RR.CCC.ServiceType,
				$scope.preSmarrt.PUS.RR.FMA.Address,
				$scope.preSmarrt.PUS.RR.FMA.CC,
				$scope.preSmarrt.PUS.RR.FMA.COFOR,
				$scope.preSmarrt.PUS.RR.FMA.City,
				$scope.preSmarrt.PUS.RR.FMA.DUNS,
				$scope.preSmarrt.PUS.RR.FMA.DeadlineInPlant,
				$scope.preSmarrt.PUS.RR.FMA.Dim,
				$scope.preSmarrt.PUS.RR.FMA.FMA_Remarks,
				$scope.preSmarrt.PUS.RR.FMA.HazardousGoods,
				$scope.preSmarrt.PUS.RR.FMA.NumberOfContainers,
				$scope.preSmarrt.PUS.RR.FMA.Packaging,
				$scope.preSmarrt.PUS.RR.FMA.PossiblePickUp,
				$scope.preSmarrt.PUS.RR.FMA.Stackable,
				$scope.preSmarrt.PUS.RR.FMA.SuggestedRoute,
				$scope.preSmarrt.PUS.RR.FMA.SupplierName,
				$scope.preSmarrt.PUS.RR.FMA.Weight,
				$scope.preSmarrt.PUS.RR.FMA.ZIP,
			];
			
			
			// arr of part numbers for this pus
			let xD = $scope.preSmarrt.PUS.leaf.x
			
			let iterator = 0;
			let forCol1 = ".";
			xD.forEach( (xDelement) => {
			
				if( !!(xDelement.data[7]) ) {
				
					if( !!(arrForFstCol[iterator]) ) {
						forCol1 = arrForFstCol[iterator];
					} else {
						forCol1 = ".";
					}
			
    			$scope.preSmarrt.PUS.rawMatrix.push({
    				col1: forCol1,
    				col2: ".",
    				col3: xDelement.data[0],
    				col4: xDelement.data[6],
    			});
    			
    			iterator++;
  			
  			}

			});
			
			// iterator--;
			//
			while( iterator < arrForFstCol.length ) {
			
			
				if( !!(arrForFstCol[iterator]) ) {
					forCol1 = arrForFstCol[iterator];
				} else {
					forCol1 = ".";
				}

			
   			$scope.preSmarrt.PUS.rawMatrix.push({
   				col1: forCol1,
   				col2: ".",
   				col3: ".",
   				col4: ".",
   			});

				
				iterator++;
			}
			//	
			
			
			console.log("	preSmarrt.PUS.rawMatrix : ", 	$scope.preSmarrt.PUS.rawMatrix );
			
			
			// end if make raw matrix

			
			
			
			
		} else {
			$scope.preSmarrt.PUS.submitBtnCaption = "Zatwierdź dane do danych dla nowego PUSa";		
		}
	}
	
	
	$scope.preSmarrt.PUS.hideTable = function() {
		$scope.preSmarrt.PUS.innerTableVisible = false;
		
		if($scope.preSmarrt.PUS.innerTableVisible) {
			$scope.preSmarrt.PUS.submitBtnCaption = "Schowaj poniższą tabele...";	
		} else {
			$scope.preSmarrt.PUS.submitBtnCaption = "Zatwierdź dane do danych dla nowego PUSa";		
		}

	}
	
	
	
	
	$scope.preSmarrt.PUS.showPopup = function(irr, indx, plt, resp, fup, proj, faza, mrd, duns) {
		console.log("PUS.showPopup! ", irr, indx);
		
		
		let tmpDiv2, i2, cl2;
		
		if( irr.STATUS == 0 ) {
			//alert("Nie można wystawić PUSa dla zerowego statusu SmaRRta! Jedyny akceptowalny status to: 2, gdzie otrzymaliśmy feedback od CCC");
			
			console.log("Status: ", irr.STATUS, " to clipbaord irr.FMA: ", irr.FMA );
			

			// COPY TO CLIPBOARD
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
			
			tmpDiv2.classList.add("animation-for-clipboard-yellow-icon");
			
			cl2 = tmpDiv2.cloneNode(true);
			tmpDiv2.parentNode.replaceChild(cl2, tmpDiv2);
			//
			
			RequestsService.setFactoryClipboardForSmarrtFormData( angular.copy( irr.FMA ) );
			
			
		}	else if( irr.STATUS == 1 ) {
			//alert("Nie można wystawić PUSa dla nowo utworzonego SmaRRta! Jedyny akceptowalny status to: 2, gdzie otrzymaliśmy feedback od CCC");
			
			console.log("Status: ", irr.STATUS, " to clipbaord irr.FMA: ", irr.FMA );
			
			
			// COPY TO CLIPBOARD
			//
			tmpDiv2 = document.getElementById("clipboard-yellow-icon");
			i2 = tmpDiv2.getElementsByTagName("i")[0];
			
			if( i2.classList.contains("fa-clipboard") ) {
				i2.classList.remove("far", "fa-clipboard");
			}
			
			if( !( i2.classList.contains("fa-clipboard-check") ) ) {
				i2.classList.add("fas", "fa-clipboard-check");
			}
			
			
			//if( tmpDiv.classList.contains("animation-for-clipboard-yellow-icon") ) {
			//	tmpDiv.classList.remove("animation-for-clipboard-yellow-icon");
			//}
			
			// ng-class="{'fas fa-clipboard-check fa-3x': (cbh.clipboardNotEmpty), 'far fa-clipboard fa-3x': (cbh.clipboardEmpty)}"
			
			tmpDiv2.classList.add("animation-for-clipboard-yellow-icon");
			
			let cl2 = tmpDiv2.cloneNode(true);
			tmpDiv2.parentNode.replaceChild(cl2, tmpDiv2);
			//


			
			RequestsService.setFactoryClipboardForSmarrtFormData( angular.copy( irr.FMA ) );
			
			
		} else {
			$scope.preSmarrt.PUS.RR = irr
			
			
			console.log("$scope.preSmarrt.PUS.RR: ", $scope.preSmarrt.PUS.RR);
			
			
			if( (irr.ID == irr.RR_FRIEND_ID) || !!!(irr.RR_FRIEND_ID) ) {
			
				$scope.preSmarrt.PUS.whichIndexVisible = indx;
				$scope.preSmarrt.PUS.popupIsVisible = true;
				$scope.preSmarrt.PUS.PusNumber = "";
			
				$scope.preSmarrt.PUS.leaf = $scope.preSmarrt.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
			
				console.log("$scope.preSmarrt.PUS: ", $scope.preSmarrt.PUS);
			
			} else {
			
				// so we have some firend here -> there is a serious need to get him here now! :D
				//

				
				$.when(loadRootFriendsById( irr.RR_FRIEND_ID )).done(function (data) {
				
				
					let frriendArrayWithOneElement = data;
					console.log("frriendArrayWithOneElement : ", data );
					
					
  				// deep copy on CCC
  				$scope.preSmarrt.PUS.RR.CCC = angular.copy( frriendArrayWithOneElement[0].CCC );
  				
  				$scope.preSmarrt.PUS.whichIndexVisible = indx;
  				$scope.preSmarrt.PUS.popupIsVisible = true;
  				$scope.preSmarrt.PUS.PusNumber = "";
  			
  				$scope.preSmarrt.PUS.leaf = $scope.preSmarrt.tree['' + plt]['' + resp]['' + fup]['' + proj]['' + faza]['' + mrd]['' + duns];
  			
  				console.log("$scope.preSmarrt.PUS: ", $scope.preSmarrt.PUS);

				});
				

				

				
				
				//
			}
					
		}
		
	}
	
	
	
	
	$scope.preSmarrt.PUS.youClickedOnTable = function(duns) {
		let tmpStrId = "matrix-for-pus-data-in-jenny-" + duns;
		
		let myTable = document.getElementById(tmpStrId);
		
		
		console.log("youClickedOnTable : ", duns, tmpStrId, myTable);		
		
		// and usage!
		//selectElementContents(myTable);
		var $myTable = $("#" + tmpStrId);
		$myTable.select();
		$myTable.toggleClass("table-selected");
		
		console.log("$myTable: ", $myTable, " document.execCommand copy ");		
		document.execCommand('copy');
	}
	
	//
	//
	//

	
	
});
