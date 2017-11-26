var dbConfig = require('../db/DBConfig');
var mysql = require('mysql');
var User = require('../db/usersql');
var dbConnection = mysql.createConnection(dbConfig.mysql); // 建立连接
exports.updatePassword=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.updatePassword,[param.userpassword,param.userphone,param.usertype],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'修改成功!'}));
        }
    });

    // dbConnection.end();

};
exports.registerUsers=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.getUserByInfoType,[param.userphone,param.userpassword,param.usertype]
    , function(err, rows) {
        if (err) throw err;
        //如果查询无结果
        if (rows.length==0){
            dbConnection.query(User.insert,{
                userphone:param.userphone,
                userpassword:param.userpassword,
                usertype:param.usertype,
                username:param.userphone
            },function (err) {
                if(err){
                    throw err;
                }else{
                    res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
                }
            });
        }
        else {
            res.end(JSON.stringify({status:'101',msg:'该手机号已经被注册'}));
        }
        // dbConnection.end();
    });
};
exports.loginUsers=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.getUserByInfo,[param.userphone,param.userpassword],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'102',msg:'用户名或密码错误'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
exports.getnewList=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/userlist
    dbConnection.query(User.getList,function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // 2017-12-12T05:12:00.000Z
            for (i=0;i<results.length;i++){
                var listtime =new Date(results[i].listtime);
                var newlisttime=listtime.getUTCFullYear()+"/"+listtime.getUTCMonth()+"/"
                    +listtime.getUTCDate()+" " +listtime.getUTCHours()+":"+listtime.getUTCMinutes();
                results[i].listtime=newlisttime;
            }
            // function timeFormatter(value) {
            //     var da = new Date(parseInt(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]));
            //     return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
            // }
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
//getSellList得不到状态为0的，加了getListBySellerid；
exports.getListBySellerid=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/userlist
    dbConnection.query(User.getListBySellerid,[param.sellerid],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
        }
    });
    // dbConnection.end();
};
exports.getUserList=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/getUserList
    dbConnection.query(User.getUserList,[param.userid,param.liststate],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
exports.getSellList=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/getSellList?sellerid=1&liststate=0
    dbConnection.query(User.getSellList,[param.sellerid,param.liststate],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
exports.insertList=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接sellerid,sellername,sellerimgurl,listnum,placename,listtime
    dbConnection.query(User.insertList,[param.sellerid,param.sellername,param.sellerimgurl,param.listnum,
        param.placename,param.listtime],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'插入成功!'}));
        }
        // 数据库存在
        // if (results.length == 0) {
        //     res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        // } else{
        //     // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
        //     var string_res = JSON.stringify(results);
        //     res.send(string_res);
        //     // }
        // }
    });
    // dbConnection.end();
};
exports.updateListUser=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.updateListUser,[param.userid,param.listid],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'修改成功!'}));
        }
    });
    // dbConnection.end();
};
exports.updateListState=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.updateListState,[param.liststate,param.listid],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'修改成功!'}));
        }
    });
    // dbConnection.end();
};
// 修改订单完成时间
exports.updateListFinishTime=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.updateListFinishTime,[param.listfinishtime,param.listid],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'修改成功!'}));
        }
    });
    // dbConnection.end();
};
//增加积分详情
exports.insertPointDetail=function (req, res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接(userid,pointtime,pointreason,pointtype,pointnum)
    dbConnection.query(User.insertPointDetail,[param.userid,param.pointtime,param.pointreason,param.pointtype,
        param.pointnum],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'插入成功!'}));
        }
    });
};
//增加金额详情
exports.insertAccountDetail=function (req, res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接(userid,pointtime,pointreason,pointtype,pointnum)
    dbConnection.query(User.insertAccountDetail,[param.userid,param.accounttime,param.accountreason,param.accounttype,
        param.accountnum],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'插入成功!'}));
        }
    });
};
//增加信用分详情
exports.insertCreditDetail=function (req, res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接(userid,pointtime,pointreason,pointtype,pointnum)
    dbConnection.query(User.insertCreditDetail,[param.userid,param.credittime,param.creditreason,param.credittype,
        param.creditnum],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'插入成功!'}));
        }
    });
};
// {
//     "requestname":"useraccount",表名
//     "requestvalue":"46",标值
//     "userid":1
// }
//修改用户资料
exports.updateUserInfo=function (req, res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接UPDATE user SET ??=? WHERE userid=?
    dbConnection.query(User.updateUserInfo,[param.requestname,param.requestvalue,param.userid],function (err, results){
        if (err) {throw err;}else{
            res.end(JSON.stringify({status:'100',msg:'修改成功!'}));
        }
    });
    // dbConnection.end();
};
exports.getUserInfo=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.getUserInfo,[param.userid],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
        }
    });
    // dbConnection.end();
};
exports.getGiftInfo=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接
    dbConnection.query(User.getGiftInfo,function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
        }
    });
    // dbConnection.end();
};
exports.getPointDetail=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/
    dbConnection.query(User.getPointDetail,[param.userid],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
exports.getCreditDetail=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/getSellList?sellerid=1&liststate=0
    dbConnection.query(User.getCreditDetail,[param.userid],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
exports.getAccountDetail=function (req,res) {
    var param;
    if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params;
    }
    //创建数据库连接http://localhost:3000/getSellList?sellerid=1&liststate=0
    dbConnection.query(User.getAccountDetail,[param.userid],function (err, results){
        if (err) throw err;
        // 数据库存在
        if (results.length == 0) {
            res.send(JSON.stringify({status:'505',msg:'得不到数据'}));
        } else{
            // if (results[0].userphone == param.userphone && results[0].userpassword == param.userpassword) {
            var string_res = JSON.stringify({status:'100',data:results});
            res.send(string_res);
            // }
        }
    });
    // dbConnection.end();
};
