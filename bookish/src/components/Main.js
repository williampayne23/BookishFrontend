import React from 'react';
import Menu from './Menu';
import BookList from './BookList';
import Account from './Account';
import AuthorList from './AuthorList';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { view: 'Books' };
		this.switchView = this.switchView.bind(this);
	}

	render() {
		let view;
		switch (this.state.view) {
		case 'Authors':
			view = (<AuthorList token={this.props.token} />);
			break;
		case 'Account':
			view = (<Account token={this.props.token} />);
			break;
		default:
			view = (<BookList account={() => this.setState({ view: 'Account' })} token={this.props.token} />);
			break;
		}

		return (
			<div>
				<Menu switchView={this.switchView} logout={this.props.done} />
				{view}
			</div>
		);
	}

	switchView(view) {
		this.setState({ view: view.target.id });
	}
}
export default Main;