// module.exports = {
//     entry: ['./src/index.js'],
//     output: {
//         path: __dirname,
//         publicPath: '/',
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders: [{
//             exclude: /node_modules/,
//             loader: 'babel'
//         }]
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     },
//     devServer: {
//         historyApiFallback: true,
//         contentBase: './'
//     }
// };

module.exports = {
    entry: ['./src/counter.js'],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'counterCompiled.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};