import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';
var events = require('events');
// var EventEmit = new EventEmitter();
var ToastEmitter = new events.EventEmitter();

var Toast = React.createClass({
	statics:{
		toast: ( toastString:string ) => {
			setTimeout(() => {
				ToastEmitter.emit('toast', {text: toastString});	
			})
		}
	},
	componentWillMount() {
		// ToastEmitter.emit('toast', {text: 'aaa'});
		ToastEmitter.on('toast', (data) => {
			this._showToast(data.text);
		});
	},	
	getInitialState() {
		return {
			innerText: '',
			style: 'infoContainer'
		}
	},
	_showToast(toastString) {
		if (this._shutDownToast) {
			clearTimeout(this._shutDownToast);
		}
		this.setState({
			innerText: toastString,
			style: 'infoContainer animated bounceIn'
		});
		this._shutDownToast = setTimeout(() => {
			this.setState({
				innerText: '',
				style: 'infoContainer animated bounceOut'
			});
		}, 2000);
	},
	render() {
		return (
			<div className={this.state.style}>
				<p style={styles.innerText}>{this.state.innerText}</p>
			</div>
		);
	}
});
var styles = {
	innerText:{
		fontSize: '0.5rem',
		color: '#fff',
		alignSelf: 'center',
	}
}
module.exports = Toast;