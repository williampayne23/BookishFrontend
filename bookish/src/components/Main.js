import React from 'react';
import Menu from './Menu';
import BookList from './BookList';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Menu logout={this.props.done} />
				<BookList token={this.props.token} />
			</div>
		);
	}
}
export default Main;