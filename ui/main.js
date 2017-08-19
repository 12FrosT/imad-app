console.log('Loaded!');


var element = document.getElementById('main-text');
element.innerHTML="new text";

var img = document.getElementById('imag');
img.onclick = function (){
    img.style.marginLeft='100px';
};