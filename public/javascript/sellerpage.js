/**
 * Created by Administrator on 2017/5/14.
 */
/**
 * Created by Administrator on 2017/5/3.
 */
// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;

// Add view
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
// var creditnum;
$$.getJSON("getUserInfo",{userid:userid},function (data) {
    // window.onload.creditnum=data[0].usercredit;
    $$('#index-url').attr("src",data[0].userimgurl);
    $$('#info-url').attr("src",data[0].userimgurl);
    $$('#index-credit').text(data[0].usercredit);
    $$('#index-name').text(data[0].username);
    $$('#info-name').text(data[0].username);
    $$('#info-sex').text(getSex(data[0].usersex));
    $$('#info-place').text(data[0].userplace);
    $$('#info-phone').text(data[0].userphone);
    $$('#account-money').text(data[0].useraccount);
    $$('#setting-carrymax').text(data[0].usercarrymax);
    $$("#credit-num").text(data[0].usercredit);
});
function getSex(num) {
    if (num<=0||num>=3) return "未设置";
    if (num=1) return "男";
    if (num=2) return "女";
}
// $$.getJSON("getAccountDetail",{userid:userid},function (data) {
//     var element = $$("#account-detail");
//     $$.each(data,function(index,item){
//         createDetailList(element,item["accounttype"],item["accountnumber"],item["accountreason"],item["accounttime"]);
//     });
// });
// var accountdetailc=;
// <div class="detail-number-change">+12.90</div>
//     <div class="detail-message">平台转账</div>
//     <div class="detail-time">2017/03/18 09:23</div>
// createDetailList($("#account-detail"),0,'12.2',"123","123");
function createDetailList(element,type, number, message, time) {

    var detailnum = document.createElement("div"),
        detailmessage=document.createElement("div"),
        detailtime=document.createElement("div"),
        detaillist=document.createElement("div"),
        messagetext=document.createTextNode(message),
        timetext=document.createTextNode(time),
        numbertext;
    if (type==0) {numbertext=document.createTextNode("+"+number);}
    else {numbertext=document.createTextNode("-"+number);}
    detailnum.setAttribute("class","detail-number-change");
    detailmessage.setAttribute("class","detail-message");
    detailtime.setAttribute("class","detail-time");
    detaillist.setAttribute("class","detail-list");
    detailnum.appendChild(numbertext);
    detailmessage.appendChild(messagetext);
    detailtime.appendChild(timetext);
    detaillist.appendChild(detailnum).appendChild(detailmessage).appendChild(detailtime);
    element.add(detaillist);
}
window.onload = function(){
    $$.getJSON("getUserInfo",{userid:userid},function (data) {
        Meter.setOptions({
            element: 'meter',
            centerPoint: {
                x: 180,
                y: 180
            },
            radius: 180,
            data: {
                value: data[0].usercredit,
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
    });
}