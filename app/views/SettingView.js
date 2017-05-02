import React, { Component, PropTypes } from 'react';
import {
	Link
} from 'react-router'
var {
	Header,
	Nav
} = require('../components');

var SettingView = React.createClass({
	getInitialState() {
		return {
			isShow: false
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
	render() {
		return (
			<div>
				<Header title="鹏云留学-个人中心"
						leftButton={
							<img style={{height: '0.875rem'}} src={require('../statics/back.png')} onClick={this.handleNav}/>
						}
						rightButton={
							<img style={{height: '0.875rem'}} src={require('../statics/nav.png')} onClick={this.handleNav}/>
						}/>
				<div className="userpage">
					<img className='userDefault' src={require('../statics/default.png')} />
					<div className='btn-group'>
						<button className='btn btn-default' onClick={this.handleLogin}>登陆</button>
						<button className='btn btn-default' onClick={this.handleRegister}>注册</button>
					</div>
				</div>
				<Nav show={this.state.isShow} navLi={
					<ul>
						<a href="http://www.pengyunliuxue.com"><li><span className="glyphicon glyphicon-home"></span>首页</li></a>
						<a href="http://www.pengyunliuxue.com"><li>留学院校库</li></a>
						<Link to="http://www.pengyunliuxue.com"><li>留学公开课</li></Link>
						<a href="http://www.pengyunliuxue.com"><li>问学长/问导师</li></a>
						<Link to="http://www.pengyunliuxue.com"><li>如何学习</li></Link>
						<Link to="/main/setting" onClick={this.handleNav}><li>个人中心</li></Link>
						<li><Link to="/">登陆</Link>/<Link to="/register">注册</Link></li>
					</ul>
				}/>
			</div>
		);
	}
})

module.exports = SettingView;