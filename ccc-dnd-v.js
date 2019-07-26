var G_EXTERNAL_DATA = [];
var G_ID = -1; 


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    G_ID = ("" + document.getElementById(data).id).replace("drag","");
    //console.log("drop data, G_ID: ", G_ID );
    ev.target.appendChild(document.getElementById(data));
}
