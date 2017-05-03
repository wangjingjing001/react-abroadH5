import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';
var maxSecond = 60;
var tid;
var cunSecond = 0;//当前剩余时间

var VerifyButton = React.createClass({
	getInitialState() {
		return {
			text: this.props.text,//验证码显示文字
			disabled: this.props.disabled//控制获取验证码能否点击
		}
	},
	componentWillReceiveProps(nextProps) {
		cunSecond == 0 && this.setState({
			disabled: nextProps.disabled//当父组件传来disabled的时候，用本地的state来维护
		});
	},
	_handler() {
		if (!this.state.disabled) {
			cunSecond = maxSecond;
			//出发点击之后，不可点击
			this.setState({
				disabled: true,
			});
			//控制验证码剩余时间
			tid = setInterval(() => {
				if (cunSecond == 0) {
					clearInterval(tid);
					this.setState({
						text: '重新获取',
						disabled: false
					})
				} else {
					cunSecond--;
					this.setState({
						text: cunSecond + '秒后重试'
					});
				}
			}, 1000);
			//执行父组建的handler
			this.props.getCodeHandler && this.props.getCodeHandler();
		}
	},
	render() {
		var codeStyle = styles.code;
		if (this.state.disabled) {
			codeStyle = Object.assign({}, styles.code, {opacity: 0.3})
		}
		return (
			<p style={codeStyle} onClick={this._handler}>{this.state.text}</p>
		);
	}
});
var styles = {
	code: {
		backgroundColor : '#c12e2a',
		padding 		: '6px 10px',
		color 			: '#fff',
		textAlign		: 'center',
		width			: '4rem'
	}
}
module.exports = VerifyButton;