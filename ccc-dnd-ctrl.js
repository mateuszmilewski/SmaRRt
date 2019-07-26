Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var dnd = angular.module("dnd", ["ngRoute", "ngAnimate"]);

dnd.run(function ($rootScope, RequestsService) {
    // console.log($rootScope);
});

dnd.controller("mainCtrl", function ($scope, RequestsService) {



		

    $scope.main = {};
		$scope.main.cccin = {
			routeAvailable: "",
			route: "",
			carrierCodeOrName: "",
			pickupDate: "",
			deliveryDate: "",
			rdcDate: "",
			rdcCode: "",
			customsMaterial: false,
			typeOfService: "",
			PTA: false,
			ptaCost: "",
			xtraComments: ""
		}
    
    $scope.main.wIter = 0;
    $scope.main.showSupplierDetails = false;
    $scope.main.showFMADestails = false;
    $scope.main.G_ID = G_ID;
    
    $scope.main.toggleShowSupplierDetails = function() {
    	$scope.main.showSupplierDetails = !($scope.main.showSupplierDetails);
    }
    
    $scope.main.toggleShowFMADetails = function() {
    	$scope.main.showFMADetails = !($scope.main.showFMADetails);
    	
    	
    }
    
    $scope.main.hideAllDetails = function() {
    	$scope.main.showSupplierDetails = false;
    	$scope.main.showFMADetails = false;
    	
    }


    $scope.main.nm = "MAIN";
    $scope.main.txtElement = "txtElement";
    
    
    let refreshIntervalId = setInterval(function() {
    	
    	if( !!(G_EXTERNAL_DATA) ) {
    		if( G_EXTERNAL_DATA.length == 0 ) {
    			console.log("empty... waiting for requests...");
    			
    		} else {
    			clearInterval(refreshIntervalId);
    			
    			$scope.main.coll = G_EXTERNAL_DATA;
    			$scope.main.filteredColl = G_EXTERNAL_DATA;
    			
    			$scope.main.inWorkbench = [];
    			console.log(" $scope.main.coll = G_EXTERNAL_DATA : ", G_EXTERNAL_DATA );
    			$scope.$apply();
    			
    			
    			
 					setTimeout(function() {
        		document.getElementsByTagName("html")[0].style.visibility = "visible";
          	$("#loader1").hide();
        	}, 100);

    		}
    	} else {
    		console.log("no data... waiting for requests...");
    	}
    	
    	
    	$scope.main.wIter++;
    	
    	
 			if( $scope.main.wIter == 10 ) {
 				clearInterval(refreshIntervalId);
 				alert("critical timeout!");
 			}

    	
    }, 1000);



    $scope.main.addBox = function () {
        $scope.main.coll.push({
            id: ($scope.main.coll.length + 1),
            txt: "txtElement" + ($scope.main.coll.length + 2),
            status: 1,
        });
    }


    $scope.main.changeStatus = function () {
        $scope.main.inWorkbench.map(function (item) {
            item.status = 2;
        });
    }
    
    
    
    $scope.main.onChange = function() {
    
    	if( $scope.main.filterInput.length == 0 ) {
    		$scope.main.filteredColl = angular.copy( $scope.main.coll );
    	} else {
    	
    	
    		let filtr = $scope.main.filterInput;
    		let data = angular.copy( $scope.main.coll );
    	
    		if( filtr.indexOf(":") == -1 ) {
   				$scope.main.filteredColl = data.filter( (elementInData) => {
   					let ptrn = new RegExp( filtr );
   					return (ptrn.test(elementInData.FMA.SupplierName)); 
   				});
   			
   			} else {
   			
   				if( filtr.indexOf("CC: ") == 0 ) {
   				
   				
   					filtr = filtr.replace("CC: ","");
   					
    				$scope.main.filteredColl = data.filter( (elementInData) => {
    					let ptrn = new RegExp( filtr );
    					return (ptrn.test(elementInData.FMA.CC)); 
    				});

   				}
   				
   				
   				if( filtr.indexOf("CITY: ") == 0 ) {
   				
   				
   					filtr = filtr.replace("CITY: ","");
   					
    				$scope.main.filteredColl = data.filter( (elementInData) => {
    					let ptrn = new RegExp( filtr );
    					return (ptrn.test(elementInData.FMA.City)); 
    				});

   				}
   				
   				
   				if( filtr.indexOf("ADDRESS: ") == 0 ) {
   				
   				
   					filtr = filtr.replace("ADDRESS: ","");
   					
    				$scope.main.filteredColl = data.filter( (elementInData) => {
    					let ptrn = new RegExp( filtr );
    					return (ptrn.test(elementInData.FMA.Address)); 
    				});

   				}
   				
   				if( (filtr.indexOf("CW: ") == 0)  ) {
   				
   					filtr = filtr.replace("CW: ","");
   					
   					
   					
    				$scope.main.filteredColl = data.filter( (elementInData) => {   					
    					
    					
    					let tmpDateArr = elementInData.FMA.PossiblePickUp.split("T")[0].split("-");
    					let tmpDate = new Date( tmpDateArr[0], tmpDateArr[1], tmpDateArr[2] );
    					let weekNumberFromDate = (tmpDate).getWeek();
    					
    					// console.log("checking: cws: ", tmpDate, filtr, weekNumberFromDate);
    					
    					if(parseInt(weekNumberFromDate) == parseInt(filtr) ) {
    						return true;
    					} else {
    						return false;
    					}	
    				});
   				}
   				
   				
   				if( (filtr.indexOf("DCW: ") == 0)  ) {
   				
   					filtr = filtr.replace("DCW: ","");
   					
   					
   					
    				$scope.main.filteredColl = data.filter( (elementInData) => {   					
    					
    					
    					let tmpDateArr = elementInData.FMA.DeadlineInPlant.split("T")[0].split("-");
    					let tmpDate = new Date( tmpDateArr[0], tmpDateArr[1], tmpDateArr[2] );
    					let weekNumberFromDate = (tmpDate).getWeek();
    					
    					// console.log("checking: cws: ", tmpDate, filtr, weekNumberFromDate);
    					
    					if(parseInt(weekNumberFromDate) == parseInt(filtr) ) {
    						return true;
    					} else {
    						return false;
    					}	
    				});
   				}

   			}
    	}
    	
    	// $scope.$apply(); // no need
    }
    
    
    $scope.main.form = {};
    $scope.main.form.submit = {};
    
    $scope.main.form.submit.changeStatus = function() {
    	console.log("Submit CCC feedack!");
    	
    	
    	let przyjaciele;
    	
    	
    	// also let arry = [ ...htmlCollection ]
    	console.log("ccc-in form input elements: ", Array.from(document.getElementsByClassName("ccc-in")));
    	console.log("or using directly models, main.cccin: ", $scope.main.cccin);
    	// console.log("List: ", document.getElementById("div-wrkbnch-area-1"));
    	let htmlColl = document.getElementById("div-wrkbnch-area-1").getElementsByTagName("div");
    	let jsArr = [...htmlColl];
    	
    	// jednak jsArr nie jest szacownie ostatecznym elementem ktory mnie interesuje
    	console.log("My jsArr list: ", jsArr);
    	
    	let suitableArr = [];
    	
    	let tmpIterator = 0;
    	jsArr.forEach( (item, indx) => {
    		
    		if( indx % 2 == 0 ) {
    			// 0, 2, 4...
    			suitableArr.push( { 
    				supplierName: item.innerText,
    				arr: [],
    			} );
    		} else {
    			// 1, 3, 5...
    			// really like this syntax...
    			console.log("js Arr item: ", indx, item.getElementsByTagName("td"));
    			
    			suitableArr[tmpIterator].arr = [...item.getElementsByTagName("td")];
    			tmpIterator++;
    		}
    		
    	});
    	
    	console.log("suitableArr for before-submit! : ", suitableArr );
    	
    	
    	if( !!(suitableArr) ) {
      	if( suitableArr.length > 0 ) {
      	
        	let firstElementFromSuitableArr = suitableArr[0];
        	console.log("firstElementFromSuitableArr arr 0 span 0 trim : ", firstElementFromSuitableArr.arr[0].getElementsByTagName("span").item(0).innerText.trim() );
        	console.log("firstElementFromSuitableArr arr  : ", firstElementFromSuitableArr.arr );
        	let forParentId = ("" + firstElementFromSuitableArr.arr[0].getElementsByTagName("span").item(0).innerText.trim());
        	// forParentId = forParentId.replace("ID:  ","");

        	
        	suitableArr.forEach( (suitEl) => {
        	
        	
        		
        		
        		let sajdi = ("" + firstElementFromSuitableArr.arr[0].getElementsByTagName("span").item(0).innerText.trim());
        		//sajdi = sajdi.replace("ID:  ","");
        		
        		let srrajdi = ("" + firstElementFromSuitableArr.arr[1].getElementsByTagName("span").item(0).innerText.trim());
        		// srrajdi = srrajdi.replace("RR_ID:  ","");
    
        		
        		cccFeedbackSmaRRt( $scope.main.cccin, sajdi, forParentId );
        		
        		
        		console.log("ddd -> sajdi : ", sajdi );
        		
        		
        		
      			$.when(loadLightFriendsById(sajdi)).done(function(data) {     	
      				przyjaciele = data;        	       
      				console.log("przyjaciele : ", przyjaciele );
      				
        			przyjaciele.forEach( (f) => {
        				cccFeedbackFriend( f.ID, forParentId ); 
        			});
        			
        			
        			location.reload();
    
      			});
    
        		
        	});
        } else {
        	console.log("suitableArr is: ", suitableArr);
        }
      } else {
      	console.log("suitableArr is: ", suitableArr);
      }    	

    	
    }
    
    
    


});


dnd.factory("RequestsService", function () {
    return null;
});
