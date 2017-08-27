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
var submit=document.getElementById('submit-btn');
submit.onclick=function(){
    var name=nameInput.value;
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readystate===XMLHttpRequest.done){
            
            if(request.status===200){
                var names=request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++){
                list+='<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
            }
        }
    };
    request.open('GET','http://ashishchauhan1206.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
};

var b_signup=document.getElementById('s_username');
b_signup.onclick=function(){
    var username=document.getElementById('s_username').value;
    var password=document.getElementById('s_password').value;
  
    request.open('PST','http://ashishchauhan1206.imad.hasura-app.io/signup',true);
    request.setRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username: username,password: password}));
};














