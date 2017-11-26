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
    dynamicNavbar: true
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
var infoJson=[
    {
        "time":"2017/04/03 13:45",
        "title":"阿达的美食店投诉了你",
        "imgUrl":"images/icon_tousu.png",
        "text":"配送编号123单子未送达"

    }
];
initInfo();
function initInfo() {
    var jsonList=infoJson;
    var time="",
        title="",
        imgUrl="",
        text="";
    for (var i = 0 ; i <jsonList.length; i++){
        var infoObj=jsonList[i];
        time=infoObj.time;
        title=infoObj.title;
        imgUrl=infoObj.imgUrl;
        text=infoObj.text;
        createInfoItem($$(".page-content"),time,title,imgUrl,text);
    }
}
// function createInfoItem(time,title,imgUrl,text){
function createInfoItem(element,time,title,imgUrl,text) {
    var $$infoitemtime=$$("<div></div>");
    $$infoitemtime.addClass("info-item-time").html(time);
    var $$infoitemcontent=$$("<div></div>").addClass("info-item-content");
    var $$infoitemtitle=$$("<div></div>").addClass("info-item-title").html(title);
    var $$infoitemtext=$$("<div></div>").addClass("info-item-text").html(text);
    var $$adiv=$$("<div></div>");
    var $$infoitemimg=$$("<img/>");
    var $$infoitem=$$("<div></div>").addClass("info-item");
    $$infoitemimg.attr("src",imgUrl);
    $$adiv.append($$infoitemimg).append($$infoitemtext);
    $$infoitemcontent.append($$infoitemtitle).append($$adiv);
    $$infoitem.append($$infoitemtime).append($$infoitemcontent);
    element.append($$infoitem);
}