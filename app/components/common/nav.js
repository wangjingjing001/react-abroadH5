import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Nav = React.createClass({
	getInitialState() {
		return {
			isShow: false,
		}
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.show != this.props.show) {
			this.navHide();
		}
	},
	navHide() {
		this.setState ({
			isShow: !this.state.isShow
		});
	},
	contextTypes: {
		router: React.PropTypes.object,
		toast: React.PropTypes.func
	},
	clearLogin() {
		this.navHide();
		this.props.clearHandler && this.props.clearHandler();
	},
	isLogin(){
		return (this.props.isLogin) ? (<div className='navlastList'>
											<Link to="/main/setting" onClick={this.navHide}>13212121212</Link> ｜ <Link onClick={this.clearLogin} >退出</Link>
									   </div>) 
									: (<div className='navlastList'>
									  		<Link to="/">登陆</Link> / <Link to="/register">注册</Link>
									   </div>)
	},
	render() {

		if (this.state.isShow) {
			return (
				<div className="mask" onClick={this.navHide}>
		            <div className="navBox">
		                <ul>
							<li><a href="http://www.pengyunliuxue.com"><span className="glyphicon glyphicon-home" style={{fontSize:'0.6rem',width:'0.9rem'}} ></span>首页</a></li>
							<li><a href="http://www.pengyunliuxue.com"><span className="glyphicon glyphicon-grain" style={{fontSize:'0.6rem',width:'0.9rem'}}></span>留学院校库</a></li>
							<li><Link to="http://www.pengyunliuxue.com"><span className="glyphicon glyphicon-film" style={{fontSize:'0.6rem',width:'0.9rem'}}></span>留学公开课</Link></li>
							<li><a href="http://www.pengyunliuxue.com"><span className="glyphicon glyphicon-education" style={{fontSize:'0.6rem',width:'0.9rem'}}></span>问学长/问导师</a></li>
							<li><Link to="http://www.pengyunliuxue.com"><span className="glyphicon glyphicon-question-sign" style={{fontSize:'0.6rem',width:'0.9rem'}}></span>如何学习</Link></li>
							<li><Link to="/main/setting" onClick={this.navHide}><span className="glyphicon glyphicon-user" style={{fontSize:'0.6rem',width:'0.9rem'}}></span>个人中心</Link></li>
						</ul>
		                {
		                	this.isLogin()
		                }
		            </div>
		        </div>
			);
		} else {
			return null;
		}
	}
});
module.exports = Nav;