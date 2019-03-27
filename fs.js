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