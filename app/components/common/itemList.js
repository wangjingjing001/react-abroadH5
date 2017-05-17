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
		if(this.props.isLogin === 'true'){
			this.context.router.push(this.props.page);
		}else if(this.props.isLogin === 'false'){
			this.context.toast('请先登陆！再开始课程。');
		}
	},
	_num() {
		if((this.props.isLogin === 'true') && (this.props.contentnum > 0)){
			return <div className="contentNum">{this.props.contentnum}</div>
		}
	},
	_ismenuRight(){
		return (this.props.menuRight)?<span className="glyphicon glyphicon-menu-right"></span> : null;
	},
	_clickFc(){
		if(this.props.clickFc){
			if(this.props.clickFcTel){
				return <a href="tel:this.props.clickFc" style={{color:'#009b9b',fontSize: '0.46rem',textDecoration:'none'}}> {this.props.clickFc}</a>
			}else{
				return <span style={{color:'#009b9b',fontSize: '0.46rem'}}> {this.props.clickFc}</span>	
			}
		}
	},
	render() {
		return (
			<li onClick={this._handler}>
				<img src={this.props.src} className="itemIcon" alt=""/>
				<span className="contentTitle">{this.props.contentTitle}
					{this._clickFc()}
				</span>
				<div className="contentRight" style={{float:'right'}}>
				{this._num()}
				{this._ismenuRight()}
				
				</div>
			</li>
		);
	}
});
module.exports = ItemList;