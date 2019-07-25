import React from 'react';
import RP from 'request-promise';
import { resolve } from 'url';


class BookList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { books: ['a', 'b', 'c'] };
		this.booksReceived = this.booksReceived.bind(this);

	}
	componentDidMount() {
		var options = {
			uri: 'http://localhost:3001/books/',
			qs: {
				user: this.state.username,
				password: this.state.password
			},
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': 'bearer ' + this.props.token
			},
			json: true // Automatically parses the JSON string in the response
		};

		RP(options)
			.then(this.booksReceived);
	}

	booksReceived(books) {
		this.setState({ books: books });
	}

	render() {
		return (
			<div>
				{this.state.books.map(item => (
					< Book book={item} ></Book>
				))}
			</div>
		);
	}
}

class Book extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.book.Title}
			</div>
		);
	}

}
export default BookList;