import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Back = React.createClass({
	_back() {
		if (typeof this.props.onClick == 'function') {
			this.props.onClick();
		} else {
			this.props.history.goBack();
		}
	},
	render() {
		return (
			<img onClick={this._back} style={{height: '0.7rem'}} src={require('../../statics/back.png')}/>
		);
	}
});
module.exports = Back;