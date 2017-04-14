var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        'webpack-hot-middleware/client', 
        path.resolve(__dirname, './index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
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
        // {
        //     test: /\.jsx?$/,
        //     loader: 'babel',
        //     exclude: /node_modules/,
        //     include: __dirname
        // },
        {
            test: /\.json$/,
            loaders: ['json'],
            exclude: /node_modules/,
            include: __dirname
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