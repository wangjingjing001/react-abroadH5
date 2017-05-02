import React, {
	Component,
} from 'react';

import {
	Link
} from 'react-router';

var Nav = React.createClass({
	getInitialState() {
		return {
			isShow: false
		}
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			isShow: nextProps.show
		})
	},
	shoulComponentWillUpdate(nextState, nextProps) {
		if (this.props.show !== nextProps.show) {
			return false;
		}
		return true;
	},
	navHide() {
		this.setState ({
			isShow: !this.state.isShow
		})
	},
	render() {
		if (this.state.isShow) {
			return (
				<div className="mask" onClick={this.navHide}>
		            <div className="navBox">
		               {this.props.navLi}
		            </div>
		        </div>
			);
		} else {
			return null;
		}
	}
});
module.exports = Nav;