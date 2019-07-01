function loadRoomRequestsByPlantAndStatus(mPlant, mStatus) {


	let site = G_URL_SITE;
    let RR = [];
    
    
    // tu run: loadRoomRequestsByPathArray("ZA","FMA","WM","P2JO","PRS EL1-5.1","Y2019CW20","991631");
    // example: //  /_api/web/lists/getbytitle('infolist')/items?$filter=( Modified le datetime'2016-03-26T09:59:32Z') and (ID eq 2)
    let tmpFilter = "&$filter=(PLT eq '" + mPlant + "')";
    tmpFilter = "" + tmpFilter + " and " + "(STATUS eq '" + mStatus + "')";
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
        data.d.results.forEach(function (item) {
        
            RR.push({
                RR_ID: item.Title,
                ID: item.ID,
                PLT: item.PLT,
                RESP: item.RESP,
                FUP: item.FUP,
                Project: item.Project,
                FAZA: item.FAZA,
                MRD: item.MRD,
                STATUS: item.STATUS,
                AID: item.AuthorId,
                Created: item.Created,
                Modified: item.Modified,
                
                MAP: {
                	LAT: item.MAP_LAT,
                	LNG: item.MAP_LNG,
                	PLACEID: item.MAP_PLACEID,
                },
                
                FMA: {
                	SupplierName: item.Supplier_x0020_Name,
                	DUNS: item.DUNS,
                	COFOR: item.COFOR,
                	Address: item.Address,
                	City: item.City,
                	ZIP: item.ZIP,
                	CC: item.CC,
                	PossiblePickUp: item.Possible_x0020_Pickup_x0020__x00,
                	Packaging: item.Packaging,
                	Dim: item.Dimensions,
                	NumberOfContainers: item.NumberOfContainers,
                	Weight: item.Weight,
                	Stackable: item.Stackable_x003f__x0020__x0028_Y_,
                	SuggestedRoute: item.SuggestedRoute,
                	DeadlineInPlant: item.DeadlineInPlant,
                	HazardousGoods: item.HazardousGoods,
                	FMA_Remarks: item.FMA_REMARKS
                },
                CCC: {
                	CarrierCode: item.CCC_CarrierCode,
                	CustomsMaterial: item.CCC_CustomsMaterial,
                	DELIVERY_DATE: item.CCC_DELIVERY_DATE,
                	EstimatedCostForPTA: item.CCC_EstimatedCostForPTA,
                	PickupDate: item.CCC_PickupDate,
                	RDC_Code: item.CCC_RDC_Code,
                	RDC_Date: item.CCC_RDC_Date,
                	Route: item.CCC_Route,
                	RouteAvailable: item.CCC_RouteAvailable,
                	ServiceType: item.CCC_ServiceType
                	
                }
            });

		});
    });

    return RR;


}


function loadRoomRequestsByPathArray(plt, resp, fup, proj, faza, mrd, duns) {


	let site = G_URL_SITE;
    let RR = [];
    
    
    // tu run: loadRoomRequestsByPathArray("ZA","FMA","WM","P2JO","PRS EL1-5.1","Y2019CW20","991631");
    // example: //  /_api/web/lists/getbytitle('infolist')/items?$filter=( Modified le datetime'2016-03-26T09:59:32Z') and (ID eq 2)
    let tmpFilter = "&$filter=(PLT eq '" + plt + "')";
    tmpFilter = "" + tmpFilter + " and " + "(RESP eq '" + resp + "')";
    tmpFilter = "" + tmpFilter + " and " + "(FUP eq '" + fup + "')";
    tmpFilter = "" + tmpFilter + " and " + "(Project eq '" + proj + "')";
    tmpFilter = "" + tmpFilter + " and " + "(FAZA eq '" + faza + "')";
    tmpFilter = "" + tmpFilter + " and " + "(MRD eq '" + mrd + "')";
    tmpFilter = "" + tmpFilter + " and " + "(DUNS eq '" + duns + "')";
    
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
        data.d.results.forEach(function (item) {
        
            RR.push({
                RR_ID: item.Title,
                ID: item.ID,
                PLT: item.PLT,
                RESP: item.RESP,
                FUP: item.FUP,
                Project: item.Project,
                FAZA: item.FAZA,
                MRD: item.MRD,
                STATUS: item.STATUS,
                AID: item.AuthorId,
                Created: item.Created,
                Modified: item.Modified,
                
                MAP: {
                	LAT: item.MAP_LAT,
                	LNG: item.MAP_LNG,
                	PLACEID: item.MAP_PLACEID,
                },
                
                FMA: {
                	SupplierName: item.Supplier_x0020_Name,
                	DUNS: item.DUNS,
                	COFOR: item.COFOR,
                	Address: item.Address,
                	City: item.City,
                	ZIP: item.ZIP,
                	CC: item.CC,
                	PossiblePickUp: item.Possible_x0020_Pickup_x0020__x00,
                	Packaging: item.Packaging,
                	Dim: item.Dimensions,
                	NumberOfContainers: item.NumberOfContainers,
                	Weight: item.Weight,
                	Stackable: item.Stackable_x003f__x0020__x0028_Y_,
                	SuggestedRoute: item.SuggestedRoute,
                	DeadlineInPlant: item.DeadlineInPlant,
                	HazardousGoods: item.HazardousGoods,
                	FMA_Remarks: item.FMA_REMARKS
                },
                CCC: {
                	CarrierCode: item.CCC_CarrierCode,
                	CustomsMaterial: item.CCC_CustomsMaterial,
                	DELIVERY_DATE: item.CCC_DELIVERY_DATE,
                	EstimatedCostForPTA: item.CCC_EstimatedCostForPTA,
                	PickupDate: item.CCC_PickupDate,
                	RDC_Code: item.CCC_RDC_Code,
                	RDC_Date: item.CCC_RDC_Date,
                	Route: item.CCC_Route,
                	RouteAvailable: item.CCC_RouteAvailable,
                	ServiceType: item.CCC_ServiceType
                	
                }
            });

		});
    });

    return RR;


}

function loadRoomRequests() {

	let site = G_URL_SITE;
    let RR = [];
    $.when(getAllListItemsSync(site, 'RoomRequests')).done(function (data) {
        data.d.results.forEach(function (item) {
        
        
        	// console.log("dbRest.js -> loadRoomRequests -> item: ", item);
        
            RR.push({
                RR_ID: item.RR_ID,
                ID: item.ID,
                PLT: item.PLT,
                RESP: item.RESP,
                FUP: item.FUP,
                Project: item.Project,
                FAZA: item.FAZA,
                MRD: item.MRD,
                STATUS: item.STATUS,
                AID: item.AuthorId,
                Created: item.Created,
                Modified: item.Modified,
                
                MAP: {
                	LAT: item.MAP_LAT,
                	LNG: item.MAP_LNG,
                	PLACEID: item.MAP_PLACEID,
                },
                
                FMA: {
                	SupplierName: item.Supplier_x0020_Name,
                	DUNS: item.DUNS,
                	COFOR: item.COFOR,
                	Address: item.Address,
                	City: item.City,
                	ZIP: item.ZIP,
                	CC: item.CC,
                	PossiblePickUp: "",
                	Dim: item.Dimensions,
                	NumberOfContainers: item.NumberOfContainers,
                	Weight: item.Weight,
                	Stackable: item.Stackable_x003f__x0020__x0028_Y_,
                	SuggestedRoute: item.SuggestedRoute,
                	DeadlineInPlant: item.DeadlineInPlant,
                	HazardousGoods: item.HazardousGoods,
                	FMA_Remarks: item.FMA_REMARKS
                },
                CCC: {
                	CarrierCode: item.CCC_CarrierCode,
                	CustomsMaterial: item.CCC_CustomsMaterial,
                	DELIVERY_DATE: item.CCC_DELIVERY_DATE,
                	EstimatedCostForPTA: item.CCC_EstimatedCostForPTA,
                	PickupDate: item.CCC_PickupDate,
                	RDC_Code: item.CCC_RDC_Code,
                	RDC_Date: item.CCC_RDC_Date,
                	Route: item.CCC_Route,
                	RouteAvailable: item.CCC_RouteAvailable,
                	ServiceType: item.CCC_ServiceType
                	
                }
            });
        });
    });

    return RR;
}



// added 2019-05-08
function loadRoomRequestsByPlt(plt) {

	let site = G_URL_SITE;
    let RR = [];
    
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', "&$filter=PLT eq '" + plt + "'")).done(function (data) {
        data.d.results.forEach(function (item) {
        
        
        	// console.log("dbRest.js -> loadRoomRequests -> item: ", item);
        
            RR.push({
                RR_ID: item.RR_ID,
                ID: item.ID,
                PLT: item.PLT,
                RESP: item.RESP,
                FUP: item.FUP,
                Project: item.Project,
                FAZA: item.FAZA,
                MRD: item.MRD,
                STATUS: item.STATUS,
                AID: item.AuthorId,
                Created: item.Created,
                Modified: item.Modified,
                
                MAP: {
                	LAT: item.MAP_LAT,
                	LNG: item.MAP_LNG,
                	PLACEID: item.MAP_PLACEID,
                },
                
                FMA: {
                	SupplierName: item.Supplier_x0020_Name,
                	DUNS: item.DUNS,
                	COFOR: item.COFOR,
                	Address: item.Address,
                	City: item.City,
                	ZIP: item.ZIP,
                	CC: item.CC,
                	PossiblePickUp: "",
                	Dim: item.Dimensions,
                	NumberOfContainers: item.NumberOfContainers,
                	Weight: item.Weight,
                	Stackable: item.Stackable_x003f__x0020__x0028_Y_,
                	SuggestedRoute: item.SuggestedRoute,
                	DeadlineInPlant: item.DeadlineInPlant,
                	HazardousGoods: item.HazardousGoods,
                	FMA_Remarks: item.FMA_REMARKS
                },
                CCC: {
                	CarrierCode: item.CCC_CarrierCode,
                	CustomsMaterial: item.CCC_CustomsMaterial,
                	DELIVERY_DATE: item.CCC_DELIVERY_DATE,
                	EstimatedCostForPTA: item.CCC_EstimatedCostForPTA,
                	PickupDate: item.CCC_PickupDate,
                	RDC_Code: item.CCC_RDC_Code,
                	RDC_Date: item.CCC_RDC_Date,
                	Route: item.CCC_Route,
                	RouteAvailable: item.CCC_RouteAvailable,
                	ServiceType: item.CCC_ServiceType
                	
                }
            });
        });
    });

    return RR;
}





function loadSuppliers() {

	let site = G_URL_SITE;
    let RR = [];
    $.when(getAllListItemsSync(site, 'RoomRequestSuppliers')).done(function (data) {
        data.d.results.forEach(function (item) {
        
        
        	//console.log("RoomRequestSuppliers -> item: ", item);
        	
            RR.push({
            	DUNS: item.Title,
            	Supplier: item.OData__x0068_ab5,
            	Address: item.ogxk,
            	City: item.bh8d,
            	CC: item.dc6a,
            	ZIP: item.mzze,
            	placeid: item.OData__x0069_d16,
            	ID: item.ID,
            	lat: item.a4tc,
            	lng: item.e0z9
            });
            
        });
    });

    return RR;
}

function loadSuppliersByDuns(duns) {

	let site = G_URL_SITE;
    let ssByDuns = [];
    
    /*
	$.when(getAllListItemsWithFilters(site, 'Emplyoee Details', 
	"&$filter=Employee eq " + currentUserSP.ID + "&
	$select=ID,MonthlyHO,Holiday,OvertimeLimit,OvertimeDaily,OvertimeMax,ChildrenCareHours,m0cy,
	MondayScheduleID,TuesdayScheduleID,WednesdayScheduleID,ThursdayScheduleID,FridayScheduleID,
	vxsy/Id,TimeAdmin/Id&$expand=vxsy/Id&$expand=TimeAdmin/Id")).done(function (data) {
	*/
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequestSuppliers', "&$filter=Title eq " + duns)).done(function (data) {
    
        data.d.results.forEach(function (item) {
        
        
        	console.log("loadSuppliersByDuns-> item: ", item);
        	
            ssByDuns.push({
            	DUNS: item.Title,
            	Supplier: item.OData__x0068_ab5,
            	Address: item.ogxk,
            	City: item.bh8d,
            	CC: item.dc6a,
            	ZIP: item.mzze,
            	placeid: item.OData__x0069_d16,
            	ID: item.ID,
            	lat: item.a4tc,
            	lng: item.e0z9
            });
            
        });
    });
    
    console.log("loadSuppliersByDuns in dbRest.js : ", ssByDuns);
    return ssByDuns;
}


function loadSuppliersByPlt(plt) {

	let site = G_URL_SITE;
    let ssByPlt = [];
    
    /*
	$.when(getAllListItemsWithFilters(site, 'Emplyoee Details', 
	"&$filter=Employee eq " + currentUserSP.ID + "&
	$select=ID,MonthlyHO,Holiday,OvertimeLimit,OvertimeDaily,OvertimeMax,ChildrenCareHours,m0cy,
	MondayScheduleID,TuesdayScheduleID,WednesdayScheduleID,ThursdayScheduleID,FridayScheduleID,
	vxsy/Id,TimeAdmin/Id&$expand=vxsy/Id&$expand=TimeAdmin/Id")).done(function (data) {
	*/
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequestSuppliers', "&$filter=PLT eq '" + plt + "'")).done(function (data) {
    
        data.d.results.forEach(function (item) {
        
        
        	console.log("loadSuppliersByDuns-> item: ", item);
        	
            ssByPlt.push({
            	DUNS: item.Title,
            	Supplier: item.OData__x0068_ab5,
            	Address: item.ogxk,
            	City: item.bh8d,
            	CC: item.dc6a,
            	ZIP: item.mzze,
            	placeid: item.OData__x0069_d16,
            	ID: item.ID,
            	lat: item.a4tc,
            	lng: item.e0z9
            });
            
        });
    });
    
    console.log("loadSuppliersByPlt in dbRest.js : ", ssByPlt);
    return ssByPlt;
}






function updateSupplier(itemFromMap) {



	console.log( "item from map ", itemFromMap);
	
	
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "RoomRequestSuppliers",
        valuepairs: [
        	["_x0068_ab5", itemFromMap.Supplier],
        	["_x0069_d16", itemFromMap.placeid],
        	["a4tc", itemFromMap.lat],
        	["e0z9", itemFromMap.lng]
        ],
        ID: itemFromMap.ID,
        completefunc: function (xData, Status) {
            console.log("Status: " + " " + Status);
            console.log("xData: ", xData);
        }
    });
	

}






function loadUser() {



    let currentUserSP = {};
    $.when(loadUserDetails(G_URL_SITE)).done(function (data) {
        //currentUserSP.Mail = data.d.Email;
        //currentUserSP.Name = data.d.Title;
        //currentUserSP.Login = data.d.LoginName;
        
        // check data
        // console.log("data from load user: ", data.d);
        currentUserSP.ID = data.d.Id;
        currentUserSP.mail = data.d.Email;
    	currentUserSP.login = data.d.LoginName;
    	currentUserSP.nm = data.d.Title;

		/*
        $.when(getAllListItemsWithFilters(site, 'RoomRequestsUser', "&$filter=Employee eq " + currentUserSP.ID + "&$select=ID,FupCode,Nm")).done(function (data) {
            data.d.results.forEach(function (item) {
            
            	console.log(item);
            
            });
        });
        */
        
        $.when(getAllListItemsWithFilters(G_URL_SITE, "RoomRequestsUsers", "&$filter=NmId eq " + currentUserSP.ID + "&$select=Title,NmId")).done(function (data2) {
            data2.d.results.forEach(function (item) {
            
            	// console.log("item from RoomRequestsUser: ", item);
            	currentUserSP.fupCode = item.Title;
            });
        });
    });
    
    return currentUserSP;
}







function addSmaRRt(fullObject) {




	console.log(" dbRest.js -> inside addSmaRRt ", fullObject);

    let valuepairs = [
		["Title", fullObject.ID],
		["RR_FIREND_ID", fullObject.ID],
		["STATUS", fullObject.STATUS],
		["PLT", fullObject.plt],
		["RESP", fullObject.resp],
		["FUP", fullObject.fup],
		["Project", fullObject.proj],
		["FAZA", fullObject.faza],
		["MRD", fullObject.mrd],
		["Supplier_x0020_Name", fullObject.SupplierName],
		["DUNS", fullObject.DUNS],
		["COFOR", ""],
		["Address", fullObject.Address],
		["City", fullObject.City],
		["ZIP", fullObject.ZIP],
		["CC", fullObject.CC],
		["Possible_x0020_Pickup_x0020__x00", fullObject.Possible_x0020_Pickup_x0020__x00],
		["Packaging", fullObject.Packaging],
		["Dimensions", fullObject.Dimensions],
		["NumberOfContainers", fullObject.NumberOfContainers],
		["Weight", fullObject.Weight],
		["Stackable_x003f__x0020__x0028_Y_", fullObject.Stackable],
		["SuggestedRoute", fullObject.SuggestedRoute],
		["DeadlineInPlant", fullObject.DeadlineInPlant],
		["FMA_REMARKS", fullObject.FMA_REMARKS],
		["MAP_LAT", fullObject.lat],
		["MAP_LNG", fullObject.lng],
		["MAP_PLACEID", fullObject.placeid],
	];
	

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "RoomRequests",
        valuepairs: valuepairs,
        completefunc: function (xData, Status) {
        
        
            console.log("SmaRRt added!", xData, Status);    
            // let tmpstr = xData.responseText;
            // console.log("xData.responseText: ", xData.responseText);
            
            alert("added SmaRRt completefunc: " + Status);
            
            
            
        }
    });


}


function addSupplier(fullObject) {




	console.log(" dbRest.js -> inside addSupplier ", fullObject);

    let valuepairs = [
    	["Title", fullObject.DUNS],
		["_x0068_ab5", fullObject.SupplierName],
		["ogxk", fullObject.Address],
		["bh8d", fullObject.City],
		["mzze", fullObject.ZIP],
		["dc6a", fullObject.CC],
		["jtdl", fullObject.Contact],
		["tayf", fullObject.Phone],
		["mbhe", fullObject.Mail],
		["jbez", fullObject.FU],
		["a4tc", fullObject.Latitude],
		["e0z9", fullObject.Longitude],
		["_x0069_d16", fullObject.placeid],
		["Comment", fullObject.comment],
		["PLT", fullObject.PLT],
	];
	

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "RoomRequestSuppliers",
        valuepairs: valuepairs,
        completefunc: function (xData, Status) {
        
        
            console.log("supplier added!", Status, xData);    
            // let tmpstr = xData.responseText;
            // console.log("xData.responseText: ", xData.responseText);
            
            alert("added supplier completefunc: " + Status);
            
            
            
        }
    });


}