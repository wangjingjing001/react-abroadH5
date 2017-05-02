import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header,
	Back,
	VerifyButton,
	CustomFetch,
	NetConfig
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
		})
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
			username: '',
			password: '',
			code: '',
			verifyCode: '',
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=1&updata=' + Math.random(),
			verifyCodeDisabled: true
		}
	},
	componentWillMount() {
		console.log(this)
	},
	_userNameInput(e) {
		this.setState({
			[e.target.name]:e.target.value,
			verifyCodeDisabled: false
		});
	},
	handleSubmit() {
		this.props.history.pushState(null, '/main/setting');
		// console.log(this.context.history)
	},
	_clearHandler(type) {
		this.setState({
			[type]: ''
		})
	},
	_reloadPicCode() {
		this.setState({
			picCode: NetConfig.api_server + '/h5api/user/picIdentityCode?type=1&updata=' + Math.random(),
		});
	},
	_getVerifyCode(){

	},
	render() {
		return (
			<div>
				<Header title="鹏云课堂-个人中心"
						leftButton={
							<Back {...this.props}/>
						}
						rightButton={
							<Link style={styles.registerBtn} to={{pathname:'/register', state: {cellphone: '13146654647'}}}>注册</Link>
						}/>
				<div style={{width: '84%', margin: '0 auto'}}>
					<SplitView sliders={['手机号快捷登录', '账号密码登录']}>
						<div style={styles.fastLoginWrap}>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/phone.png')}/>
								<input style={styles.input} name="username" type="text" placeholder="请输入手机号" value={this.state.username} onChange={this._userNameInput}/>
								{this.state.username && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={() => {this._clearHandler('username')}}/>}
							</div>
							<div style={styles.line}></div>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/pict.png')}/>
								<input style={styles.input} name="code" type="text" placeholder="请输入图形验证码" onChange={this._userNameInput}/>
								<img style={{height: '0.8rem'}} src={this.state.picCode} onClick={this._reloadPicCode}/>
							</div>
							<div style={styles.line}></div>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/shild.png')}/>
								<input style={styles.input} name="verifyCode" type="text" placeholder="请输入手机验证码" onChange={this._userNameInput}/>
								<VerifyButton text={'获取验证码'} disabled={this.state.verifyCodeDisabled} getCodeHandler={this._getVerifyCode}/>
							</div>
						</div>
						<div style={styles.fastLoginWrap}>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/user.png')}/>
								<input style={styles.input} name="username" type="text" placeholder="请输入手机号" value={this.state.username} onChange={this._userNameInput}/>
								{this.state.username && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={() => {this._clearHandler('username')}}/>}
							</div>
							<div style={styles.line}></div>
							<div style={styles.loginItem}>
								<img style={styles.loginItemImg} src={require('../statics/login/lock.png')}/>
								<input style={styles.input} name="password" type="text" placeholder="请输入密码" onChange={this._userNameInput}/>
								{this.state.password && <img style={styles.clearBtn} src={require('../statics/login/x.png')} onClick={() => {this._clearHandler('password')}}/>}
							</div>
						</div>
					</SplitView>
				</div>
				
			    <button onClick={this.handleSubmit}>submit</button>
				<p style={{height: '1rem', backgroundColor: 'red', textAlign: 'center', lineHeight: '1rem'}}>{this.state.password}</p>
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
	}
}

module.exports = LoginView;