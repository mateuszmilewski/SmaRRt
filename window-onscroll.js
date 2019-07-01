window.onscroll = function (e) {
	var vertical_position = 0;
	if (pageYOffset)//usual
		vertical_position = pageYOffset;
	else if (document.documentElement.clientHeight)//ie
		vertical_position = document.documentElement.scrollTop;
	else if (document.body)//ie quirks
		vertical_position = document.body.scrollTop;
	
	var your_div = document.getElementById("outer-map");
	var your_div_2 = document.getElementById("nie-schow");
	
	your_div.style.top = (vertical_position + 200) + 'px';
	your_div_2.style.top = (vertical_position + 200) + 'px';
	
	
	if( !!(document.getElementById("cubeModal")) ) {
		let modalDim = document.getElementById("cubeModal");
		modalDim.style.top = (vertical_position + 100) + 'px';
	}
} 
