var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleone={
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
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
var htmlTemplate=`
    <html>
    <head>
        <title>${title}</title>
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
app.get('/article-one',function(req, res){
    res.send(createTemplate(articleone));
});

app.get('/article-two',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
