import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var WechatMask = React.createClass({
	contextTypes: {
		router: React.PropTypes.object,
		toast: React.PropTypes.func
	},
	_handler() {
		if(this.props.isLogin === 'true'){
			this.context.router.push(this.props.page);
		}else if(this.props.isLogin === 'false'){
			this.context.toast('请先登陆！再开始课程。');
		}
	},
	_Hide(){
		this.props.weChatHide && this.props.weChatHide();
	},
	render() {
		return (
			<div style={styles.mask}>
				<img src={this.props.src} alt="" style={styles.close} onClick={this._Hide}/>
				<div style={styles.text}>
					<p>{this.props.textLine1}</p>
					<p>{this.props.textLine2}</p>
				</div>
				<img src={this.props.weChatImg} alt="" style={styles.weChatImg}/>
				<p style={styles.weChatTips}>长按识别二维码</p>
			</div>
		);
	}
});
var styles = {
	mask:{
		width:'100%',
		height:'100%',
		background:"rgba(0,0,0,0.8)",
		position:"fixed",
		top:'0',
		left:'0',
		padding:'2rem',
		textAlign:'center',
	},
	close:{
		width:"13%",
		position:'absolute',
		top:'1rem',
		right:'1rem',
	},
	text:{
		color:'#6bc5cb',
		fontSize:'0.6rem',
		textAlign:'center',
		marginTop:'3rem',
		marginBottom:'10px',
	},
	weChatImg:{
		width:"4.5rem",
	},
	weChatTips:{
		color:'#fff',
		fontSize:'0.5rem',
		marginTop:'0.3rem',
	}
}
module.exports = WechatMask;