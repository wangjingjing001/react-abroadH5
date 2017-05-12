import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header,
	Back,
	CustomFetch,
	Test,
	VerifyButton,
	NetConfig
} = require('../components');
var RegisterView = React.createClass( {
	getInitialState() {
		return {
			username: '',
			code: '',
			verifyCode: '',
			password: '',
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=2&updata=' + Math.random(),
			verifyCodeDisabled: true,
			submitDisabled: true
		}
	},
	contextTypes: {
		router: React.PropTypes.object,
		showPopUp: React.PropTypes.func,
		toast: React.PropTypes.func
	},
	//输入框赋值
	_userNameInput(e) {
		//匹配输入框，进行赋值
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			var {
				username,
				code,
				password,
				verifyCode,
			} = this.state;
			//根据输入址进行验证
			var usernameValid = Test.validate(username, 'mobile'),	 //手机号验证结果
				codeValid = Test.validate(code, 'imgcode'),			 //图片验证码结果
				passwordValid = Test.validate(password, 'password'),	 //密码验证结果
				verifyCodeValid = Test.validate(verifyCode, 'numcode');//手机验证码结果
			//根据手机号和图片验证码验证结果，控制手机号验证码按钮是否可以点击
			if (usernameValid.code == '00000' && codeValid.code == '00000') {
				this.setState({
					verifyCodeDisabled: false
				});
				//手机号和图片验证码通过，通过手机验证码验证，控制登录按钮是否可以点击
				this.setState({
					submitDisabled: verifyCodeValid.code == '00000' && passwordValid.code == '00000' ? false : true
				});
			} else {
				this.setState({
					verifyCodeDisabled: true
				});
			}
		});
	},
	//清空输入框值
	_clearHandler(type) {
		this.setState({
			[type]: ''
		});
	},
	//获取当前是快捷登录还是手机登录
	_clickHandler(activeIndex) {
		this.setState({
			activeIndex
		})
	},
	//重新获取图片验证码
	_reloadPicCode() {
		this.setState({
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=2&updata=' + Math.random(),
		});
	},
	//获取手机验证码
	_getVerifyCode(){
		var {
			username,
			code 
		} = this.state;
		var postData = {
			api: '/h5api/user/registerSendMessage',
			type: 'post',
			params: {
				mpNumber: username,
				picIdentityCode: code,
			}
		}
		CustomFetch(postData, (res) => {
			if (res.code != 1) {
				this.setState({
					verifyCodeDisabled: true
				});
			}
			this.context.toast(res.msg);
		});
	},
	handleSubmit() {
		var {
			username,
			password,
			code,
			verifyCode,
			submitDisabled
		} = this.state;
		//通过submitDisabled控制点击是否执行逻辑操作
		if (!submitDisabled) {
			var postData = {
				api: '/h5api/user/register',
				params: { 
					mpNumber: username, 
					password: password,
					picIdentityCode: code,
					messageIdentityCode: verifyCode
				}
			}
			CustomFetch(postData, (res) => {
				if (res.code == 1) {
					this.context.toast('注册成功');
					this.context.router.goBack();
				} else {
					this.context.toast(res.msg);
				}
			});	
		} 
	},
	render() {
		var {
			username,
			password,
			picCode,
			verifyCodeDisabled,
			submitDisabled
		} = this.state;
		//根据按钮是否可以点击状态来展示样式。
		var submitStyle = Object.assign({}, styles.submit, submitDisabled ? {opacity: '0.3'} : {}) ;
		return (
			<div>
				<Header title="注册"
						leftButton={
							<Back {...this.props}/>
						}/>
				<div style={styles.contentWrap}>
				    <div style={styles.fastLoginWrap}>
						<div style={styles.loginItem}>
							<img style={styles.loginItemImg} src={require('../statics/login/phone.png')}/>
							<input maxLength={11} style={styles.input} name="username" type="text" placeholder="请输入手机号" value={username} onChange={this._userNameInput}/>
							{username && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={this._clearHandler.bind(this, 'username')}/>}
						</div>
						<div style={styles.line}></div>
						<div style={styles.loginItem}>
							<img style={styles.loginItemImg} src={require('../statics/login/pict.png')}/>
							<input maxLength={4} style={styles.input} name="code" type="text" placeholder="请输入图形验证码" onChange={this._userNameInput}/>
							<img style={{height: '0.8rem'}} src={picCode} onClick={this._reloadPicCode}/>
						</div>
						<div style={styles.line}></div>
						<div style={styles.loginItem}>
							<img style={styles.loginItemImg} src={require('../statics/login/shild.png')}/>
							<input maxLength={6} style={styles.input} name="verifyCode" type="text" placeholder="请输入手机验证码" onChange={this._userNameInput}/>
							<VerifyButton text={'获取验证码'} disabled={verifyCodeDisabled} getCodeHandler={this._getVerifyCode}/>
						</div>
						<div style={styles.line}></div>
						<div style={styles.loginItem}>
							<img style={styles.loginItemImg} src={require('../statics/login/lock.png')}/>
							<input style={styles.input} name="password" type="password" value={password} placeholder="请输入密码" onChange={this._userNameInput}/>
							{password && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={this._clearHandler.bind(this, 'password')}/>}
						</div>
					</div>
				</div>
				<div style={styles.loginWrap}>
					<div style={submitStyle} onClick={this.handleSubmit}>注册</div>
					<img style={styles.logo} src={require('../statics/login/logo.png')}/>
				</div>
			</div>
		);
	}
});
var styles = {
	loginBtn: {
		fontSize 		: '0.4rem',
		backgroundColor :'red',
		color 			: '#fff',
		display 		: 'flex',
		padding 		: '0.16rem'
	},
	contentWrap: {
		paddingTop		: '1rem',
		display			: 'flex',
		flexDirection	: 'row',
		justifyContent	: 'center',
		alignItems		: 'center'
	},
	fastLoginWrap: {
		width			: '84%', 
		padding 		: '0.3rem',
		backgroundColor : 'rgb(239,239,239)',
		display			: 'flex',
		flexDirection	: 'column',
		// margin 			: '0 auto'
	},
	loginItem: {
		display			: 'flex',
		flexDirection	: 'row',
		padding 		: '0.3rem 0',
    	justifyContent	: 'center',
    	alignItems		: 'center',
	},
	loginItemImg: {
		height 			: '0.8rem'
	},
	line: {
		height 			: '1px',
		backgroundColor	: '#d3d3d3',
		width			: '100%'
	},
	input: {
		width 			: '100%',
		height			: '0.8rem',
		marginLeft		: '0.3rem',
		background 		: 'none',
		border 			: 'none'
	},
	clearBtn: {
		width 			: '0.28rem'
	},
	submit: {
		width 			: '84%',
		backgroundColor : '#d9534f',
		fontSize		: '0.6rem',
		color 			: '#fff',
		margin 			: '0 auto',
		marginTop		: '0.6rem',
		textAlign		: 'center',
		lineheight		: '1.5',
		padding 		: '10px 0',
 		border 			: 'none'
	},
	loginWrap: {
		display			: 'flex',
		flexDirection	: 'column',
		justifyContent	: 'center',
		alignItems		: 'center'
	},
	logo: {
		alignSelf		: 'center',
		width			: '5rem',
		position		: 'absolute',
		bottom			: '2rem'
	}
}

module.exports = RegisterView;