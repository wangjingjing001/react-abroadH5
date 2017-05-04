import React, { Component, PropTypes } from 'react';
import {
	Link
} from 'react-router'
var {
	Header,
	Nav,
	Back,
	TipsDialog,
	ItemList,
	CustomFetch,
	NetConfig
} = require('../components');

var SettingView = React.createClass({
	getInitialState() {
		return {
			isShow: false,
			isLogin: true,
			showToast: false,
			courseCount: '',
			serviceCount: '',

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
						<button className=''>留学国家<span className='glyphicon glyphicon-pencil'></span></button>
						<button className=''>学历<span className='glyphicon glyphicon-pencil'></span></button>
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
	contextTypes: {
		router: React.PropTypes.object,
		toast: React.PropTypes.func
	},
	gopage(val) {

		if(this.state.isLogin){
			this.context.router.push(val);
		}else{
			this.context.toast('请先登陆！再开始课程。');
		}
	},
	contentnum() {
		if(this.state.isLogin){
			return <div className="contentNum">1</div>
		}
	},
	_quit() {
		this.setState({
			isLogin: false
		})
	},
	componentWillMount() {
		// var postData = {
		// 	api: '/h5api/userCenter/user_buy_count',
		// 	type: 'post',
		// 	params: {}
		// }
		// CustomFetch(postData, (res) => {
		// 	console.log(res);
		// 	if(res.code == 1){
		// 		this.state.courseCount = res.data.courseCount;
		// 		this.state.serviceCount = res.data.serviceCount;
		// 	}else{
		// 		// return false
		// 	}
		// })
		// CustomFetch({
		// 	api: '/h5api/user/getUserMpNumber',
		// 	type: 'get'
		// }, (res) => {
		// 	console.log('res', res);
		// })
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
				<Nav show={this.state.isShow} isLogin={this.state.isLogin} clearHandler={this._quit}/>
				<ul className="contentList">
					<ItemList src={require("../statics/center/course.png")} contentTitle={"我的课程"} contentnum={this.state.courseCount} isLogin = {this.state.isLogin} page = {'/register'}/>
					<ItemList src={require("../statics/center/service.png")} contentTitle={"我的留学服务"} contentnum={this.state.serviceCount} isLogin = {this.state.isLogin} page = {'/register'}/>
					<ItemList src={require("../statics/center/order.png")} contentTitle={"我的订单"} isLogin = {this.state.isLogin} page = {'/register'}/>
					<ItemList src={require("../statics/center/aboutus.png")} contentTitle={"关于我们"} isLogin = {this.state.isLogin} page = {'/register'}/>
				</ul>
			</div>
		);
	}
})

module.exports = SettingView;