import React, { Component, PropTypes } from 'react';
import {
	Link
} from 'react-router'
var {
	Header,
	Nav,
	Back
} = require('../components');

var SettingView = React.createClass({
	getInitialState() {
		return {
			isShow: false,
			isLogin: false,
		}
	},
	handleNav() {
		this.setState ({
			isShow: !this.state.isShow
		})
	},
	handleLogin() {
		this.props.history.pushState(null, '/');
	},
	handleRegister() {
		this.props.history.pushState(null, '/register');
	},
	isLogin() {
		if(this.state.isLogin){
			return (
				<div className="userpage">
					<img className='userDefault' src={require('../statics/center/default.png')} />
					<div className='btn-group group logined'>
						<div className='mobile'>13212121212</div>
						<button className=''>英国<span className='glyphicon glyphicon-pencil'></span></button>
						<button className=''>学士<span className='glyphicon glyphicon-pencil'></span></button>
					</div>
				</div>
			);
		}else{
			return (
				<div className="userpage">
					<img className='userDefault' src={require('../statics/center/default.png')} />
					<div className='btn-group group'>
						<button className='btn btn-default' onClick={this.handleLogin}>登陆</button>
						<button className='btn btn-default' onClick={this.handleRegister}>注册</button>
					</div>
				</div>
			);
		}
	},
	render() {
		return (
			<div>
				<Header title="鹏云留学-个人中心"
						rightButton={
							<img style={{height: '0.875rem'}} src={require('../statics/nav.png')} onClick={this.handleNav}/>
						}/>
				
				{
					this.isLogin()
				}
				<Nav show={this.state.isShow}/>
				<ul className="contentList">
					<li>
						<img src={require("../statics/center/course.png")} className="itemIcon" alt="" />
						<span>我的课程</span>
					</li>
					<li>b</li>
					<li>c</li>
					<li>d</li>
				</ul>
			</div>
		);
	}
})

module.exports = SettingView;