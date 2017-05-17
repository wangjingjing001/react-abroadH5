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
	NetConfig,
	IdentityTag,
	WechatMask,
} = require('../components');

var SettingView = React.createClass({
	getInitialState() {
		return {
			isShow: false,
			isLogin: localStorage.getItem('login'),
			showToast: false,
			courseCount: '',
			serviceCount: '',
			orderCount: '',
			countryList:[],
			diplomaList:[],
			countryId:'留学国家',
			educationLevel:'学历',
			CtagisShow: false,
			DtagisShow: false,
			WechatGroupMask:false,
			WechatNumberMask:false,

		}
	},
	handleNav() {
		this.setState ({
			isShow: !this.state.isShow
		})
	},
	clearhandleCTag() {
		this.setState ({
			CtagisShow: !this.state.CtagisShow
		})
	},
	clearhandleDTag() {
		this.setState ({
			DtagisShow: !this.state.DtagisShow
		})
	},
	handleLogin() {
		this.props.history.pushState(null, '/');
	},
	handleRegister() {
		this.props.history.pushState(null, '/register');
	},
	isLogin() {
		let{
			isLogin,
			countryId,
			educationLevel,
		} = this.state;
		if(isLogin === 'true'){
			return (
				<div className="userpage">
					<img className='userDefault' src={require('../statics/center/default.png')} />
					<div className='btn-group group logined'>
						<div className='mobile'>{localStorage.getItem('cellphone')}</div>
						<button className='' onClick={this.clearhandleCTag}>{countryId}<span className='glyphicon glyphicon-pencil'></span></button>
						<button className='' onClick={this.clearhandleDTag}>{educationLevel}<span className='glyphicon glyphicon-pencil'></span></button>
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

		if(this.state.isLogin === 'true'){
			this.context.router.push(val);
		}else{
			this.context.toast('请先登陆！再开始课程。');
		}
	},
	_quit() {
		this.setState({
			isLogin: 'false'
		},() => {
			var postData = {
				api: '/user/exitLogin',
				type: 'post',
				params: {}
			}
			CustomFetch(postData, (res) => {
				if(res.code == 1){
					localStorage.clear();
				}
			})
			
		})

	},
	componentWillMount() {
		this.setState({
			isLogin: (localStorage.getItem('login')) ? 'true' : 'false'
		})
		var postData = {
			api: '/h5api/userCenter/user_buy_count',
			type: 'post',
			params: {}
		}
		CustomFetch(postData, (res) => {
			if(res.code == 1){
				this.setState({
					courseCount : res.data.courseCount,
					serviceCount : res.data.serviceCount,
					orderCount : res.data.orderCount,
				})
			}else{
				// return false
			}
		});
		CustomFetch({
			api: '/h5api/user/getUserMpNumber',
			type: 'get'
		}, (res) => {
			if(res.code == 1){
				var countryIdNum = res.data[0]['4'].countryId;
				var countryId;
				switch(countryIdNum){
				case '1':
				  countryId='美国';
				  break;
				case '5':
				  countryId='英国';
				  break;
				case '6':
				  countryId='澳大利亚';
				  break;
				case '7':
				  countryId='其它';
				  break;
				default:
				  countryId='留学国家';
				}
				var educationLevelIdNum = res.data[0]['4'].educationLevel;
				var educationLevel;
				switch(educationLevelIdNum){
				case '1':
				  educationLevel='中学';
				  break;
				case '2':
				  educationLevel='本科';
				  break;
				case '3':
				  educationLevel='硕士';
				  break;
				case '4':
				  educationLevel='博士';
				  break;
				case '5':
				  educationLevel='其它';
				  break;
				default:
				  educationLevel='学历';
				}
				this.setState({
					countryList : res.data[0]['3'],
					diplomaList : res.data[0]['2'],
					countryId : countryId,
					educationLevel : educationLevel,
				})
			}else{
				this.context.toast(res.msg);
			}
		})
		
	},
	_saveUserInfo(tagType,id) {
		if(tagType === 'country'){
			var tag={
				countryId:id,
			}
		}else{
			var tag={
				educationLevel:id,
			}
		}
		var postData = {
			api: '/h5api/userCenter/saveUserInfo',
			type: 'post',
			params: tag,
		}
		CustomFetch(postData, (res) => {
			var countryId,educationLevel;
			if(res.code == 1){
				if(tagType === 'country'){
					switch(id){
					case 1:
					  countryId='美国';
					  break;
					case 5:
					  countryId='英国';
					  break;
					case 6:
					  countryId='澳大利亚';
					  break;
					case 7:
					  countryId='其它';
					  break;
					default:
					  countryId='留学国家';
					}
					this.setState({
						countryId : countryId,
					})
				}else{
					switch(id){
					case 1:
					  educationLevel='中学';
					  break;
					case 2:
					  educationLevel='本科';
					  break;
					case 3:
					  educationLevel='硕士';
					  break;
					case 4:
					  educationLevel='博士';
					  break;
					case 5:
					  educationLevel='其它';
					  break;
					default:
					  educationLevel='学历';
					}
					this.setState({
						educationLevel : educationLevel,
					})
				}
			}else{
				// return false
			}
		});
	},
	_weChatNumberHide(){
		this.setState ({
			WechatNumberMask: !this.state.WechatNumberMask,
		})
	},
	_weChatGroupHide(){
		this.setState ({
			WechatGroupMask: !this.state.WechatGroupMask,
		})
	},
	componentWillUpdate() {
		
	},
	_IdentityTag(){
		let _imgurl = require("../statics/center/country.png"),
			_fontText = '选择你留学的国家',
			_list = this.state.countryList,
			_class = 'country',
			_clearhandleTag = this.clearhandleCTag,
			_info = 'country';
		if(this.state.DtagisShow){
			_imgurl = require("../statics/center/diploma.png"),
			_fontText = '选择你出国的教育层次',
			_list = this.state.diplomaList,
			_class = 'diploma',
			_clearhandleTag = this.clearhandleDTag,
			_info = 'diploma';
		}
		if (this.state.DtagisShow || this.state.CtagisShow) {
			return <IdentityTag src={_imgurl} tagFont={_fontText} tagList={_list} tagClass={_class} clearhandleTag={_clearhandleTag} tagSave={this._saveUserInfo}/>			
		}
	},
	_weChat(){
		let _src = require("../statics/center/close.png"),
			_textLine1 = '添加微信客服',
			_textLine2 = 'pengyunlx申请加群',
			_weChatImg = 'http://picture.pengyunliuxue.com/group2/M00/03/04/rBABGVju4ieAIXyNAACYHwsyur0874.png';
		if(this.state.WechatNumberMask){
			_textLine1 = '官方微信公众号',
			_textLine2 = 'pengyunliuxue',
			_weChatImg = 'http://picture.pengyunliuxue.com/group2/M00/03/04/rBABGVju4neAFKI4AAEK249JCdg252.png';
		}
		if(this.state.WechatNumberMask){
			return <WechatMask src={_src} textLine1={_textLine1} textLine2={_textLine2} weChatImg={_weChatImg} weChatHide={this._weChatNumberHide}></WechatMask>
		}else if(this.state.WechatGroupMask){
			return <WechatMask src={_src} textLine1={_textLine1} textLine2={_textLine2} weChatImg={_weChatImg} weChatHide={this._weChatGroupHide}></WechatMask>
		}
	},
	render() {
		let {
			isLogin,
			country,
			courseCount,
			serviceCount,
			orderCount,
			isShow,
		} = this.state;
		return (
			<div style={{background:'#efefef'}}>
				<Header title="鹏云留学-个人中心"
					rightButton={
						<img style={{height: '0.875rem'}} src={require('../statics/nav.png')} onClick={this.handleNav}/>
					}/>
				{
					this.isLogin()
				}
				<Nav style={{background:'#fff'}} show={isShow} isLogin={isLogin} clearHandler={this._quit}/>
				<ul style={{background:'#fff'}} className="contentList">
					<ItemList src={require("../statics/center/course.png")} contentTitle={"我的课程"} contentnum={courseCount} isLogin={isLogin} page = {'/register'} menuRight/>
					<ItemList src={require("../statics/center/service.png")} contentTitle={"我的留学服务"} contentnum={serviceCount} isLogin = {isLogin} page = {'/register'} menuRight/>
					<ItemList src={require("../statics/center/order.png")} contentTitle={"我的订单"} contentnum={orderCount} isLogin = {isLogin} page = {'/register'} menuRight/>
					<ItemList src={require("../statics/center/aboutus.png")} contentTitle={"关于我们"} isLogin = {isLogin} page = {'/register'} menuRight/>
				</ul>
				{
					this._IdentityTag()
				}
				<ul className="contentList" style={{marginTop:'0.4rem',background:'#fff'}}>
					<li onClick={this._handler}>
						<img src={require("../statics/center/phone.png")} className="itemIcon" alt=""/>
						<span className="contentTitle">请拨打咨询电话
							<a href="tel:400-771-5151" style={{color:'#009b9b',fontSize: '0.46rem',textDecoration:'none'}}> 400-771-5151</a>
						</span>
					</li>
					<li onClick={this._handler}>
						<img src={require("../statics/center/phone.png")} className="itemIcon" alt=""/>
						<span className="contentTitle">加入留学攻略群
							<span style={{color:'#009b9b',fontSize: '0.46rem'}} onClick={this._weChatGroupHide}> 获取申请攻略</span>
						</span>
					</li>
					<li onClick={this._handler}>
						<img src={require("../statics/center/weChat.png")} className="itemIcon" alt=""/>
						<span className="contentTitle">请拨打咨询电话
							<span style={{color:'#009b9b',fontSize: '0.46rem'}} onClick={this._weChatNumberHide}> 官方微信订阅号</span>
						</span>
					</li>
				</ul>
				{
					this._weChat()
				}
			</div>
		);
	}
})

module.exports = SettingView;