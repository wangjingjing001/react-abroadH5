//debug,打印信息
var Log = {
    info: function ( api, data, resp ) {
        if ( !!console ) {
            console.groupCollapsed && console.groupCollapsed(api);
            console.log('请求数据: ', data);
            console.log('返回数据: ', JSON.stringify(resp));
            console.groupEnd && console.groupEnd(api);
        }
    },
    error: function ( api, data, resp ) {
        if ( !!console ) {
            console.group && console.group(api);
            console.log('请求数据: ', data);
            console.error('返回数据: ', JSON.stringify(resp));
            console.groupEnd && console.groupEnd(api);
        }
    },
    use: function ( api, data, resp ) {
        if ( resp.code == 0 ) {
            this.info( api, data, resp );
        } else {
            this.error( api, data, resp );
        }
    }
};
var {
	NetConfig
} = require('../');

/*错误信息*/
var _errorType = {
    500: {
        "code":500,
        "error_id":"500",
        "message":"服务器出现异常",
        "result":null
    },
    404: {
        "code":404,
        "error_id":"404",
        "message":"您访问的页面不存在",
        "result":null
    },
    0: {
        "code":0,
        "error_id":"0",
        "message":"与服务器通信失败！",
        "result":null
    }
};
//当发生错误时，错误信息展示。
var _showErrorMsg = function ( error ) {
    switch( error.status ) {
        case 0:return _errorType[0];break;
        case 404:return _errorType[404];break;
        case 500:return _errorType[500];break;
        default :return "出错了，请重试！";break;
    }
};
var CustomFetch = (reqData, success, error) => {
	var inputData = reqData.params || {};
	var header = reqData.header || {};
	var type = reqData.type || 'post';
	var url = NetConfig.api_server + reqData.api;
	if (type.toUpperCase() == 'GET') {
		url = url + '?';
		//将页面传的json对象转化成params，叠加至url后面。
		for (var name in inputData) {
            url += name + '=' + inputData[name] + '&';
        }
        //去除url字符串最后一个'&'字符
        url = url.substring(0, url.length - 1);
	} else {//POST请求
		inputData.apikey = 'a0f7127a018342a38d00937af0355c25';
		header['Content-Type'] = 'application/json';
	}
	$.ajax({
        type    : type.toUpperCase(),
        url     : url,
        headers : header,
        data    : JSON.stringify(inputData),
    }).done(function ( data, textStatus, jqXHR ) {
        Log && Log.use( reqData.api, inputData, data );
        if ( typeof success === 'function' ) {
            success( data, reqData.api, inputData );
        }
    }).fail(function ( jqXHR, textStatus, errorThrown ) {
        Log && Log.use( reqData.api, inputData, jqXHR );
        var error_msg = _showErrorMsg(jqXHR);
        if ( typeof error === 'function' ) {
            error( jqXHR, textStatus, errorThrown,error_msg );
        }
    });
}

module.exports = CustomFetch;