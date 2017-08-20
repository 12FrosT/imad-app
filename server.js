var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one' : {
      title:'Article-one',
      heading:'Article one',
      content:`<p>
                    this is the content of frist article.
                </p>
                <p>
                    this other paragraph2
                </p>
                <p>
                    this is other paragraph3
                </p>`
    },
    'article-two':{
        title:'Article-two',
        heading:'Article two',
        content:`<p>
                    this is the content of second article.
                </p>
                <p>
                    this other paragraph2
                </p>
                <p>
                    this is other paragraph3
                </p>`
        
    },
    'article-three':{
        title:'Article-three',
        heading:'Article three',
        content:`<p>
                    this is the content of thrid article.
                </p>
                <p>
                    this other paragraph2
                </p>
                <p>
                    this is other paragraph3
                </p>`
    }
    };
    
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function createTemplate(data){
    var Title=data.title;
    var heading=data.heading;
    var content=data.content;
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
        <h3>${heading} </h3>
        <div>
        ${content}
        </div>
    </body>
</html>
`;
return htmlTemplate;
}
app.get('/:articleName',function(req, res){
    //articleName=article-one
    //article[articleName]=={}content object for article one
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
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
