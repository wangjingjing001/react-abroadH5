var webpack = require('webpack'),
	webpackConfig = require('./webpack.config'),
	webpackDevMiddleware = require("webpack-dev-middleware"),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	compiler = webpack(webpackConfig)

, express = require('express'), app = new express()
,	http = require('http')
,	port = 80;

app.use(
	webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));

app.use(webpackHotMiddleware(compiler))



// Anything else gets passed to the client app's server rendering
app.get('/', function(req, res, next) {
	console.log(__dirname+'/index.html');
	res.sendFile(__dirname + '/index.html')
});


app.listen(port, '127.0.0.1', function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. ", port)
  }
});
/*const server = http.createServer(app);
server.listen(port, 'my-dev.pengyunliuxue.com', function(err) {
	if (err) throw err;

	const addr = server.address();

	console.log('Listening at http://%s:%d', addr.address, addr.port);
});*/