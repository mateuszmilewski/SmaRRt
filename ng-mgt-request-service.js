MgtSmaRRt.factory("RequestsService", function () {

	let rr;
	let rrArr;
	let bottomSmarrtListVisible = false;
	
	function getArrayOfRR() {
		return rrArr;
	}
	
	function setArrayOfRR(arg) {
		rrArr = arg;
	}
	
	
	function getBottomSmarrtListVisible() {
		return bottomSmarrtListVisible;
	}
	
	
	function setBottomSmarrtListVisible(b) {
		bottomSmarrtListVisible = b;
	}

	
	
	return {
      getFactoryArrayOfRR: getArrayOfRR,
      setFactoryArrayOfRR: setArrayOfRR,
      getFactoryBottomSmarrtListVisible: getBottomSmarrtListVisible,
      setFactoryBottomSmarrtListVisible: setBottomSmarrtListVisible,

	};
	
});