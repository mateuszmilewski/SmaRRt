function loadLightFriendsById(ajdi) {
	let site = G_URL_SITE;
  let RR = [];
  
  
  console.log("in loadLightFriendsById ", ajdi);
  
   // let tmpFilter = "&$filter=(RR_FIREND_ID eq '" + ajdi + "')";
   //tmpFilter = "" + tmpFilter + " and " + "(FMA_REMARKS eq 'FRIEND')";
   //let tmpFilter = "&$filter=(FMA_REMARKS eq 'FRIEND')";
   // tmpFilter = "" + tmpFilter + " and (RR_FIREND_ID eq " + ajdi + ")";
   
   let tmpFilter = "&$filter=(RR_FIREND_ID eq " + ajdi + ")";
   
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
      data.d.results.forEach(function (item) {
        
         RR.push({
             ID: item.ID,
             RR_PARENT_ID: item.RR_PARENT_ID,
             RR_FRIEND_ID: item.RR_FIREND_ID
         });

			});
    });

    return RR;

}


function loadRootFriendsById(ajdi) {
	let site = G_URL_SITE;
  let RR = [];
  
  
  console.log("in loadRootFriendsById ", ajdi);
  
   // let tmpFilter = "&$filter=(RR_FIREND_ID eq '" + ajdi + "')";
   //tmpFilter = "" + tmpFilter + " and " + "(FMA_REMARKS eq 'FRIEND')";
   //let tmpFilter = "&$filter=(FMA_REMARKS eq 'FRIEND')";
   // tmpFilter = "" + tmpFilter + " and (RR_FIREND_ID eq " + ajdi + ")";
   
   let tmpFilter = "&$filter=(ID eq " + ajdi + ")";
   
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
      data.d.results.forEach(function (item) {
        
            RR.push({
                RR_ID: item.Title,
                ID: item.ID,
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
                }
            });

			});
    });

    return RR;

}



function loadRoomRequestsByStatusWithoutFriends(mStatus) {


	let site = G_URL_SITE;
    let RR = [];
    
    
    // tu run: loadRoomRequestsByPathArray("ZA","FMA","WM","P2JO","PRS EL1-5.1","Y2019CW20","991631");
    // example: //  /_api/web/lists/getbytitle('infolist')/items?$filter=( Modified le datetime'2016-03-26T09:59:32Z') and (ID eq 2)
    let tmpFilter = "&$filter=(STATUS eq '" + mStatus + "')";
    tmpFilter = "" + tmpFilter + " and " + "(FMA_REMARKS ne 'FRIEND')";
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
        data.d.results.forEach(function (item) {
        
            RR.push({
                RR_ID: item.Title,
                ID: item.ID,
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
                }
            });

			});
    });

    return RR;


}


function loadRoomRequestsByPlantAndStatusWithoutFriends(mPlant, mStatus) {


	let site = G_URL_SITE;
    let RR = [];
    
    
    // tu run: loadRoomRequestsByPathArray("ZA","FMA","WM","P2JO","PRS EL1-5.1","Y2019CW20","991631");
    // example: //  /_api/web/lists/getbytitle('infolist')/items?$filter=( Modified le datetime'2016-03-26T09:59:32Z') and (ID eq 2)
    let tmpFilter = "&$filter=(PLT eq '" + mPlant + "')";
    tmpFilter = "" + tmpFilter + " and " + "(STATUS eq '" + mStatus + "')";
    tmpFilter = "" + tmpFilter + " and " + "(FMA_REMARKS ne 'FRIEND')";
    
    $.when(getAllListItemsWithFiltersSync(site, 'RoomRequests', tmpFilter )).done(function (data) {
        data.d.results.forEach(function (item) {
        
            RR.push({
                RR_ID: item.Title,
                ID: item.ID,
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
                }
            });

		});
    });

    return RR;


}



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
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
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
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
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
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
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
                RR_PARENT_ID: item.RR_PARENT_ID,
                RR_FRIEND_ID: item.RR_FIREND_ID,
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
                	ServiceType: item.ServiceType,
                	CCC_XtraComment: item.CCC_XtraComment,
                	
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
            	lng: item.e0z9,
            	Contact: item.jtdl,
            	Phone: item.tayf,
            	Mail: item.mbhe
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
            	lng: item.e0z9,
            	Contact: item.jtdl,
            	Phone: item.tayf,
            	Mail: item.mbhe
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
            	lng: item.e0z9,
            	Contact: item.jtdl,
            	Phone: item.tayf,
            	Mail: item.mbhe
            });
            
        });
    });
    
    console.log("loadSuppliersByPlt in dbRest.js : ", ssByPlt);
    return ssByPlt;
}






function updateSupplier(item) {



	console.log( "item from map ", item);
	
	
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "RoomRequestSuppliers",
        valuepairs: [
        	["_x0068_ab5", item.Supplier],
        	["_x0069_d16", item.placeid],
        	["a4tc", item.lat],
        	["e0z9", item.lng],
      		["jtdl", item.Contact],
      		["tayf", item.Phone],
      		["mbhe", item.Mail],
        ],
        ID: item.ID,
        completefunc: function (xData, Status) {
            console.log("Status: " + " " + Status);
            console.log("xData: ", xData);
        }
    });
	

}


function loadSPI() {
	
	let toReturn = [];
	$.when( getAllFilenames(G_URL_SITE, "Documents") ).done( function(data) {
	  	
  	data.d.results.forEach( (item) => {
  		toReturn.push( item.FileLeafRef );
  	});
  	
  
	
	});
	
	return toReturn;
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



function addFriend(fullObject, friend_ID) {
	console.log(" dbRest.js -> inside addFriend ", fullObject, friend_ID );
	
	
	
	  let valuepairs = [
	  ["Title", fullObject.ID],
		["RR_FIREND_ID", friend_ID],
		["STATUS", fullObject.STATUS],
		["PLT", fullObject.PLT],
		["RESP", fullObject.RESP],
		["FUP", fullObject.FUP],
		["Project", fullObject.Project],
		["FAZA", fullObject.FAZA],
		["MRD", fullObject.MRD],
		["Supplier_x0020_Name", fullObject.SupplierName],
		["DUNS", fullObject.DUNS],
		["FMA_REMARKS", "FRIEND"],
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



function addSmaRRt(fullObject) {




	console.log(" dbRest.js -> inside addSmaRRt ", fullObject);

    let valuepairs = [
		["Title", fullObject.ID],
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


function changeSmaRRtStatusTo(rrstatus, ajdi) {
	console.log(" dbRest.js -> inside changeSmaRRtStatusTo(status): ", status);
	
	
	let valuepairs = [
		["STATUS", rrstatus],
	];
	
  $().SPServices({
      operation: "UpdateListItems",
      async: false,
      batchCmd: "Update",
      listName: "RoomRequests",
      valuepairs: valuepairs,
      ID: ajdi,
      completefunc: function (xData, Status) {
      
      
          console.log("feedback on friend ready!", xData, Status);    
          // let tmpstr = xData.responseText;
          // console.log("xData.responseText: ", xData.responseText);
          
          alert("feedback on friend ready, status: " + Status);
      }
  });

}


function updateSmarrtFriendIdForParent(friendID) {
	console.log(" dbRest.js -> inside updateSmarrtFriendIdForParent", friendID);
	
	let valuepairs = [
		["RR_FIREND_ID", friendID],
	];
	
	
  $().SPServices({
      operation: "UpdateListItems",
      async: false,
      batchCmd: "Update",
      listName: "RoomRequests",
      valuepairs: valuepairs,
      ID: friendID,
      completefunc: function (xData, Status) {
      
      
          console.log("feedback on friend id for parent ready!", xData, Status);    
          // let tmpstr = xData.responseText;
          // console.log("xData.responseText: ", xData.responseText);
          
          alert("feedback on friend id for parent ready, status: " + Status);
      }
  });


}


function cccFeedbackFriend(ajdi, parentID) {


	console.log(" dbRest.js -> inside cccFeedbackFriend ", ajdi);
	
	let valuepairs = [
		["STATUS", 2],
		["RR_PARENT_ID", parentID],
	];
	
  $().SPServices({
      operation: "UpdateListItems",
      async: false,
      batchCmd: "Update",
      listName: "RoomRequests",
      valuepairs: valuepairs,
      ID: ajdi,
      completefunc: function (xData, Status) {
      
      
          console.log("feedback on friend ready!", xData, Status);    
          // let tmpstr = xData.responseText;
          // console.log("xData.responseText: ", xData.responseText);
          
          // alert("feedback on friend ready, status: " + Status);
      }
  });

}




function cccFeedbackSmaRRt(fullObject, ajdi, parentID) {


	// cccFeedbackSmaRRt jest mocno uzalezniona funkcja obiekt ktory 
	// przedkladamy tutaj nie posiada ID, poniewaz moze sie okazac
	// ze chcemy zrobic aktualizacje wielu smarrtow na raz
	// zatem zeby w petli sie latwiej pracowalo na identycznych fullObjectach
	// dalem osobno id: ajdi - co by tylko te property podmieniac 
	// w samym submitcie


	console.log(" dbRest.js -> inside cccFeedbackSmaRRt ", fullObject);

    let valuepairs = [
 			["CCC_RouteAvailable", fullObject.routeAvailable],
 			["STATUS", 2],
			["RR_PARENT_ID", parentID],
 			["CCC_Route", fullObject.route],
 			["CCC_CarrierCode", fullObject.carrierCodeOrName],
 			["CCC_PickupDate", fullObject.pickupDate],
 			["CCC_DELIVERY_DATE", fullObject.deliveryDate],
 			["CCC_RDC_Date", fullObject.rdcDate],
 			["CCC_RDC_Code", fullObject.rdcCode],
 			["CCC_CustomsMaterial", fullObject.customsMaterial],
 			["ServiceType", fullObject.typeOfService],
 			["CCC_EstimatedCostForPTA", fullObject.ptaCost],
 			["CCC_PTA", fullObject.PTA],
 			["CCC_XtraComment", fullObject.xtraComments],
		];
	

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "RoomRequests",
        valuepairs: valuepairs,
        ID: ajdi,
        completefunc: function (xData, Status) {
        
        
            console.log("feedback on SmaRRt ready!", xData, Status);    
            // let tmpstr = xData.responseText;
            // console.log("xData.responseText: ", xData.responseText);
            
            alert("feedback on SmaRRt ready, status: " + Status);
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