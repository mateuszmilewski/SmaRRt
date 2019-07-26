SmaRRt.controller("ClipboardHandlerCtrl", function($scope, RequestsService) {


	// clip-board-handler 'acro'
	$scope.cbh = {};
	$scope.cbh.clipboardEmpty = true;
	$scope.cbh.clipboardNotEmpty = false;
	
	$scope.cbh.showDetails = () => {
		// console.log("ClipboardHandlerCtrl -> showDetails ");
	}
	
	
	
	$scope.$watch(() => {
		return RequestsService.getFactoryClipboardForSmarrtFormData();
	}, (clipboardDataFromRequestsService) => {
	
		console.log("watch in clipboard handler: ", clipboardDataFromRequestsService);
		
		
		if( !!(clipboardDataFromRequestsService) ) {
			$scope.cbh.clipboardEmpty = false;
			$scope.cbh.clipboardNotEmpty = true;

		}
		
	});
});