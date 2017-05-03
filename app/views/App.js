import React, {
	Component,
} from 'react';

import {
	withRouter
} from 'react-router';
var {
	Toast,
	PopUp
} = require('../components');
var App = React.createClass({
	getChildContext() {
	    return {
	      toast: Toast.toast,
	      showPopUp: PopUp.showPopUp,
	      location: this.props.location
	    }
	},
	childContextTypes:{
	    toast: React.PropTypes.func,
	    showPopUp: React.PropTypes.func,
	    location: React.PropTypes.object
	},
	render() {
		return (
			<div>
				{this.props.children}
				<Toast/>
			</div>
		)
	}
});
module.exports = withRouter(App);