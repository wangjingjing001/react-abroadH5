import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header
} = require('../components');
var LoginView = React.createClass( {
	getInitialState() {
		return {
			username: '11111',
			password: '11111'
		}
	},
	statics: {
		open() {
			// this.handleSubmit();
		}
	},
	context: {
		asd: 'asdasd'
	},
	componentWillMount() {
		this.setState({
			username: '11111'
		})
	},
	textHandler() {
		console.log('段落点击');
	},
	handleSubmit() {
		// this.setState({
	 //    	username: '22222';
	 //    })
		this.props.history.pushState(null, '/main/setting');
		// console.log(this.context.history)
	},
	render() {
		return (
			<div>
				<Header title="鹏云课堂-个人中心"
						leftButton={
							<img style={{height: '0.6rem'}} src={require('../statics/back.png')}/>
						}/>
			    <button onClick={this.handleSubmit}>submit</button>
				<p onClick={this.textHandler}>{this.state.username}</p>
				<p>{this.state.password}</p>
			</div>
		);
	}
})

module.exports = LoginView;