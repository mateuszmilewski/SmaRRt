var mainListEventHandler = (() => {
	
	
	
    let innerPlt = function(item) {

		let treeItem = document.getElementById("tree-" + item);
		
		treeItem.parentElement.querySelector(".nested").classList.toggle("active");
    	treeItem.classList.toggle("caret-down");
		
	};
	
	
	let innerResp = function(item, resp) {
	
		// let treeItem = document.getElementById("tree-" + item);
		let child = document.getElementById("tree-" + item + "-" + resp);
		
		child.parentElement.querySelector(".nested").classList.toggle("active");
    	child.classList.toggle("caret-down");

	};
	
	
	
	
	// teraz wlasciwie korzystam tylko i wylacznie z tej funkcji
	let innerCommon = function(arr) {
	
		let ajdi = '';
		
		
		if( arr.length > 0 ) {
		
			arr.forEach( (i) => { ajdi += ('-' + i); });
			
			
			if( ajdi.length > 0 ) {
			
			
				ajdi = "tree" + ajdi;
		
				let element = document.getElementById(ajdi);
			
				element.parentElement.querySelector(".nested").classList.toggle("active");
		    element.classList.toggle("caret-down");
		  }
	    
	  }

	}
	
	let innerDoAllClicks = function(arr) {
		
		let ajdi = '';
		let element;
		
		if( arr.length > 0 ) {
			
			// sam plt
			ajdi = 'tree-' + arr[0];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    
	    
	    ajdi = 'tree-' + arr[0] + '-' + arr[1];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    
	    ajdi = 'tree-' + arr[0] + '-' + arr[1] + '-' + arr[2];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    
	    
	    ajdi = 'tree-' + arr[0] + '-' + arr[1] + '-' + arr[2] + '-' + arr[3];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    
	    
	    ajdi = 'tree-' + arr[0] + '-' + arr[1] + '-' + arr[2] + '-' + arr[3] + '-' + arr[4];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");


	    ajdi = 'tree-' + arr[0] + '-' + arr[1] + '-' + arr[2] + '-' + arr[3] + '-' + arr[4] + '-' + arr[5];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    
	    
	    // DUNS // to much... need to load xtra data - ng-click in button here also with logic in main-ctrl
	    /*
	    ajdi = 'tree-' + arr[0] + '-' + arr[1] + '-' + arr[2] + '-' + arr[3] + '-' + arr[4] + '-' + arr[5] + '-' + arr[6];
			element = document.getElementById(ajdi);
			
			element.parentElement.querySelector(".nested").classList.add("active");
	    element.classList.add("caret-down");
	    */




			
		}
	}
	
	
    return {
        plt: innerPlt,
        resp: innerResp,
        common: innerCommon,
        doAllClicks: innerDoAllClicks,
    };

})("mainListEventHandler");