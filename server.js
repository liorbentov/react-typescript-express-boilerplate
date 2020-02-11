const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const app = express()

const compiler = webpack(webpackConfig)

app.use(express.static(__dirname + '/www'))

const devServerEnabled = true

if (devServerEnabled) {
    //reload=true:Enable auto reloading when changing JS files or content
    //timeout=1000:Time from disconnecting from server to reconnecting
    webpackConfig.entry.app.unshift(
        'webpack-hot-middleware/client?reload=true&timeout=1000'
    )

    //Add HMR plugin
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

    //Enable "webpack-dev-middleware"
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
        })
    )

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler))
}

app.get('/user', function(req, res) {
    res.send('Got a GET request at /user')
})

app.get('/json', function(req, res) {
    res.json({
        name: 'myName',
        age: 30,
    })
})

const server = app.listen(3000, function() {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
