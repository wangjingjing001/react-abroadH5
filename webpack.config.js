var path = require('path')
var webpack = require('webpack')

module.exports = {
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.web.js', '.json'],
    },
    entry: [
        'webpack-hot-middleware/client', 
        path.resolve(__dirname, './index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
                include: __dirname
        },
        { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        },
        {
            test: /\.json$/,
            loaders: ['json'],
            exclude: /node_modules/,
            include: __dirname
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    /*externals: {
       'react': 'React',
       'react-dom': 'ReactDOM',
        "react-router": "ReactRouter",
        'history': "History",
        'redux': 'Redux',
        'react-redux': 'ReactRedux'
    }*/
}