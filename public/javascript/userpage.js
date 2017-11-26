/**
 * Created by Administrator on 2017/5/14.
 */
var myApp = new Framework7();
var $$ = Framework7.$;
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    domCache: true //enable inline pages
});
// 根据屏幕大小改变根元素字体大小
(function(doc,win) {
    var docEL = doc.documentElement,
        resizeEvt = 'orientationchange'in window ? 'orientationchange' : 'resize',
        recalc=function () {
            var clientWidth = docEL.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >=750){
                docEL.style.fontSize='100px';
            } else {
                docEL.style.fontSize=100 * (clientWidth /750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);
function getQueryString(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
var userid = getQueryString("userid");
$$.ajax({
    method:"POST",
    url:"getUserInfo",
    data:{
        "userid":userid
    },
    dataType:"text",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success:function (data) {
        // var temp=eval('('+data+')');
        var temp = JSON.parse(data);
        // alert(temp["data"][0]["userimgurl"]);
        if (temp.status==100){
            $$('#index-url').attr("src",temp["data"][0].userimgurl);
            $$('#info-url').attr("src",temp["data"][0].userimgurl);
            $$('#index-credit').text(temp["data"][0].usercredit);
            $$('#index-point').text(temp["data"][0].userpoint);
            $$('#index-name').text(temp["data"][0].username);
            $$('#info-name').text(temp["data"][0].username);
            $$('#info-sex').text(getSex(temp["data"][0].usersex));
            $$('#info-place').text(temp["data"][0].userplace);
            $$('#info-phone').text(temp["data"][0].userphone);
            $$('#account-money').text(temp["data"][0].useraccount);
            $$('#setting-carrymax').text(temp["data"][0].usercarrymax);
            $$("#point-num").text(temp["data"][0].userpoint);
            $$("#credit-num").text(temp["data"][0].usercredit);
        }

    }
});
function getSex(num) {
    if (num<=0||num>=3) return "未设置";
    if (num=1) return "男";
    if (num=2) return "女";
}

$$.ajax({
    method:"POST",
    url:"getAccountDetail",
    data:{
        "userid":userid
    },
    dataType:"text",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success:function (data) {
        // var temp=eval('('+data+')');
        var temp = JSON.parse(data);
        // alert(temp["data"][0]["userimgurl"]);
        if (temp.status==100){
            $$.each(temp["data"],function (index,item) {
                createDetailList($$("#account-detail"),item["accounttype"],item["accountnum"].toFixed(2),item["accountreason"],item["accounttime"]);
            })
        }
    }
});
$$.ajax({
    method:"POST",
    url:"getCreditDetail",
    data:{
        "userid":userid
    },
    dataType:"text",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success:function (data) {
        // var temp=eval('('+data+')');
        var temp = JSON.parse(data);
        // alert(temp["data"][0]["userimgurl"]);
        if (temp.status==100){
            $$.each(temp["data"],function (index,item) {
                createDetailList($$("#credit-detail"),item["credittype"],item["creditnum"].toFixed(1),item["creditreason"],item["credittime"]);
            })
        }
    }
});
$$.ajax({
    method:"POST",
    url:"getGiftInfo",
    data:{},
    dataType:"text",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success:function (data) {
        // var temp=eval('('+data+')');
        var temp = JSON.parse(data);
        // alert(temp["data"][0]["userimgurl"]);
        if (temp.status==100){
            $$.each(temp["data"],function (index,item) {
                createGiftList($$("#gift-contain"),item["gifturl"],item["giftname"],item["giftpoint"]);
            })
        }
    }
});
// createDetailList($$("#account-detail"),"0","12.2","123","123");
// createGiftList($$("#gift-contain"),"images/img_box.png","小熊玩具","1000");
function createDetailList(element,type, number, message, time) {
    var $$detailnum=$$("<div></div>");
    if (type==0) {$$detailnum.addClass("detail-number-change").html("+"+number);}
    else {$$detailnum.addClass("detail-number-change").html("-"+number);}
    var $$detailmessage=$$("<div></div>").addClass("detail-message").html(message);
    var  $$detailtime=$$("<div></div>").addClass("detail-time").html(time);
    var $$detaillist=$$("<div></div>").addClass("detail-list").append($$detailnum).append($$detailmessage).append($$detailtime);
    var $$line=$$("<div></div>").addClass("mine-line");
    element.append($$line);
    element.append($$detaillist);
}
function createGiftList(element,url, name, point) {
    var $$giftlist=$$("<div></div>").addClass("gift-list");
    var $$giftlistcontent=$$("<div></div>").addClass("gift-list-content");
    var $$giftname=$$("<div></div>").addClass("gift-name").html(name);
    var $$giftpoint=$$("<div></div>").addClass("gift-need-point").html(point);
    var $$giftchoose=$$("<div></div>").addClass("gift-choose").html("立即<br/>兑换");
    var $$giftspan=$$("<span></span>").html("积分");
    var $$giftimg=$$("<img></img>").attr("src",url);
    $$giftpoint.append($$giftspan);
    $$giftlistcontent.append($$giftname).append($$giftpoint);
    $$giftlist.append($$giftimg).append($$giftlistcontent).append($$giftchoose);
    element.append($$giftlist);
}
$$('#btn_credit').on('click',function () {
    $$.ajax({
        method:"POST",
        url:"getUserInfo",
        data:{
            "userid":userid
        },
        dataType:"text",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success:function (data) {
            // var temp=eval('('+data+')');
            var temp = JSON.parse(data);
            // alert(temp["data"][0]["userimgurl"]);
            if (temp.status==100){
                Meter.setOptions({
                    element: 'meter',
                    centerPoint: {
                        x: 180,
                        y: 180
                    },
                    radius: 180,
                    data: {
                        value: temp["data"][0].usercredit,
                        title: '{t}',
                        area: [{
                            min: 350, max: 550, text: '较差'
                        },{
                            min: 550, max: 600, text: '中等'
                        },{
                            min: 600, max: 650, text: '良好'
                        },{
                            min: 650, max: 700, text: '优秀'
                        },{
                            min: 700, max: 950, text: '极好'
                        }]
                    }
                }).init();

            }

        }
    });
});
$$('#btn_invite').on('click', function () {
    var buttons = [
        {
            text: 'QQ',
            bold: true
        },
        {
            text: '微信'
        },
        {
            text: '取消',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});