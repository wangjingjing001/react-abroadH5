var webpack = require('webpack')
,	webpackConfig = require('./webpack.config')
,	webpackDevMiddleware = require("webpack-dev-middleware")
,	webpackHotMiddleware = require('webpack-hot-middleware')
,	compiler = webpack(webpackConfig)
, 	express = require('express')
,	http = require('http')
, 	app = express()
,	port = 3001;

app.use(
	webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));

app.use(webpackHotMiddleware(compiler));

// send index.html
app.get('/', function(req, res, next) {
	
	res.sendFile(__dirname + '/index.html');
});

//send js
app.get('/dist/*', function(req, res, next) {
	//推送js文件
	res.sendFile(__dirname + req.originalUrl);
});


app.listen(port, 'my-dev.pengyunliuxue.com', function(error) {
  if (error) {
    console.error('====', error);
  } else {
    console.info("==> 🌎  Listening on port %s. ", port);
  }
});
