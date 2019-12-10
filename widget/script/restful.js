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
// var host = "http://192.168.1.10:8083";
// var host = "http://192.168.1.28:99";


var host = 'http://47.103.28.164:9001';

//外网测试地址
// var host = "http://whale123.free.idcfengye.com";
var interfaces = {
    login: '/jgj/auth/login',// 登录
    loginId: '/jgj/worker/worker_type', // 判断用户登录身份
    logout: '/jgj/worker/logout',//退出登录
    sendCode: '/api/common/send_code',//发送验证码
    mine: '/jgj/worker/info',//我的
    orderList: '/jgj/order/list',//订单列表
    log: '/jgj/order/log',//打电话/发短信记录日志
    returnLog: '/jgj/after_sale/log',//售后打电话/发短信记录日志
    nextSevenDayOrder: '/jgj/order/next_seven_day',//后七天订单列表
    afterSaleOrder: '/jgj/after_sale/list',//售后单列表
    afterSaleOrderDetail: '/jgj/after_sale/detail',//售后单详情
    startService: '/jgj/order/begin',//开始服务
    endService: '/jgj/order/complete',//结束服务
    orderDetail: '/jgj/order/detail',//订单详情
    supplementPrice: '/jgj/order/raise_price',//补价列表
    returnPrice: '/jgj/order/refund',//退款
    schedule: '/jgj/schedule/list',//师傅排期
    saveLeaveMsg: '/jgj/after_sale/leave_msg',//售后订单保存留言
    askHelp: '/jgj/after_sale/need_assist',//请求协助
    startDeal: '/jgj/after_sale',//开始处理
    endDeal: '/jgj/after_sale/complete',//处理完成
    savePhoto: '/jgj/order/service_photo',//拍照
    savePhotoAfterSale: '/jgj/after_sale/photo',//售后拍照
    uploadImg: '/api/common/upload_image',//上传图片
    stopOrderList: '/jgj/stop_order/list',//停单申请列表
    stopOrderApply: '/jgj/stop_order',//提交/编辑停单申请

    salaryFlow: '/jgj/salary_flow',//资金流水
    walletDetail: '/jgj/salary_flow/list',//钱包明细
    summarize: '/jgj/salary_flow/summarize',//流水结算汇总
    sureMoney: '/jgj/salary_flow/confirm',//确认工资
    deductList: '/jgj/salary_flow/deduct',//扣款列表
    deduct_num: '/jgj/salary_flow/deduct_num',//扣款总数
    notice: '/jgj/message/',//消息
    feedBack: '/jgj/salary_flow/feedBack', //提交意见反馈
};
var bmapkey = 'rNXG9T89mOqZXRh0N3M1NgWqQVd6OGuw';
var RSA_PUBLIC = {
    modulus: '-----BEGIN PUBLIC KEY-----\
      MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIqrTXHHzJdmKhGZyp5RcQ24+j7gGDAYK4/YxiE9XoeCjizksDGLkK/lpqeK+flUOLp/uk0tej1QRKAk3BTGxTMCAwEAAQ==\
     -----END PUBLIC KEY-----'//系数
    , exponent: 'AQAB'//指数
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
                access_token: accessToken
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
function fnDelete(apiurl, showLoading, callback) {
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
                access_token: accessToken,
                "Content-Type": APPLICATION_JSON_UTF8_FORM
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
                access_token: accessToken,
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
                access_token: accessToken,
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
                access_token: accessToken,
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
                access_token: accessToken,
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
    var jsfun = 'jumpLogin()';
    api.execScript({
        name: 'root',
        script: jsfun
    });
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
