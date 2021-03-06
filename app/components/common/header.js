import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Header = React.createClass({
	render() {
		return (
			<div className="head-wrap" style={{background:'#fff'}}>
	            <div className="head-left-button">
	                {this.props.leftButton}
	            </div>
	            <div className="head-title">{this.props.title}</div>
	            <div className="head-right-button">
	                {this.props.rightButton}
	            </div>
	        </div>
		);
	}
});
module.exports = Header;