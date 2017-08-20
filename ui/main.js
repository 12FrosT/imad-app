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

var button=document.getElementById('counter');
button.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(reques.readystate===XMLHttpRequest.done){
            
            if(request.status===200){
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    reuqest.open(GET,'http://ashishchauhan1206.imad.hasura-app.io/counter',true);
    request.send(null);
    
};