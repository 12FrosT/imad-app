console.log('Loaded!');

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

var counter=0;
var button=document.getElementById('counter');
button.onclick=function(){
    
    
    
    
    counter = counter+1;
    var span=document.getElementById('count');
    span.onclick=function(){
        counter=counter+1;
        span.innerHTML=counter.toString();
    };
};