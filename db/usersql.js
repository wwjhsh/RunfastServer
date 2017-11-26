/**
 * Created by Administrator on 2017/1/24.
 */
var UserSQL = {
    updatePassword:"UPDATE user SET userpassword=? WHERE userphone = ? AND usertype = ?",
    insert:'INSERT INTO user SET ?',
    // queryAll:'SELECT * FROM user',
    getUserByInfo:'SELECT * FROM user WHERE userphone = ? AND userpassword = ?' ,
    getUserByInfoType:'SELECT * FROM user WHERE userphone = ? AND userpassword = ? AND usertype =?',
    getList:'SELECT list.listid,list.sellerid,list.sellername,DATE_FORMAT(list.listtime,"%Y/%m/%d %H:%i") AS listtime,list.listnum,list.placename,' +
    'user.userimgurl FROM list,user WHERE list.sellerid = user.userid AND list.liststate=0',
    getUserList:'SELECT list.listid,list.sellerid,list.sellername,list.sellerimgurl,list.listnum,list.placename,' +
    'DATE_FORMAT(list.listtime,"%Y/%m/%d %H:%i") AS listtime,DATE_FORMAT(list.listfinishtime,"%Y/%m/%d %H:%i") AS listfinishtime,user.userimgurl FROM list,user WHERE list.sellerid = user.userid AND list.userid = ?  AND list.liststate=?',
    getSellList:'SELECT l1.listid,l1.sellerid,l1.sellername,l1.listnum,l1.placename,DATE_FORMAT(l1.listtime,"%Y/%m/%d %H:%i") AS listtime,DATE_FORMAT(l1.listfinishtime,"%Y/%m/%d %H:%i") AS listfinishtime,u2.username,u2.userimgurl,' +
    'u2.userphone  FROM list l1,user u1,user u2 WHERE l1.sellerid = u1.userid AND l1.userid = u2.userid AND l1.sellerid=? AND l1.liststate=?',
    getListBySellerid:'SELECT list.listid,list.sellerid,list.sellername,DATE_FORMAT(list.listtime,"%Y/%m/%d %H:%i") AS listtime,list.listnum,list.placename,' +
'user.userimgurl FROM list,user WHERE list.sellerid = user.userid AND list.liststate=0 AND list.sellerid=?',
    insertList:"INSERT INTO list(sellerid,sellername,sellerimgurl,listnum,placename,listtime) VALUES(?,?,?,?,?,?)",
    updateListUser:"UPDATE list SET userid=? WHERE listid=?",
    updateListState:"UPDATE list SET liststate=? WHERE listid=?",
    updateListFinishTime:"UPDATE list SET listfinishtime=? WHERE listid=?",

    updateUserInfo:"UPDATE user SET ??=? WHERE userid=?",
    getUserInfo:"SELECT * FROM user WHERE userid = ?",
    getGiftInfo:"SELECT * FROM gift",
    getPointDetail:"SELECT * FROM pointdetail WHERE userid = ?",
    getCreditDetail:"SELECT creditdetailid, userid,creditreason,credittype,creditnum, DATE_FORMAT(creditdetail.credittime,'%Y/%m/%d %H:%i') AS credittime FROM creditdetail WHERE userid = ?",
    getAccountDetail:"SELECT accountdetailid, userid,accountreason,accounttype,accountnum, DATE_FORMAT(accountdetail.accounttime,'%Y/%m/%d %H:%i') AS accounttime FROM accountdetail WHERE userid = ?",
    insertAccountDetail:"INSERT INTO accountdetail(userid,accounttime,accountreason,accounttype,accountnum) VALUES(?,?,?,?,?)",
    insertCreditDetail:"INSERT INTO creditdetail(userid,credittime,creditreason,credittype,creditnum) VALUES(?,?,?,?,?)",
    insertPointDetail:"INSERT INTO pointdetail(userid,pointtime,pointreason,pointtype,pointnum) VALUES(?,?,?,?,?)"
};
module.exports = UserSQL;