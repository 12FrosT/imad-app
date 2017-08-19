console.log('Loaded!');


var element = document.getElementById('main-text');
element.innerHTML="new text";

var img = document.getElementById('imag');
var marginLeft=0,a=1;
function moveRight(){
    if(marginLeft===0)
    {a=1;}
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
var string="HOME PAGE";
function sydtr(){
    var s;
    for(var i=0;i<=9;i=i+1){
        s=s+string[i];
    }
    return s;
}
var str=document.getElementById('tst');
str.innerHTML=function(){
    var interval=setInterval(dystr,50);
};
