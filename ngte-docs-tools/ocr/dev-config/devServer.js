var path = require('path');
var express = require('express');
var webpack = require('webpack');
//默认是开发时配置
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + "/", "dev.html"));
});

//监听本地端口
app.listen(require("./apps.config").devServer.port, 'localhost', function (err) {
    
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
