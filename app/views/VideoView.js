import React, { Component, PropTypes } from 'react';

var VideoView = React.createClass({
	render() {
		console.log(this.props.params)
		return (
			<p>视频详情页</p>
		);
	}
})

module.exports = VideoView;