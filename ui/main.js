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
        if(request.readystate===XMLHttpRequest.done){
            
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    request.open('GET','http://ashishchauhan1206.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

var nameInput=document.getElementById('names');
var name=nameInput.value;
var submit=document.getElementById('submit-btn');
submit.onclick=function(){
    
    
    var names=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<names.length;i++){
        list='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
    
};






