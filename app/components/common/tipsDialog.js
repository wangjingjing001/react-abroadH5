import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var tipsDialog = React.createClass({
	getInitialState() {
		return {
			show: false
		}
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			show : nextProps.show
		})
	},
	timeOut() {
		if (this.state.show) {
			setTimeout(() => {
				this.setState({
					show: false
				})
			},3000);
		}
		if(!this.state.show){
			return null;
		}else{
			return <div className='dialog' style={styles.dialog}>
						{this.props.tipsFont}
					</div>
		}
	},
	render() {
		return (
			<div>
			{
				this.timeOut()
			}
			</div>
		);
	}
});
var styles = {
	dialog: {
		position: 'fixed',
		top: '5rem',
		left: '2.5rem',
		fontSize: '0.4rem',
		background: 'rgba(0,0,0,.8)',
		color: 'white',
		width:'5rem',
		height:'4rem',
		lineHeight: '4rem',
		zIndex:'5',
		textAlign: 'center'
	}
}
module.exports = tipsDialog;