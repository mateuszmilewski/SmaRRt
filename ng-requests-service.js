SmaRRt.factory("RequestsService", function () {





	let requests;
	let usr;
	let ss; // suppliers
	let wrk;
	let smaRRtData;
	
	let valid = {
		wizardStandards: false,
	};
	
	
	
	// empty var for foo-bar
	let innerCubeWizard = (obj) => {
	
		console.log("nie-schow wogule cubesHandler but in RequestsService", obj);
		// map-text-details
		document.getElementById("cubeModal").style.width = "1200px";
		document.getElementById("cubeModal").style.height = "600px";

		document.getElementById("cubeModal").style.overflow = "visible";
		document.getElementById("cubeModal").style.visibility = "visible";
	}

	
    
    function getRequests() {
    	return requests;
    }
    
    function setRequests(arg) {
    	requests = arg;
    }
    
	function getUsr() {
    	return usr;
    }
    
    function setUsr(arg) {
    	usr = arg;
    }
    
    function getSuppliers() {
    	return ss;
    }
    
    function setSuppliers(arg) {
    	ss = arg;
    }
    
    function getInputWorkbook() {
    	return wrk;
    }
    
    function setInputWorkbook(arg) {
    	wrk = arg;
    }
    
    
    function getValidWizardStd() {
    	return valid.wizardStandards;
    }
    
    function setValidWizardStd(arg) {
    	valid.wizard = arg;
    }
    
    
    function getSmarrtData() {
    	return smaRRtData;
    }
    
    function setSmarrtData(arg) {
    	smaRRtData = arg;
    }
    
    
  
    return {
        getFactoryRequests: getRequests,
        setFactoryRequests: setRequests,
        getFactorySuppliers: getSuppliers,
        setFactorySuppliers: setSuppliers,
        getFactoryUser: getUsr,
        setFactoryUser: setUsr,
        getFactoryInputWorkbook: getInputWorkbook,
        setFactoryInputWorkbook: setInputWorkbook,
        getFactoryValidWizardStandard: getValidWizardStd,
        setFactoryValidWizardStandard: setValidWizardStd,
        getDataForSmarrtForm: getSmarrtData,
        setDataForSmarrtForm: setSmarrtData,
        cubeWizard: innerCubeWizard,
    }
});


