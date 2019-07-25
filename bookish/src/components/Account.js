import React from 'react';
import RP from 'request-promise';


class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = { borrowings: [] };
		this.borrowingsReceived = this.borrowingsReceived.bind(this);
		this.loadAccount = this.loadAccount.bind(this);

	}
	componentDidMount() {
		this.loadAccount();
	}

	loadAccount() {
		var options = {
			uri: 'http://localhost:3001/borrowings/',
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
			.then(this.borrowingsReceived);
	}

	borrowingsReceived(borrowings) {
		this.setState({ borrowings: borrowings });
	}

	render() {
		return (
			<div>
				{this.state.borrowings.map(item => (
					< Borrowing borrowing={item} token={this.props.token} return={this.loadAccount}></Borrowing>
				))}
			</div>
		);
	}
}

class Borrowing extends React.Component {
	constructor(props) {
		super(props);
		this.return = this.return.bind(this);

	}
	render() {
		return (
			<div>
				{this.props.borrowing.book.Title} - {this.props.borrowing.book.ISBN} - {this.props.borrowing.book.Copies} - {this.props.borrowing.Due_date}<button onClick={this.return}>Return</button>
			</div>
		);
	}

	return() {
		let book = this.props.borrowing.book.id;
		var options = {
			method: 'PATCH',
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

		RP(options)
			.then(this.props.return);
	}
}
export default Account;