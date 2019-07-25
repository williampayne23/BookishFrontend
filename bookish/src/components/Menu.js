import React from 'react';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
                Bookish
				<button>Account</button>
				<button>New Author</button>
				<button>New Book</button>
				<button onClick={this.props.logout}>Logout</button>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.username) {
			return;
		}
	}
}
export default Menu;