console.log('Loaded!');


var element = document.getElementById('main-text');
element.innerHTML="new text";

var img = document.getElementById('imag');
var marginLeft=0,a=1;
function moveRight(){
    if(marginLeft===0)
    a=1;
    if(marginLeft==50)
    a=0;
    if(a===0)
    marginLeft=marginLeft-1;
    else
    marginLeft=marginLeft + 1;
    img.style.marginLeft=marginLeft +'px';
}
img.onclick = function (){
    var interval=setInterval(moveRight,50);
};