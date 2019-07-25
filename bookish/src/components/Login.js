import React from 'react';
import RP from 'request-promise';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
				<h3>TODO</h3>
				<form >
					<label htmlFor="">
                        Login
					</label>
					<br />
					<label>Username:</label>
					<input
						id="username"
						onChange={this.handleChange}
						value={this.state.username}
					/><br />
					<label>Password:</label>
					<input
						id="password"
						onChange={this.handleChangePassword}
						value={this.state.password}
					/><br />
					<button onClick={this.handleSubmit}>
                        Login
					</button>
					<button>
                        Sign Up
					</button>
				</form>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ username: e.target.value });
	}

	handleChangePassword(e) {
		this.setState({ password: e.target.value });
	}

	async handleSubmit(e) {
		e.preventDefault();
		var options = {
			uri: 'http://localhost:3001/account',
			qs: {
				user: this.state.username,
				password: this.state.password
			},
			headers: {
				'User-Agent': 'Request-Promise',
				'Access-Control-Allow-Origin': true
			},
			json: true // Automatically parses the JSON string in the response
		};

		const response = await RP(options);
		this.props.done(response);
		if (!this.state.username) {
			return;
		}
	}
}

export default Login;
