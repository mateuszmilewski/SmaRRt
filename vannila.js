// for pre-smarrt-ctrl

function generateContentForPreSmarrtComment(irr, indx) {

	//let tmpObj = JSON.stringify(irr, undefined, 2);		
	let tmpObj = {
		ID: irr.ID,
		ST: irr.STATUS
	};
	
	let fmaStr = JSON.stringify(irr.FMA);
	let cccStr = JSON.stringify(irr.CCC);
	let txt = JSON.stringify(tmpObj);
	
	// console.log(txt, fmaStr, cccStr);
	
	
	let tmpObjStr = "" + txt + " FMA: " + fmaStr + " CCC:" + cccStr;
	return tmpObjStr;
}