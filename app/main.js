import React, { Component, PropTypes } from 'react';

var router = require('react-router');

class Test extends Component {

	componentDidMount() {
		console.log('ReactRouter', router);
	}
	render() {
		return (
			<div>起步</div>
		);
	}
}


export default Test;