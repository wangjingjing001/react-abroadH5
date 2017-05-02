import React, { Component, PropTypes } from 'react';

var Routes = require('./routes/RouteMaps.js');
var {
	Toast,
	PopUp
} = require('./components');

var Main = React.createClass({
	render() {
		return (
			<Routes/>
		);
	},
	getChildContext() {
		console.log(Toast);
	    return {
	      toast: Toast,
	      showPopUp: PopUp
	    }
	},
	childContextTypes:{
	    toast: PropTypes.func,
	    showPopUp: PropTypes.func
	},
});


module.exports = Main;