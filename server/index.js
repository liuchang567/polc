const sqlApi = require('./api/sqlApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

/*解决由于express 4.0 框架的request entity too large原因
所以要对其进行限定*/
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

// 后端api路由
app.use('/api', sqlApi);

//访问静态资源文件
// app.use(express.static(path.resolve(__dirname,'../dist')))
// app.use(express.static(path.resolve(__dirname,'../public')))
// //因为都是单项页面，所以都指向这个请求
// app.get('*',function(req,res){
// 	const html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'), 'utf-8');
// 	res.send(html);
// })

// test
// app.use('/api/aaa', (req, res) => res.send('Hello World!'))
// 监听端口
app.listen(3000, (e) => {
    console.log('success listen at port:3000......');
});
