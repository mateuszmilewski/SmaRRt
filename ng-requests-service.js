SmaRRt.factory("RequestsService", function () {





	let requests;
	let usr;
	let ss; // suppliers
	let wrk;
	let smaRRtData;
	let spi;
	
	
	let clipboardForSmarrtFormData;
	
	
	let bottomSmarrtListVisible = false;
	
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
	
	
	
	function getBottomSmarrtListVisible() {
		return bottomSmarrtListVisible;
	}
	
	
	function setBottomSmarrtListVisible(b) {
		bottomSmarrtListVisible = b;
	}
	
	function getClipboardForSmarrtFormData() {
		return clipboardForSmarrtFormData;
	}
	
	
	function setClipboardForSmarrtFormData (cb) {
		clipboardForSmarrtFormData = cb;
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
  
  
  function setSpi(arg) {
  	spi = arg;
  }
  
  function getSpi() {
  	return spi;
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
      getFactoryBottomSmarrtListVisible: getBottomSmarrtListVisible,
      setFactoryBottomSmarrtListVisible: setBottomSmarrtListVisible,
      getFactoryClipboardForSmarrtFormData: getClipboardForSmarrtFormData,
      setFactoryClipboardForSmarrtFormData: setClipboardForSmarrtFormData,
      setFactorySpi: setSpi,
      getFactorySpi: getSpi,
  }
});


