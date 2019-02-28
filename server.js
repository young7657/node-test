// 引入http模块
var http = require('http');
var url = require('url');

var config = require('./config'); // 省略.js后缀也是可以的
var tools = require('./tools');
var apple = require('apple');
var bar = require('bar/bar');
var nav = require('nav');

/**
 * req 获取url信息
 * res 浏览器返回响应信息
 */
var app = http.createServer(function(req, res) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    //设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
    
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    if (req.url != '/favicon.ico') {
        var query = url.parse(req.url, true);

        console.log(query);
        console.log('------------------');
    }

    res.write('你好 nodejs');
    res.write('我是第一个node程序');
    res.write('supervisor');

    console.log(config);
    console.log(tools);

    console.log(tools.sayHello());
    console.log(tools.add(1,2));
    
    console.log(apple);
    console.log(bar);
    console.log(nav);

    res.end();
});

app.listen(8001);