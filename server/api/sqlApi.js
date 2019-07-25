var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool(models.mysql);

//第一个get方法则是可以获取像这样的参数：
// 127.0.0.1:3000/csdn?name=参数   //var name=req.query.name; 所以name就是=后的参数

//第二个get则是可以获取到比较优雅的路由地址参数：
// 127.0.0.1:3000/csdn/参数   //var id=req.params.id; 所以'参数'就是传递给:id，所以id就是'参数'

//post req.body;

router.get('/login',(req,res) => {
    var params = req.query;
    var sql = 'select * from user_t';
    var username = params.username;
    var password = params.password;
    pool.getConnection(function(err, conn){
        try {
            if(err){
                throw err;
            }
            conn.query(sql, function(err, data){
                if (err) {
                    res.json({
                        code: '-200',
                        msg:'数据异常'
                    });
                } else {
                    if (typeof data === 'undefined') {
                        res.json({
                            code: '-200',
                            msg:'用户不存在'
                        });
                    } else {
                        for (let i = 0; i < data.length; i++) {
                            if (username === data[i].username && password === data[i].password) {
                                res.json({
                                    code: '200',
                                    msg:'操作成功'
                                });
                            } else if (username === data[i].username && password !== data[i].password){
                                res.json({
                                    code: '-200',
                                    msg:'密码错误'
                                });
                            } else if (username !== data[i].username) {
                                res.json({
                                    code: '-200',
                                    msg:'用户不存在'
                                });
                            }
                        }
                    }
                }
                conn.release(); //释放连接
            })
        }catch(e){
            res.json({
                code: '-200',
                msg:'数据库连接异常'
            });
        }
    })
});

router.get('/user',(req,res) => {
    var params = req.query;
    var sql = 'select * from user_t LIMIT '+ params.current + ',' + params.pageSize;
    pool.getConnection(function(err, conn){
        try {
            if(err){
                throw err;
            }
            conn.query(sql, function(err, data){
                if (err) {
                    res.json({
                        code: '-200',
                        msg:'数据异常'
                    });
                } else {
                    if (typeof data === 'undefined') {
                        res.json({
                            code: '-200',
                            msg:'数据异常'
                        });
                    } else {
                        res.json({
                            code: '200',
                            msg:'操作成功',
                            data: data,
                            total: data.length
                        });
                    }
                }
                conn.release(); //释放连接
            })
        }catch(e){
            res.json({
                code: '-200',
                msg:'数据库连接异常'
            });
        }
    })
});

router.post('/updateUser',(req,res) => {
    var params = req.body;
    var sql = `update user_t set username='${params.username}', age=${params.age}, sex='${params.sex}', address='${params.address}' where id ='${params.id}'`;
    console.log(sql)
    pool.getConnection(function(err, conn){
        try {
            if(err){
                throw err;
            }
            conn.query(sql, function(err, data){
                if (err) {
                    res.json({
                        code: '-200',
                        msg:'操作失败'
                    });
                } else {
                    if (typeof data === 'undefined') {
                        res.json({
                            code: '-200',
                            msg:'操作失败'
                        });
                    } else {
                        res.json({
                            code: '200',
                            msg:'操作成功',
                        });
                    }
                }
                conn.release(); //释放连接
            })
        }catch(e){
            res.json({
                code: '-200',
                msg:'数据库连接异常'
            });
        }
    })
});

router.post('/delUser',(req,res) => {
    var params = req.body;
    var sql = `delete from user_t where id=${params.id}`
    console.log(sql)
    pool.getConnection(function(err, conn){
        try {
            if(err){
                throw err;
            }
            conn.query(sql, function(err, data){
                if (err) {
                    res.json({
                        code: '-200',
                        msg:'操作失败'
                    });
                } else {
                    if (typeof data === 'undefined') {
                        res.json({
                            code: '-200',
                            msg:'操作失败'
                        });
                    } else {
                        res.json({
                            code: '200',
                            msg:'操作成功',
                        });
                    }
                }
                conn.release(); //释放连接
            })
        }catch(e){
            res.json({
                code: '-200',
                msg:'数据库连接异常'
            });
        }
    })
});

module.exports = router;