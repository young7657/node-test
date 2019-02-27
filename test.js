// 引入http模块
var http = require('http');
var url = require('url');

/**
 * req 获取url信息
 * res 浏览器返回响应信息
 */
http.createServer(function(req, res) {
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
    
    res.end();
}).listen(8001);