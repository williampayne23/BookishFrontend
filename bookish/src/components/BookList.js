import React from 'react';
import RP from 'request-promise';


class BookList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { books: [], authors: [] };
		this.loadAuthors = this.loadAuthors.bind(this);
		this.loadBooks = this.loadBooks.bind(this);
		this.booksReceived = this.booksReceived.bind(this);
		this.authorsReceived = this.authorsReceived.bind(this);
		this.newBook = this.newBook.bind(this);

	}
	componentDidMount() {
		this.loadBooks();
		this.loadAuthors();
	}

	loadBooks() {
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

	loadAuthors() {
		var options = {
			uri: 'http://localhost:3001/authors/',
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
			.then(this.authorsReceived);
	}

	authorsReceived(authors) {
		this.setState({ authors: authors });
	}

	newBook(e) {
		e.preventDefault();
		var options = {
			method: 'POST',
			uri: 'http://localhost:3001/books/',
			qs: {
				title: e.target.title.value,
				ISBN: e.target.isbn.value,
				copies: e.target.copies.value,
				author: e.target.author.value
			},
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': 'bearer ' + this.props.token
			},
			json: true // Automatically parses the JSON string in the response
		};

		RP(options)
			.then(this.loadBooks);

	}

	render() {
		return (
			<div>
				{this.state.books.map(item => (
					< Book borrowed={() => this.props.account()} book={item} token={this.props.token}></Book>
				))}
				<form onSubmit={this.newBook}>

					<label>Title:</label>
					<input
						id="title"
						onChange={this.handleTitleChange}
						value={this.state.newBookTitle}
					/><br />
					<label>ISBN:</label>
					<input
						id="isbn"
						onChange={this.handleISBNChange}
						value={this.state.newBookISBN}
					/><br />
					<label>Copies:</label>
					<input
						id="copies"
						onChange={this.handleCopiesChange}
						value={this.state.newBookCopies}
					/><br />
					<label>Author:</label>
					<select id="author">
						<option value={''}></option>
						{this.state.authors.map(item => (
							<option value={item.id}>{item.Name}</option>
						))}
					</select>
					<button>New Book</button>
				</form>
			</div>
		);
	}
}

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.borrow = this.borrow.bind(this);

	}
	render() {
		return (
			<div>
				{this.props.book.Title} - {this.props.book.ISBN} - {this.props.book.Copies}<button onClick={this.borrow}>Borrow</button>
			</div>
		);
	}

	borrow() {
		let book = this.props.book.id;
		var options = {
			method: 'POST',
			uri: 'http://localhost:3001/borrowings/',
			qs: {
				book: book
			},
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': 'bearer ' + this.props.token
			},
			json: true // Automatically parses the JSON string in the response
		};

		RP(options).then(() => this.props.borrowed())


		;

	}

}
export default BookList;