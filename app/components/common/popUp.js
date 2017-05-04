import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';
var events = require('events');
var PopUpEmitter = new events.EventEmitter();
var PopUp = React.createClass({
	statics:{
		showPopUp: ( toastString:string ) => {
			PopUpEmitter.emit('showPopUp',{ text:toastString })
		}
	},
	componentWillMount() {
		PopUpEmitter.addListener('showPopUp', (event) => {
			console.log(event);
		});
	},
	render() {
		return (
			<p>popUp.js</p>
		);
	}
});
module.exports = PopUp;