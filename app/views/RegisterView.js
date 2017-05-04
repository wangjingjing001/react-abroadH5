import React, { Component, PropTypes } from 'react';
// import { InputItem } from 'antd-mobile';
import { Link } from 'react-router';
var {
	Header,
	Back,
	CustomFetch
} = require('../components');
var RegisterView = React.createClass( {
	getInitialState() {
		return {
			username: '11111',
			password: '11111'
		}
	},
	componentDidMount() {
		// console.log(this.context.location);
		// console.log(this.props.location);
		CustomFetch({
			api: '/h5api/user/getUserMpNumber',
			type: 'get'
		}, (res) => {
			console.log('res', res);
		})
	},
	contextTypes: {
        router: React.PropTypes.object,
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },
	textHandler() {
		console.log('段落点击');
	},
	handleSubmit() {
		this.context.router.push('/main/setting');
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