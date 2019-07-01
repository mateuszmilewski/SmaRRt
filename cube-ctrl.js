SmaRRt.controller("CubeCtrl", function($scope, RequestsService) {
	
	$scope.cubesHandler = {};
	
	$scope.cubesHandler.Name = "Cube Wizard";
	$scope.cubesHandler.RR = {
		weight: 0,
		numOfCont: 0,
		cubesRefDimsStr: "",
		cubesRefDimsObj: {},
	};
	
	$scope.cubesHandler.x1 = document.querySelector('#x1');
	$scope.cubesHandler.y1 = document.querySelector('#y1');
	$scope.cubesHandler.z1 = document.querySelector('#z1');
	$scope.cubesHandler.q1 = document.querySelector('#q1');
	$scope.cubesHandler.color1 = document.querySelector('#color1');
	$scope.cubesHandler.waga1 = document.querySelector('#waga1');
	
	$scope.cubesHandler.x1x1 = parseInt($scope.cubesHandler.x1.value);
	$scope.cubesHandler.y1y1 = parseInt($scope.cubesHandler.y1.value);
	$scope.cubesHandler.z1z1 = parseInt($scope.cubesHandler.z1.value);
	$scope.cubesHandler.c1c1 = $scope.cubesHandler.color1.value;
	$scope.cubesHandler.w1w1 = parseInt($scope.cubesHandler.waga1.value);
	$scope.cubesHandler.q1q1 = parseInt($scope.cubesHandler.q1.value);
	
	
	$scope.cubesHandler.currDim = "" + $scope.cubesHandler.q1.value + " x (" + $scope.cubesHandler.x1.value + " x " + $scope.cubesHandler.y1.value + " x " + $scope.cubesHandler.z1.value + ")";
	
	$scope.cubesHandler.canvas = document.getElementById("cube-canvas");
	$scope.cubesHandler.ctx = $scope.cubesHandler.canvas.getContext('2d');
	
	
	
	// clickHandler not in usage currently - connected only with logic which is curr in commented code
	/*
	let clickHandler = {
		tmpInputArrHandler: ['#x1', '#y1', '#z1'],
		tmpRefArrHandler: ['#cube-ref-x1', '#cube-ref-y1', '#cube-ref-z1'],
		currInputArrIndx: 0,
		tmpEl: null, 
		tmpRf: null,
		toggleForClick: false,
		refStartX: 0,
		refStartY: 0,
		refStartZ: 0,
	}
	*/
	
	
	
	//
	// CLICK
	//
	//
	$scope.cubesHandler.canvas.addEventListener('click', function(event) {
	
	
		// niech click narazie nic nie obsluguje :)
		console.log( " click on canvas: ", event.clientX, event.clientY );
		
		/*
		if( !clickHandler.toggleForClick ) {
		
			clickHandler.refStartX = event.clientX;
			clickHandler.refStartY = event.clientY;
			clickHandler.refStartZ = event.clientY;
						
			clickHandler.tmpEl = document.querySelector(clickHandler.tmpInputArrHandler[clickHandler.currInputArrIndx]);
			
			// tmpRf do zmiany koloru
			clickHandler.tmpRf = document.querySelector(clickHandler.tmpRefArrHandler[clickHandler.currInputArrIndx]);
			clickHandler.tmpRf.classList.add("zaznaczenie");
			
			clickHandler.currInputArrIndx++;
			
			if( clickHandler.currInputArrIndx >= clickHandler.tmpInputArrHandler.length) {
				clickHandler.currInputArrIndx = 0;
			}

		
		
			clickHandler.toggleForClick = !clickHandler.toggleForClick;
		} else {
			clickHandler.tmpRf.classList.remove("zaznaczenie");
			clickHandler.toggleForClick = !clickHandler.toggleForClick;
			
			$scope.cubesHandler.updateVals();
			// draw();
		}
		*/
		
	});
	//
	//
	// END OF CLICK
	//
	
	
	
	// mouse move, ale zle to bardzo dziala, wiec narazie odpuszczam
	//
	//
	/*
	$scope.cubesHandler.canvas.addEventListener('mousemove', function(event) {
	
	
	
		// console.log( "onmousemove tmpEl: ", tmpEl );
		
		
		if( clickHandler.toggleForClick ) {
		
			let diff = 0;
			
			// byl problem z konwersja danych
			let liczba = 0;
			
			
			// jest przesuniecie o jeden!
			if( clickHandler.currInputArrIndx == 1 ) {
				// console.log("onmousemove $scope.cubesHandler.x1x1", $scope.cubesHandler.x1x1);
				diff = event.clientX - clickHandler.refStartX;
				//diff /= 10;
				//diff = parseInt(diff);
				
				
				liczba = 0 + parseInt($scope.cubesHandler.x1x1);
				liczba = Math.abs(parseInt(diff));
				
				$scope.cubesHandler.x1x1 = liczba;
				$scope.cubesHandler.x1.value = liczba;
				
				console.log("x1 event.clientX, refStartX, diff, $scope.cubesHandler.x1x1: ", event.clientX, clickHandler.refStartX, diff, $scope.cubesHandler.x1x1);
				
			} else if(clickHandler.currInputArrIndx == 2) {
				//console.log("onmousemove ", currInputArrIndx, refStartY, event.clientY);
				diff = event.clientY - clickHandler.refStartY;
				//diff /= 10;
				//diff = parseInt(diff);
				
				liczba = 0 + parseInt($scope.cubesHandler.y1y1);
				liczba = Math.abs(parseInt(diff));
				
				$scope.cubesHandler.y1y1 = liczba;
				$scope.cubesHandler.y1.value = liczba;
				
				console.log("y1 event.clientY, refStartY, diff, $scope.cubesHandler.y1y1: ", event.clientY, clickHandler.refStartY, diff, $scope.cubesHandler.y1y1);
				
			} else if(clickHandler.currInputArrIndx == 0) {
				//console.log("onmousemove ", currInputArrIndx, refStartZ, event.clientY);
				diff = event.clientY - clickHandler.refStartZ;
				//diff /= 10;
				//diff = parseInt(diff);
				
				
				liczba = 0 + parseInt($scope.cubesHandler.z1z1);
				liczba = Math.abs(parseInt(diff));

				$scope.cubesHandler.z1z1 = liczba;
				$scope.cubesHandler.z1.value = liczba;
				
				console.log("z1 event.clientY, refStartY, diff, $scope.cubesHandler.z1z1: ", event.clientY, clickHandler.refStartY, diff, $scope.cubesHandler.z1z1);
			}
			
			
			$scope.cubesHandler.updateVals();
			
		}
		
		
	});
	*/
	//
	//
	//

	$scope.cubesHandler.updateValsFromRange = function() {
	
		document.querySelector('#wagaNum1').value = parseFloat($scope.cubesHandler.waga1.value);
		
		document.querySelector('#xNum1').value = $scope.cubesHandler.x1.value;
		document.querySelector('#yNum1').value = $scope.cubesHandler.y1.value;
		document.querySelector('#zNum1').value = $scope.cubesHandler.z1.value;
		document.querySelector('#qNum1').value = $scope.cubesHandler.q1.value;

		
		
		$scope.cubesHandler.x1x1 = parseInt(document.querySelector('#xNum1').value);
		$scope.cubesHandler.y1y1 = parseInt(document.querySelector('#yNum1').value);
		$scope.cubesHandler.z1z1 = parseInt(document.querySelector('#zNum1').value);
		$scope.cubesHandler.q1q1 = parseInt(document.querySelector('#qNum1').value);
		$scope.cubesHandler.c1c1 = $scope.cubesHandler.color1.value;
		$scope.cubesHandler.w1w1 = parseFloat(document.querySelector('#wagaNum1').value);
		
		
		document.querySelector('#cube-ref-x1').value = $scope.cubesHandler.x1x1;
		document.querySelector('#cube-ref-y1').value = $scope.cubesHandler.y1y1;
		document.querySelector('#cube-ref-z1').value = $scope.cubesHandler.z1z1;

		
		$scope.cubesHandler.currDim = "" + $scope.cubesHandler.q1q1 + " x (" + $scope.cubesHandler.x1x1 + " x " + $scope.cubesHandler.y1y1 + " x " + $scope.cubesHandler.z1z1 + ")";
	
	
	}
	
	$scope.cubesHandler.updateValsFromNum = function() {
	
		
		$scope.cubesHandler.waga1.value = document.querySelector('#wagaNum1').value;
		
		$scope.cubesHandler.x1.value = document.querySelector('#xNum1').value;
		$scope.cubesHandler.y1.value = document.querySelector('#yNum1').value;
		$scope.cubesHandler.z1.value = document.querySelector('#zNum1').value;
		$scope.cubesHandler.q1.value = document.querySelector('#qNum1').value;

		
		
		$scope.cubesHandler.x1x1 = parseInt(document.querySelector('#xNum1').value);
		$scope.cubesHandler.y1y1 = parseInt(document.querySelector('#yNum1').value);
		$scope.cubesHandler.z1z1 = parseInt(document.querySelector('#zNum1').value);
		$scope.cubesHandler.q1q1 = parseInt(document.querySelector('#qNum1').value);
		$scope.cubesHandler.c1c1 = $scope.cubesHandler.color1.value;
		$scope.cubesHandler.w1w1 = parseFloat(document.querySelector('#wagaNum1').value);
		
		
		document.querySelector('#cube-ref-x1').value = $scope.cubesHandler.x1x1;
		document.querySelector('#cube-ref-y1').value = $scope.cubesHandler.y1y1;
		document.querySelector('#cube-ref-z1').value = $scope.cubesHandler.z1z1;

		
		$scope.cubesHandler.currDim = "" + $scope.cubesHandler.q1q1 + " x (" + $scope.cubesHandler.x1x1 + " x " + $scope.cubesHandler.y1y1 + " x " + $scope.cubesHandler.z1z1 + ")";	
	}
	
	
	$scope.cubesHandler.submitNewDims = function() {
	
	
		/** 
			Dodaj pudełko!
		*/
	
		console.log("cubesHandler, gdy probuje dodac pudelko: ", $scope.cubesHandler);
	
		
		let tmpKey = '' + $scope.cubesHandler.x1x1 + "x" + $scope.cubesHandler.y1y1 + "x" + $scope.cubesHandler.z1z1;
		
		
		//console.log("dupa przed: ", $scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ]);
		
		if( !($scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ]) ) {
			$scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ] = 0;
		}
		
		//console.log("po zero: ", $scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ]);
		
		// to jest do poprawy NOK!
		let liczbaPrzechowywanaAktualnie = parseInt($scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ]);
		$scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ] = 0 + liczbaPrzechowywanaAktualnie + parseInt($scope.cubesHandler.q1q1);
		
		//console.log("dupa po probie przypisania: ", liczbaPrzechowywanaAktualnie , $scope.cubesHandler.RR.cubesRefDimsObj[ tmpKey ]);
		
		$scope.cubesHandler.RR.cubesRefDimsStr = "";
		Object.keys($scope.cubesHandler.RR.cubesRefDimsObj).forEach( (k) => {
		
			let v = parseInt($scope.cubesHandler.RR.cubesRefDimsObj[ k ])
		
			$scope.cubesHandler.RR.cubesRefDimsStr += (" " + v +  " x ( " + k + " ); ");
		});
	
		
		// $scope.cubesHandler.RR.cubesRefDimsStr += ($scope.cubesHandler.currDim + " ; ");
		$scope.cubesHandler.RR.numOfCont += parseInt($scope.cubesHandler.q1q1);
		$scope.cubesHandler.RR.weight += parseFloat($scope.cubesHandler.w1w1);
		
		
		console.log(" submitNewDims -> cubesRefDimsObj ", $scope.cubesHandler.RR.cubesRefDimsObj);
		
	}
	
	$scope.cubesHandler.resetPackaging = function() {
		
		$scope.cubesHandler.RR.cubesRefDimsObj = {};
		$scope.cubesHandler.RR.cubesRefDimsStr = "";
		$scope.cubesHandler.RR.numOfCont = 0;
		$scope.cubesHandler.RR.weight = 0;
		
	}
	
	$scope.cubesHandler.submitPackagingIntoRR = function() {
	
	
		console.log("$scope.cubesHandler: ", $scope.cubesHandler);
		console.log(" getSmarrtData: ", RequestsService.getDataForSmarrtForm());
		
		
		let tmp = RequestsService.getDataForSmarrtForm();
		
		if( !!(tmp.RR[0]) ) {
			tmp.RR[0].FMA.Dim = "" + $scope.cubesHandler.RR.cubesRefDimsStr;
			tmp.RR[0].FMA.NumberOfContainers = parseInt($scope.cubesHandler.RR.numOfCont);
			tmp.RR[0].FMA.Weight = parseFloat($scope.cubesHandler.RR.weight);
			
			console.log( "tmp.RR[0].FMA: ", tmp.RR[0].FMA );
		} else {
			alert("Nieudana próba dodania wymiarow do SmaRRt!");
		}
		
		
		$scope.cubesHandler.schow();

	
	}

	
	function draw() {
	
		let ctx = $scope.cubesHandler.ctx;
		ctx.clearRect(0, 0, $scope.cubesHandler.canvas.width, $scope.cubesHandler.canvas.height);
		
		// Wobble the cube using a sine wave
		let wobble = Math.sin( Date.now() / 200 ) * window.innerHeight / 100;
	
  
		// draw the cube
		drawCube(
			window.innerWidth / 2,
			window.innerHeight / 3 + wobble + $scope.cubesHandler.y1.value / 2,
			Number($scope.cubesHandler.x1x1),
			Number($scope.cubesHandler.y1y1),
			Number($scope.cubesHandler.z1z1),
			$scope.cubesHandler.c1c1
		);
		
		requestAnimationFrame(draw);
	
	
	}
	draw();
	
	
	
	
	// Colour adjustment function
	// Nicked from http://stackoverflow.com/questions/5560248
	function shadeColor(color, percent) {
	
		// let color = $scope.cubesHandler.color;
	
		color = color.substr(1);
		let num = parseInt(color, 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		G = (num >> 8 & 0x00FF) + amt,
		B = (num & 0x0000FF) + amt;
		return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
	}
	
	// Draw a cube to the specified specs
	function drawCube(x, y, wx, wy, h, color) {
	
	
		let ctx = $scope.cubesHandler.ctx;
	
	    ctx.beginPath();
	    ctx.moveTo(x, y);
	    ctx.lineTo(x - wx, y - wx * 0.5);
	    ctx.lineTo(x - wx, y - h - wx * 0.5);
	    ctx.lineTo(x, y - h * 1);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, -10);
	    ctx.strokeStyle = color;
	    ctx.stroke();
	    ctx.fill();
	
	    ctx.beginPath();
	    ctx.moveTo(x, y);
	    ctx.lineTo(x + wy, y - wy * 0.5);
	    ctx.lineTo(x + wy, y - h - wy * 0.5);
	    ctx.lineTo(x, y - h * 1);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, 10);
	    ctx.strokeStyle = shadeColor(color, 50);
	    ctx.stroke();
	    ctx.fill();
	
	    ctx.beginPath();
	    ctx.moveTo(x, y - h);
	    ctx.lineTo(x - wx, y - h - wx * 0.5);
	    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
	    ctx.lineTo(x + wy, y - h - wy * 0.5);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, 20);
	    ctx.strokeStyle = shadeColor(color, 60);
	    ctx.stroke();
	    ctx.fill();
 	 }
	
	
	
	$scope.cubesHandler.cubes = [];
	
	$scope.cubesHandler.nieSchow = () => {
	
		console.log("nie-schow wogule cubesHandler");
		// map-text-details
		document.getElementById("cubeModal").style.height = "800px";
		document.getElementById("cubeModal").style.width = "500px";
		document.getElementById("cubeModal").style.overflow = "visible";
		document.getElementById("cubeModal").style.visibility = "visible";
	}

	
	
	
	// hide all
	$scope.cubesHandler.schow = () => {
	
		console.log("schow wogule cubesHandler");
		// map-text-details
		document.getElementById("cubeModal").style.height = "0px";
		document.getElementById("cubeModal").style.width = "0px";
		document.getElementById("cubeModal").style.overflow = "hidden";
		document.getElementById("cubeModal").style.visibility = "hidden";

	}
	

});
