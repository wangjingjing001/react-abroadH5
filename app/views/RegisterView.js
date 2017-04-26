import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header,
	Back
} = require('../components');
var RegisterView = React.createClass( {
	getInitialState() {
		return {
			username: '11111',
			password: '11111'
		}
	},
	componentDidMount() {
	    console.log(this.props.location.state.cellphone);
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
				<Header title="注册"
						leftButton={
							<Back {...this.props}/>
						}/>
			    <button style={{fontSize: '0.45rem'}} onClick={this.handleSubmit}>注册</button>
			</div>
		);
	}
})

module.exports = RegisterView;