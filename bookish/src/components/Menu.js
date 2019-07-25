import React from 'react';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
                Bookish
				<button id='Account' onClick={this.props.switchView}>Account</button>
				<button id='Books' onClick={this.props.switchView}>Books</button>
				<button id='Authors' onClick={this.props.switchView}>Authors</button>
				<button onClick={this.props.logout}>Logout</button>
			</div>
		);
	}
}
export default Menu;