import React from 'react';
import RP from 'request-promise';


class AuthorList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { authors: [], authorName: '' };
		this.handleChange = this.handleChange.bind(this);
		this.newAuthor = this.newAuthor.bind(this);
		this.loadAuthors = this.loadAuthors.bind(this);
		this.authorsReceived = this.authorsReceived.bind(this);

	}
	componentDidMount() {
		this.loadAuthors();
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

	newAuthor() {
		var options = {
			method: 'POST',
			uri: 'http://localhost:3001/authors/',
			qs: {
				name: this.state.authorName
			},
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': 'bearer ' + this.props.token
			},
			json: true // Automatically parses the JSON string in the response
		};

		RP(options).then(() => {
			this.loadAuthors();
			this.setState({ authorName: '' });
		});
	}

	render() {
		return (
			<div>
				{this.state.authors.map(item => (
					< Author author={item} ></Author>
				))}
				<label>Author Name:</label>
				<input
					id="name"
					onChange={this.handleChange}
					value={this.state.authorName}
				/>
				<button onClick={this.newAuthor}>New Author</button>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ authorName: e.target.value });
	}
}

class Author extends React.Component {
	render() {
		return (
			<div>
				{this.props.author.id} - {this.props.author.Name}
			</div>
		);
	}

}
export default AuthorList;