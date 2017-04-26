import React from 'react';
import {
	Router,
	Route,
	Link	
} from 'react-router';
var {
	IndexView,
	LoginView,
	SettingView,
	NotFound404,
	App
} = require('./../views');
var RouteAll = React.createClass({
	render() {
		return (
			<div>
				<Route path="/" component={LoginView}/>
				<Route path="/main" component={IndexView}>
			      	<IndexRoute component={IndexView}/>
			      	<Route path="setting" component={SettingView}/>
				</Route>
			</div>
		);
	}
});

module.exports = RouteAll;
