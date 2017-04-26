import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var App = React.createClass({
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});
module.exports = App;