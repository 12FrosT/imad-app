var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config={
    user:'ashishchauhan1206',
    database:'ashishchauhan1206',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};
var app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
            res.status(500).send(err.toString());
        else
            res.send(JSON.stringify(result));
    });
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

function createTemplate(data){
    var Title=data.title;
    var Heading=data.heading;
    var Content=data.content;
var htmlTemplate=`
    <html>
    <head>
        <title>${Title}</title>
        <meta name="viewpoint" content="with device-width, inital scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class ="container">
        <div>
            <a href ="/">Home</a>
        </div>
        <hr>
        <h3>${Heading} </h3>
        <div>
        ${Content}
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2Sync","10000",salt,hashed.toString('hex')].join('$');
}

/*app.get('/hash/:input',function(req,res){
   var hashedstring=hash(req.params.input,'this-is-random');
   res.send(hashedstring);
});*/

app.post('/signup',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring],function(err,result){
        if(err)
            res.status(500).send(err.toString());
        else
        alert('user created');
    });
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
       if(err){
           res.status(500).send(toString());
       }else
       if(result.rows.length===0){
           res.send(403).send("username/password is invalid");
       }else{
           var dbstring=result.rows[0].password;
           var salt=dbstring.split('$')[2];
           var hashedpassword=hash(password,salt);
           if(hashedpassword===dbstring)
           res.send("logged in");
           else
            res.send(403).send("username/password is invalid");
       } 
    });
});

app.get('/:articleName',function(req, res){
    //articleName=article-one
    //article[articleName]=={}content object for article one
    pool.query("SELECT * FROM article WHERE title =$1", [req.params.articleName],function(err,result){
        if(err)
            res.status(500).send(err.toString());
        else
        if(result.rows.length===0)
            res.status(404).send('Article not found');
        else{
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
});


function createTemplate(data){
    var user=data.username;
var htmlTemplate=`
    <html>
    <head>
        <title>login</title>
        <meta name="viewpoint" content="with device-width, inital scale=1"/>
    </head>
    <body>
        <div class ="container">
        <div>
            <a href ="/">Home</a>
        </div>
        <hr>
        <h3>hi user ${user}</h3>
        <div>
        
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

/*app.get('/holder/:username', function (req, res) {
      pool.query('SELECT * FROM "user" WHERE username =$1', [req.params.username],function(err,result){
        if(err)
            res.status(500).send(err.toString());
        else
        if(result.rows.length===0)
            res.status(404).send('user not found');
        else{
            var userData=result.rows[0];
            res.send(createTemplate(userData));
        }
    });
});*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
