// 调用需要传两个参数
// Test.validate(val,type)
// val:输入的值
// type:验证的类型 mobile:验证手机号 password：验证密码 imgcode：验证图片验证码 numcode：验证短信验证码

var test = {
	msg : {
		'00000' : '输入成功',
		'00001' : '不能为空',
		'00002' : '输入格式不正确',
		'00003' : '输入正确的验证类型',
	},
	reg : {
		mobileReg : /^1[3|4|5|7|8][0-9]{9}$/, //手机号验证
		passwordReg : /^[0-9a-zA-Z]{6,18}$/, //密码验证（6-18位数据或字母）
		imgcodeReg : /^\d{4}$/, //图片验证码验证
		numcodeReg : /^\d{6}$/, //短信验证码验证
	},
	validate(val,type) {
		val = $.trim(val);
		// 定义验证正则和验证类型变量
		var testReg,testType;
		if(type == 'mobile'){
			testReg = this.reg.mobileReg;
			testType = '手机号';
		}
		if(type == 'password'){
			testReg = this.reg.passwordReg;
			testType = '密码';
		}
		if(type == 'imgcode'){
			testReg = this.reg.imgcodeReg;
			testType = '图片验证码';
		}
		if(type == 'numcode'){
			testReg = this.reg.numcodeReg;
			testType = '短信验证码';
		}
		if(testReg == undefined){
			return {
	            code  : '00003',
	            errorMsg : this.msg['00003'],
	            val : val
	        };
		}
		if(val == ''){
			return {
	            code  : '00001',
	            errorMsg : testType+this.msg['00001'],
	            val : val
	        };
		}
		if(!testReg.test(val)){
			return {
	            code  : '00002',
	            errorMsg : testType+this.msg['00002'],
	            val : val
	        };
		}
		return {
			code  : '00000',
            errorMsg : testType+this.msg['00000'],
            val : val
		}
	}
};

module.exports = test;
