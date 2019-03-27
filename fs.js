var fs = require('fs');

fs.stat('tools.js', (err, state) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('文件', state.isFile());
    console.log('目录', state.isDirectory());
});

// 判断服务器上面有没有upload目录，没有创建这个目录
fs.stat('upload', function(err, stats) {
    // 没有这个目录
    if (err) {
        fs.mkdir('upload', function(error){
            if (error) {
                console.log(error);
                return false;
            }
            console.log('创建成功');
        });
    } else {
        console.log('目录已经存在');
        console.log(stats.isDirectory());
    }
}); 

// 找出html目录下面的所有的目录，然后打印出来
var filesArr = [];
fs.readdir('node_modules', function(err, files){
    if(err){
        console.log(err);
    } else {//判断是目录还是文件夹
        console.log(files);//数组
        
        (function getFile(i) {
            if (i == files.length){
                return false;
            }
            fs.stat('node_modules/' + files[i], function(error, stats){
                if (stats.isDirectory()){//目录
                    filesArr.push(files[i]);
                }
                // 递归调用
                getFile(i+1);
            });
        })(0);
    }
});

// 流的方式读取文件
var readStream = fs.createReadStream('package.json');

var str = '' // 保存数据
var count = 0;// 次数
// 监听data事件

readStream.on('data', function (chunk){
    str += chunk;
    count++;
});

// 读取完成
readStream.on('end', function(chunk){
    console.log(str);
    console.log(count);
});

// 读取失败
readStream.on('error', function(err){
    console.log(err);
});

// 写入流
var data = '我是从数据库获取的数据，我要保存起来\n';

// 创建一个可以写入的流，写入到文件output.txt中
var writeStream = fs.createWriteStream('output.txt');

// 写入一百次
for (var i = 0;i < 100; i++){
    writeStream.write(data, 'utf8');
}

// 标记写入完成
writeStream.end();


// 在被标记写入完成后，收到的广播事件（不调用end方法，也能写入，但是不会触发结束事件）
writeStream.on('finish', function (){
    console.log('写入完成');
});

// 失败
writeStream.on('error', function(){
    console.log('写入失败');
});

// 管道流
var readerStream = fs.createReadStream('output.txt');
var writeStream = fs.createWriteStream('output1.txt');

// 管道读写操作
// 读取output.txt文件内容，并将内容写入到output1.txt文件中

readerStream.pipe(writeStream);

console.log('程序执行完毕');




