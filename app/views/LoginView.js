import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header,
	Back
} = require('../components');
var LoginView = React.createClass( {
	getInitialState() {
		return {
			username: '11111',
			password: '11111'
		}
	},
	componentWillMount() {
	},
	textHandler() {
		console.log('段落点击');
	},
	handleSubmit() {
		this.props.history.pushState(null, '/main/setting');
		// console.log(this.context.history)
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
			    <button onClick={this.handleSubmit}>submit</button>
				<p onClick={this.textHandler}>{this.state.username}</p>
				<p>{this.state.password}</p>
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
	}
}

module.exports = LoginView;