import React, { Component, PropTypes } from 'react';

import {
	Router,
	Route,
	useRouterHistory,
	IndexRoute,
	hashHistory
} from 'react-router';

import {
	createBrowserHistory,
} from 'history';
let appHistory = useRouterHistory(createBrowserHistory)({ queryKey: false });

var {
	IndexView,
	LoginView,
	SettingView,
	NotFound404,
	App,
	RegisterView,
	CourseView,
	VideoView
} = require('./../views');
/*var RouteMaps = {
	"/index": () => {
		return {
			"exac"		  : true,
			"title"		  : "首页",
			"leftButton"  : "返回",
			"rightButton" : "设置",
			"component"	  : IndexView
		};
	},
	"/login": () => {
		return {
			"title"		  : "登录",
			"leftButton"  : "返回",
			"component"	  : LoginView
		};
	},
	"/setting": () => {
		return {
			"title"		  : "设置",
			"leftButton"  : "返回",
			"component"	  : SettingView
		};
	},
	"/404": () => {
		return {
			"title"		 : '没有该页面',
			"leftButton" : '返回',
			"component"  : NotFound404
		};
	}
};

function getRouteMap(keys) {
	if (typeof RouteMaps[keys] == 'function') {
		return RouteMaps[keys]();
	}
	return RouteMaps['/404']();
};*/

var Routes = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={LoginView}/>
					<Route path="register" component={RegisterView}/>
				</Route>
				<Route path="/main" component={App}>
			      	<IndexRoute component={IndexView}/>
			      	<Route path="setting" component={SettingView}/>
			      	<Route path="course" component={CourseView}/>
			      	<Route path="video/:id/:name" component={VideoView}/>
				</Route>

			</Router>	
		);
	}
});

module.exports = Routes;