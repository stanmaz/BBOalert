// Display HCP for visible hands
//Script,onDataLoad
displayHCP = function () {
var HCP = [0,0,0,0];
var player = ["S", "W", "N", "E"];
$("bridge-screen deal-viewer .coverClass .cardSurfaceClass .topLeft", parent.window.document).each(function() {
if (!isVisible(this)) return;
var z = Math.trunc($(this).parent().parent().parent().css("zIndex") / 100) - 1;
var v = "JQKA".indexOf($(this).text().charAt(0)) + 1;
HCP[z]+=v;
})
var txt = "";
HCP.forEach(function(hcp, idx) {
if (HCP[idx] > 0) txt = txt + player[idx] + ":" + HCP[idx] + " ";
})
$(".navBarClass .titleClass", window.parent.document).text(txt);
}
//Script,onAnyMutation
var l = $("bridge-screen deal-viewer .coverClass .cardSurfaceClass .topLeft", parent.window.document).length;
if((l%13) == 0) displayHCP();
//Script
//Script,onAnyMutation
var l = $("bridge-screen deal-viewer .coverClass .cardSurfaceClass .topLeft", parent.window.document).length;
if((l%13) == 0) displayHCP();
//Script
