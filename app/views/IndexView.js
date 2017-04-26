import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Login = React.createClass({
	render() {
		if (this.props.isLogin) {
			return <p>用户名</p>;
		}
		return <Link to="/login">去登录</Link>;
	}
})

var IndexView = React.createClass({
	getInitialState() {
		return {
			isLogin: false
		}
	},
	render() {
		return (
			<div>
				IndexView
				<Login/>
			</div>
		);
	}
});
module.exports = IndexView;