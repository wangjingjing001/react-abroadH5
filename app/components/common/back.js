import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Back = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	_back() {
		if (typeof this.props.onClick == 'function') {
			this.props.onClick();
		} else {
			this.context.router.goBack();
		}
	},
	render() {
		return (
			<img onClick={this._back} style={{height: '0.7rem'}} src={require('../../statics/back.png')}/>
		);
	}
});
module.exports = Back;