import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var ItemList = React.createClass({
	contextTypes: {
		router: React.PropTypes.object,
		toast: React.PropTypes.func
	},
	_handler() {
		if(this.props.isLogin){
			this.context.router.push(this.props.page);
		}else if(this.props.isLogin == false){
			this.context.toast('请先登陆！再开始课程。');
		}
	},
	render() {
		return (
			<li onClick={this._handler}>
				<img src={this.props.src} className="itemIcon" alt=""/>
				<span className="contentTitle">{this.props.contentTitle}</span>
				{this.props.contentnum}
				<span className="glyphicon glyphicon-menu-right"></span>
			</li>
		);
	}
});
module.exports = ItemList;