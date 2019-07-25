import React from 'react';
import Login from './Login.js';
import Main from './Main.js';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { token: '' };
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}
	render() {
		return (
			<div className="App">
				{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
					<Test name="Test" />
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header> */}
				{this.state.token === '' ? (
					<Login done={this.onLogin} />
				) : (
					<Main done={this.onLogout} token={this.state.token} />
				)}
			</div>
		);
	}
	onLogin(token) {
		this.setState({ token: token });
	}
	onLogout() {
		this.setState({ token: '' });
	}
}

export default App;
