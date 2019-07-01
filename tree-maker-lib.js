var treeMaker = ((nm) => {


    // kolejna inkrementacja id
    // bez zwiazku z relacjami w samym drzewie
    // wazne by otrzymac unikaty dla kazdego node'a
    let idHandler = 0;

    // przetrzymuje informacje na temat poziomu na jakim aktualnie w drzewie sie znajdujemy
    let levelHandler = 0;

    let innerTree = {
        id: idHandler,
    };


    let pointer = innerTree;
    
    // NOK
    let innerRefreshAllTree = (() => {
    	idHandler = 0;
    	levelHandler = 0;
    	
    	innerTree = {
    		id: idHandler,
    	}
    	
    });


    let innerFindNodeByPathArray = ((arr) => {


        pointer = innerTree;


        try {

            arr.forEach((n, i) => {

                if (!!(pointer[n])) {
                    pointer = pointer[n];
                } else {
                    pointer = null;
                    throw BreakException;

                }
            });

        } catch (e) {
            return null;
        }

        return pointer;
    });


    let innerFindNodeByNameAtParentNode = ((nm) => {

        pointer = innerTree;

        if (!!(pointer[nm])) {
            return pointer[nm];
        } else {
            return null;
        }
    });



    let innerAddNode = ((txt) => {

        pointer[txt] = newNode();
        pointer = pointer[txt];
        levelHandler++;

    });


    let innerAddNodeBasedOnPathArray = ((arr, txt) => {
        let workNode = innerFindNodeByPathArray(arr);

        //console.log("workNode ", workNode);

        if (!!(workNode)) {
            pointer = workNode;
            pointer[txt] = newNode();
            pointer = pointer[txt];
            levelHandler++;
        } else {

            pointer = innerTree;

            arr.forEach((e) => {

                if (!!(pointer[e])) {} else {
                    pointer[e] = newNode();
                }

                pointer = pointer[e];
                levelHandler++;

            });

            innerAddNodeBasedOnPathArray(arr, txt);
        }
    });


    let innerAddObjectNodeBasedOnPathArray = ((arr, /** Interface: { (id)*, name, details, data} */ obj) => {

        // connected with addObjectNodeBasedOnPathArray with returned object:)
        // for this function really important is to preserve proper interface
        // /** Interface: { (id)*, name, details, data} */


        // still under consideration to have kind of duck type checking
        // so using simply typeof obj.prop - will check for example that
        // we have string or number, or also we can consider to have function
        // if such existing
        // if not then we should se 'undefinded' value, which means that such prop do not exisits

        // (id)* - ten element obiektu zostanie utworzony w srodku implementacji poprzez
        // inc zmiennej priv: idHandler;
        let workNode = innerFindNodeByPathArray(arr);

        //console.log("workNode ", workNode);

        if (!!(workNode)) {
            pointer = workNode;
            /** Interface: { (id)* , name, details, data} */
            
            if( !!(pointer.x) ) {
            	pointer.x.push(newObjectNode(obj));
            } else {
            	pointer.x = [];
            	pointer.x.push(newObjectNode(obj));
            }
            pointer = pointer.x;
            levelHandler++;
        } else {

            pointer = innerTree;

            arr.forEach((e) => {

                if (!!(pointer[e])) {} else {
                    pointer[e] = newNode();
                }

                pointer = pointer[e];
                levelHandler++;

            });

            innerAddObjectNodeBasedOnPathArray(arr, obj);
        }
    });


    let innerAddNodeToExistingParentNode = ((parentName, txt) => {

        let parentNode = innerFindNodeByNameAtParentNode(parentName);

        if (!!(parentNode)) {
            // console.log("parentNode: ", parentNode);
            pointer = parentNode;
            
        	pointer[txt] = newNode();            
            pointer = pointer[txt];
            levelHandler++;
        } else {
            // console.log("parentNode not found: ", parentNode, " test for: arg: x1 (parentName) ", parentName, " x2 (txt) ", txt);
            innerAddParentNode(parentName);
            innerAddNodeToExistingParentNode(parentName, txt);
        }

    });

    let innerAddParentNode = ((txt) => {
        levelHandler = 0;
        pointer = innerTree;
        pointer[txt] = newNode();
        pointer = pointer[txt];
        levelHandler++;
    });

    let innerRemoveNode = ((id) => {

    });



    function newNode() {
        idHandler++;
        return {
            id: idHandler,
        };
    }

    function newObjectNode(obj) {
        idHandler++;
        return {
            id: idHandler,
            data: obj.data,
            name: obj.name,
            details: obj.details,
        };
    }



    return {
        addNode: innerAddNode,
        addParentNode: innerAddParentNode,
        removeNode: innerRemoveNode,
        tree: innerTree,
        findNodeByNameAtParentNode: innerFindNodeByNameAtParentNode,
        addNodeToExistingParentNode: innerAddNodeToExistingParentNode,
        addNodeBasedOnPathArray: innerAddNodeBasedOnPathArray,
        addObjectNodeBasedOnPathArray: innerAddObjectNodeBasedOnPathArray,
        refreshAllTree: innerRefreshAllTree,
    };

})("mojeDrzewoDanych");
