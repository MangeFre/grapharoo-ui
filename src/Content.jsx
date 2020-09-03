import React, { Component } from 'react';
import Header from './Header';

// Old way of making components
export default class Content extends Component {
	// Initializes the component
	constructor(props) {
		super(props);
		// initializing state - Infomartion we can change here.
		this.state = {
			history: [],
		};
		// Here I am also binding some methods that I want to be called from other
		// components. This is just to use this component as context so I can call this
		// in it.
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(submittedLink) {
		// Destructuring the state, to get an array of submitted links.
		console.log(`Submitted the link ${submittedLink} into Content component`);
		const { history } = this.state;
		history.push(submittedLink);
		// Cloning the array. There is some reason for this - I forgot why.
		const newHistory = [...history];
		this.setState({
			history: newHistory,
		});
	}

	// Renders the actual UI.
	render() {
		// Gonna grab the history from state and render it, if there is any.
		const { history } = this.state;
		return (
			<>
				<Header title="Grapharoo" subtitle="Mapping out the old Switcheroo Links" onSubmit={this.handleSubmit} />
				{history.map((oldLink) => {
					return <p key={oldLink}>{oldLink}</p>;
				})}
			</>
		);
	}
}
