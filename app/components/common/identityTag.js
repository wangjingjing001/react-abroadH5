import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';
var IdentityTag = React.createClass({
	handleTag(){
		this.props.clearhandleTag && this.props.clearhandleTag();
	},
	_saveInfo(type,id){
		this.props.tagSave && this.props.tagSave(type,id); 
	},
	render(){
		return (
			<div className='tagmask' onClick={this.handleTag}>
				<div className='tagBox'>
					<img src={this.props.src} alt="" className="tagImg" onClick={this._handleTag}/>
					<p className='tagFont'>{this.props.tagFont}</p>
					<ul>
						{
							this.props.tagList.map((list, index) => {
								if(this.props.tagClass === 'country'){
									return <li id={list.id} style={{background:'#44c0e8'}} onClick={this._saveInfo.bind(this,'country',list.id)} key={index}>{list.name}</li>
								}else{
									return <li id={list.id} style={{background:'#2bc3a8'}} onClick={this._saveInfo.bind(this,'diploma',list.id)} key={index}>{list.name}</li>
								}
		                        
		                    })
						}
					</ul>
				</div>
			</div>
		)
	}
});
module.exports = IdentityTag;