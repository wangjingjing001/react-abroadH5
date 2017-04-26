import React, { Component, PropTypes } from 'react';
var {
	Header
} = require('../components');
var {
	LoginView
} = require('./');
var SettingView = React.createClass({
	handleNav() {

	},
	handleLogin() {
		this.props.history.pushState(null, '/');
	},
	render() {
		LoginView.open();
		return (
			<div>
				<Header title="鹏云留学-个人中心"
						rightButton={
							<img style={{height: '0.875rem'}} src={require('../statics/nav.png')} onClick={this.handleNav}/>
						}/>
				<div className="userpage">
					<img className='userDefault' src={require('../statics/default.png')} />
					<div className='btn-group'>
						<button className='btn btn-default' onClick={this.handleLogin}>登陆</button>
						<button className='btn btn-default'>注册</button>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = SettingView;