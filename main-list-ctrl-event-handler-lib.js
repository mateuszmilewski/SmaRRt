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
	
	
    return {
        plt: innerPlt,
        resp: innerResp,
        common: innerCommon,
    };

})("mainListEventHandler");