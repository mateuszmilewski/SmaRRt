MgtSmaRRt.factory("RequestsService", function () {
	let rr;
	let rrArr;
	
	
	function getArrayOfRR() {
		return rrArr;
	}
	
	function setArrayOfRR(arg) {
		rrArr = arg;
	}
	
	
	return {
        getFactoryArrayOfRR: getArrayOfRR,
        setFactoryArrayOfRR: setArrayOfRR,
	};
	
});