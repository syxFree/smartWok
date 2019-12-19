/** 请求成功的状态码 */
var reveive_file = 'fs://reveivefile.txt'
var search_file = 'fs://searchfile.txt'
/** application/json;charset=UTF-8 */
var APPLICATION_JSON_UTF8_VALUE = "application/json;charset=UTF-8";
var APPLICATION_JSON_UTF8_FORM = 'application/x-www-form-urlencoded;charset=UTF-8';
var AES_KEY = "logalliance_fac1";

var RESPONSE_OK = 20000;
var TOKEN_BEOVERDUE = 40001; // token过期
/** 接口主机地址 */


// var host = 'http://192.168.1.28:9102';
var host = 'http://106.15.102.116:9902'    //线
// var host = 'http://192.168.1.106:9102'   //崔

//外网测试地址
// var host = "http://whale123.free.idcfengye.com";
var interfaces = {
    login: '/sw/auth/login',// 登录
    register:'/sw/auth/register/v2', //注册
    bindPhone:'/sw/auth/bind_phone', //绑定手机号
    setPwd:'/sw/auth/reset_pwd',    //修改密码
    loginId: '/jgj/worker/worker_type', // 判断用户登录身份
    logout: '/jgj/worker/logout',//退出登录
    wxlogin:'/sw/auth/wx_auth',   //微信登录
    sendCode: '/api/common/send_code',//发送验证码
    checkCode:'/api/common/check_code', //校验验证码
    getTcp:'/static_url/content',   //获取用户协议
    informationList:'/sw/news/list',  //咨询列表
    informationBanner:'/sw/news/brand/list',  //咨询轮播图
    informationDetail:'/sw/news',           //咨询详情
    newsShare:'/sw/share/news',    //咨询分享
    goodsShare:'/sw/share/goods',  //商品分享
    goodsList:'/sw/shop/list',    //商品列表
    goodsDetails:'/sw/shop/detial',    //商品详情
    goodsCategory:'/sw/shop/category',    //分类列表
    call:'/sw/shop/phone',    //获取客服电话
    getAddress:'/sw/info/address/def',  //获取默认地址
    getAddressById:'/sw/info/address',  //根据id获取地址
    createOrder:'/sw/order/create',  //创建订单
    payNow:'/sw/order/pay_now',    //立即支付
    getOrderList:'/sw/order',     //获取订单
    cancelOrder:'/sw/order/cancel',  //取消订单
    remindOrder:'/sw/order/remind_ship',  //提醒发货
    getLogistics:'/sw/info/logistics',  //获取物流信息
    deleteOrder:'/sw/order/delete',   //删除订单
    receiptOrder:'/sw/order/receipt',  // 确认收货
    cookbookfun:'/sw/cookbook/functions',    //菜谱功能
    cookbookpost:'/sw/cookbook',   //菜谱保存
    feedback:'/sw/info/feedback', //意见反馈
    upload: '/api/common/upload_image', //上传图片
    area:  '/sw/area/all' ,  //获取地址
    areaone:  '/sw/area' ,  //获取地址
    address:'/sw/info/address' , //新增或更改地址
    info:'/sw/info', //获取个人信息
    aboutus:'/static_url/content', //获取关于我们富文本
    cooklist:'/sw/cookbook/list', //获取菜谱列表
    cookdetail:'/sw/cookbook/detail', //获取菜谱详情
    shareCode:'/sw/cookbook/share_code/', //生成分享码
    infoout:'/sw/info/logout',    //登出
    shopshareCode:'/sw/cookbook/share_code/cookbookId'  //根据分享吗获取商品

};

/**
 * get请求
 * 格式为url?param1=value1&param2=value2

 * @param apiurl 格式为url?param1=value1&param2=value2
 * @param showLoading 是否显示loading
 * @param callback 回调函数
 */
function fnGet(apiurl, param, showLoading, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    if (showLoading) {
        api.showProgress();
    }
    api.ajax(
        {
            url: host + apiurl,
            method: "get",
            timeout: 10,
            cache: true,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken
            },
            data: {
                values: param
            }
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                }
                callback(ret, err);
            } else {
                callback({
                    code: -10000
                }, err);
                api.toast({
                    msg: "服务器连接失败"
                });
                api.refreshHeaderLoadDone();
            }
        }
    );
}

/**
 * delete请求
 * @param apiurl 格式为url/{id}
 * @param callback 回调函数
 */
function fnDelete(apiurl,showLoading, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    if (showLoading) {
        api.showProgress();
    }
    api.ajax(
        {
            url: host + apiurl,
            method: "delete",
            timeout: 10,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_FORM
            },
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                } else {
                    callback(ret, err);
                }
            } else {
                callback({
                    code: -10000
                }, err);
                api.toast({
                    msg: "服务器连接失败"
                });
            }
        }
    );
}

/**
 * put请求，修改操作
 * @param apiurl 请求地址
 * @param data 请求数据，json对象
 * @param callback 回调函数
 */
function fnPut(apiurl, data, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    api.showProgress();
    api.ajax(
        {
            url: host + apiurl,
            method: "put",
            timeout: 10,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_FORM
            },
            data: {
                values: data
            }
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                } else {
                    callback(ret, err);
                }
            } else {
                callback(null, err);
                api.toast({
                    msg: "服务器连接失败"
                });
            }
        }
    );
}
/**
 * put请求，修改操作
 * @param apiurl 请求地址
 * @param data 请求数据，json对象
 * @param callback 回调函数
 */
function fnBodyPut(apiurl, data, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    api.showProgress();
    api.ajax(
        {
            url: host + apiurl,
            method: "put",
            timeout: 10,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_VALUE
            },
            data: {
                body: JSON.stringify(data)
            }
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                } else {
                    callback(ret, err);
                }
            } else {
                callback(null, err);
                api.toast({
                    msg: "服务器连接失败"
                });
            }
        }
    );
}

/**
 * put请求，添加操作
 * @param apiurl 请求地址
 * @param data 请求数据，json对象
 * @param callback 回调函数
 * @param type form：表单方式提交数据或文件 json：json方式提交
 */
function fnPost(apiurl, formdata, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    api.showProgress();
    api.ajax(
        {
            url: host + apiurl,
            method: "post",
            timeout: 10,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_FORM
            },
            data: {
                values: formdata
            }
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                }
                callback(ret, err);
            } else {
                callback({
                    code: -10000
                }, err);
                api.toast({
                    msg: "服务器连接失败"
                });
            }
        }
    );
}

/**
 * post请求，添加操作
 * @param apiurl 请求地址
 * @param data 请求数据，json对象
 * @param callback 回调函数
 * @param type form：表单方式提交数据或文件 json：json方式提交
 */
function fnBodyPost(apiurl, formdata, callback) {
    var nonceStr = guid();
    var timeStamp = new Date().getTime();
    var accessToken = $api.getStorage("accessToken");
    api.showProgress();
    api.ajax(
        {
            url: host + apiurl,
            method: "post",
            timeout: 10,
            headers: {
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                'access-token': accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_VALUE
            },
            data: {
                body: JSON.stringify(formdata)
            }
        },
        function (ret, err) {
            api.hideProgress();
            if (ret) {
                if (ret.code == TOKEN_BEOVERDUE) {
                    toLogin();
                }
                callback(ret, err);
            } else {
                callback({
                    code: -10000
                }, err);
                api.toast({
                    msg: "服务器连接失败"
                });
            }
        }
    );
}

// 去登录
function toLogin() {
    // var jsfun = 'jumpLogin()';
    // api.execScript({
    //     name: 'root',
    //     script: jsfun
    // });
    // $api.rmStorage('accessToken')
    // console.log("跳转到首页")
    api.openWin({
        name: 'login_win',
        url: '../login/login_win.html',
        reload:true,
        pageParam: {
            name: 'test'
        }
    });
    setTimeout(function(){
      api.closeToWin({
          name: 'root'
      });
    },600)

}

/**
 * 获取随机字符串
 * @returns {string}
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
}
