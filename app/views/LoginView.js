import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link, withRouter } from 'react-router';
var {
	Header,
	Back,
	VerifyButton,
	CustomFetch,
	NetConfig,
	Test,
} = require('../components');

var SplitView = React.createClass({
	getInitialState() {
		return {
			activeTitle: 0
		}
	},
	_titleHandler(index) {
		this.setState({
			activeTitle: index
		});
		//将组建内部当前的tab传给父级
		this.props.clickHandler && this.props.clickHandler(index);
	},
	render() {
		return (
			<div style={styles.splitWrap}>
				<div style={styles.titleWrap}>
					{
						this.props.sliders.map((val, index) => {
							var style = styles.title;
							if (index == this.state.activeTitle) {
								style = Object.assign({}, styles.title, styles.activeTitleStyle);
							}
							return (
								<p style={style} onClick={() => {this._titleHandler(index)}} key={index}>{val}</p>
							);
						})
					}
				</div>
				<div>
					{
						this.props.children.map((val, index) => {
							if (index == this.state.activeTitle) {
								return val;
							}
							return null;
						})
					}
				</div>
			</div>
		)
	}
});

var LoginView = React.createClass( {
	getInitialState() {
		return {
			username: '',				//手机号
			password: '',				//密码
			code: '',					//图片验证码
			verifyCode: '', 			//手机验证码
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=1&updata=' + Math.random(),
			verifyCodeDisabled: true,
			activeIndex: 0,			//0代表是快捷登录，1代表密码登录
			submitDisabled: true 	//登录按钮状态控制
		}
	},
	contextTypes: {
		router: React.PropTypes.object,
		showPopUp: React.PropTypes.func,
		toast: React.PropTypes.func
	},
	shouldComponentUpdate(nextProps, nextState) {
		var {
			// username,
			// password,
			// code,
			// verifyCode,
			activeIndex,
			// verifyCodeDisabled,
			// submitDisabled,
		} = this.state;
		if (nextState.activeIndex != activeIndex) {
			return false;
		}
		return true;
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
				activeIndex
			} = this.state;
			//根据输入址进行验证
			var usernameValid = Test.validate(username, 'mobile'),	 //手机号验证结果
				codeValid = Test.validate(code, 'imgcode'),			 //图片验证码结果
				passwordValid = Test.validate(password, 'password'),	 //密码验证结果
				verifyCodeValid = Test.validate(verifyCode, 'numcode');//手机验证码结果
			//如果是快捷登录时
			if (activeIndex == 0) {
				//根据手机号和图片验证码验证结果，控制手机号验证码按钮是否可以点击
				if (usernameValid.code == '00000' && codeValid.code == '00000') {
					this.setState({
						verifyCodeDisabled: false
					});
					//手机号和图片验证码通过，通过手机验证码验证，控制登录按钮是否可以点击
					this.setState({
						submitDisabled: verifyCodeValid.code == '00000' ? false : true
					});
				} else {
					this.setState({
						verifyCodeDisabled: true
					});
				}
			} else {
				this.setState({
					submitDisabled: usernameValid.code == '00000' && passwordValid.code == '00000' ? false : true
				});
			}
		});
	},
	componentWillUnMount() {
		this.getInitialState();
	},
	handleSubmit() {
		var {
			username,
			password,
			activeIndex,
			code,
			verifyCode,
			submitDisabled
		} = this.state;
		//通过submitDisabled控制点击是否执行逻辑操作
		if (!submitDisabled) {
			var postData = {
				api: '/h5api/user/login',
				params: { 
					mpNumber: username, 
					password: password
				}
			}
			//根据快捷登录和手机登录，调用不同的api。
			if (activeIndex == 0) {
				postData = {
					api: '/h5api/user/messageLogin',
					params: {
						mpNumber: username,
						picIdentityCode: code,
						messageIdentityCode: verifyCode
					}
				}
			}
			CustomFetch(postData, (res) => {
				if (res.code == 1) {
					this.context.toast('登录成功');
					localStorage.setItem('login', true);  					//保存登录状态
					localStorage.setItem('cellphone', this.state.username); //保存登录手机号
					this.context.router.push('/main/setting');
				} else {
					this.context.toast(res.msg);
				}
			});	
		} 
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
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=1&updata=' + Math.random(),
		});
	},
	//获取手机验证码
	_getVerifyCode(){
		var {
			username,
			code 
		} = this.state;
		var postData = {
			api: '/h5api/user/loginSendMessage',
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
				<Header title="鹏云课堂-个人中心"
						leftButton={
							<Back {...this.props}/>
						}
						rightButton={
							<Link style={styles.registerBtn} to={{pathname:'/register', state: {cellphone: username}}}>注册</Link>
						}/>
				<div style={{width: '84%', margin: '0 auto'}}>
					<SplitView sliders={['手机号快捷登录', '账号密码登录']} clickHandler={this._clickHandler}>
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
						</div>
						<div style={styles.fastLoginWrap}>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/user.png')}/>
								<input maxLength={11} style={styles.input} name="username" type="text" placeholder="请输入手机号" value={username} onChange={this._userNameInput}/>
								{username && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={this._clearHandler.bind(this, 'username')}/>}
							</div>
							<div style={styles.line}></div>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/lock.png')}/>
								<input style={styles.input} name="password" type="password" value={password} placeholder="请输入密码" onChange={this._userNameInput}/>
								{password && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={this._clearHandler.bind(this, 'password')}/>}
							</div>
						</div>
					</SplitView>
				</div>
				<div style={styles.loginWrap}>
			    	<div style={submitStyle} onClick={this.handleSubmit}>登录</div>
			    	<img style={styles.logo} src={require('../statics/login/logo.png')}/>
			    </div>
			</div>
		);
	}
});
var styles = {
	registerBtn: {
		fontSize 		: '0.4rem',
		backgroundColor :'red',
		color 			: '#fff',
		display 		: 'flex',
		padding 		: '0.16rem'
	},
	title: {
		display			: 'flex',
		width			: '15rem',
		textAlign		: 'center',
    	fontSize		: '.4rem',
    	alignItems		: 'center',
    	paddingLeft		: '0.3rem',
    	paddingRight	: '0.3rem',
    	justifyContent	: 'center',
    	height			: '1rem',
    	fontWeight		: '900',
    	borderBottom 	: '0.08rem solid #fff'
	},
	titleWrap: {
		display 		: 'flex',
		flexDirection 	: 'row',
		alignItems		: 'center',
		width			: '100%',
		overflowX 		: 'auto',
		whiteSpace		: 'nowrap',
		padding			: '0.2rem',
		flexWrap 		: 'nowrap'
	},
	activeTitleStyle: {
		color 			: '#009b9b',
		borderBottom	: '.08rem solid #009b9b'
	},
	fastLoginWrap: {
		padding 		: '0.3rem',
		backgroundColor : 'rgb(239,239,239)',
		display			: 'flex',
		flexDirection	: 'column' 
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

module.exports = LoginView;