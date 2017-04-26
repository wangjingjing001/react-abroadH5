import React, {
	Component,
	PropTypes
} from 'react';


class Greeting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: Date.now()
		}
	}
	render() {
		return (
			<div>
				<h1>Hello, {this.props.name}</h1>
				<p style={{color: '#666', fontSize: 12}}>{this.state.time}</p>
			</div>
		)
	}
}

export default Greeting;