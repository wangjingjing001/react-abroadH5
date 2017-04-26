import React, {
	Component
} from 'react';

import {
	Link,
	Redirect
} from 'react-router';

var NotFound404 = React.createClass({
	render() {
		return (
			<div>
				404,你是猴子请来的逗逼吗？
				<Link to="index">跳转</Link>
			</div>
		);
	}
});

module.exports = NotFound404;