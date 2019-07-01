// QuickStatsCtrl -> stats & quick valid on wizard standards
SmaRRt.controller("QuickStatsCtrl", function($scope, RequestsService) {


	$scope.workArea = "";
	
	// init as false
	$scope.validWizardStandard = RequestsService.getFactoryValidWizardStandard();
	
	
    $scope.$watch( 
    	function() {
    		return RequestsService.getFactoryInputWorkbook();
    	}, 
    	function(calyDuzyWorkbook) {
    	
    		if( !!(calyDuzyWorkbook) ) {
    	
    			$scope.workArea = calyDuzyWorkbook.Sheets["sharepoint_input"]['!ref'];
    			
    			
    			// to jest tylko test sprawdzajacy czy podrzucenie tego obiektu pod JSON'a doda np. properties dodatkowe - jako sie okazalo, ze ni...
    			//let tmpJSON = JSON.parse( JSON.stringify( calyDuzyWorkbook.Sheets["sharepoint_input"] ) );
    			//console.log( "tmpJSON.keys: ", tmpJSON.A1);
    			
    			
    			// szybki wizard validation
    			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    			
    			console.log("Walidacja w QuickStatsCtrl");
    			
    			// pierwsze kolumny odpowiedzialne za dane w arkuszach DETAILS
    			
    			let sh = calyDuzyWorkbook.Sheets["sharepoint_input"];
    			
    			let wynikFiltrowania = G_WIZARD_DETAILS_LABELS_ADDRESS.filter( (e,i) => {
    				
    				return( sh[e].v != G_WIZARD_DETAILS_LABELS[i] );
    				
    			});
    			
    			if( wynikFiltrowania.length == 0 ) {
    				console.log("DETAILS std NOK! wynikFiltrowania: ", wynikFiltrowania);
    				console.log("DETAILS std OK! wynikFiltrowania: ", wynikFiltrowania);
    				
    				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    				
					wynikFiltrowania = G_WIZARD_MASTER_LABELS_ADDRESS.filter( (e,i) => {
						return( sh[e].v.trim() != G_WIZARD_MASTER_LABELS[i].trim() );
					});
					
					if( wynikFiltrowania.length == 0 ) {
					
						console.log("MASTER std OK! wynikFiltrowania: ", wynikFiltrowania);
						
						// pelen sukces
						$scope.validWizardStandard = true;
						RequestsService.setFactoryValidWizardStandard(true);
						
					} else {
						console.log("MASTER std NOK! wynikFiltrowania: ", wynikFiltrowania);
						alert("brak dopasowania - brak zachowanego standardu - plik extended zostal niepoprawnie utworzony na poziomie MASTER");
					}

    			
    				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    			} else {
    				alert("brak dopasowania - brak zachowanego standardu - plik extended zostal niepoprawnie utworzony juz na poziomie DETAILS");
    			}
    			
    			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    		} else {
    			$scope.workArea = "NO DATA!";
    		}
    		
    	}
    );

});