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