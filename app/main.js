import React, { Component, PropTypes } from 'react';

import {
	Router,
	Route
} from 'react-router';

class App extends Component {

	componentDidMount() {
		console.log('ReactRouter', Router);
	}
	render() {
		return (
			<Router>
				
			</Router>
		);
	}
}


export default App;