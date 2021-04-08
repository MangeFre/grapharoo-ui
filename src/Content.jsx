import React, { Component } from 'react';
import Header from './Header';
import URLNodeList from './URLNodeList';

// Old way of making components
export default class Content extends Component {
	// Initializes the component
	constructor(props) {
		super();
		// initializing state - Infomartion we can change here.
		this.state = {
			history: [],
			origin: null,
		};
		// Here I am also binding some methods that I want to be called from other
		// components. This is just to use this component as context so I can call this
		// in it.
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(submittedLink) {
		const { history } = this.state;

		// Store the newly added link in "history"
		const newHistory = [...history];
		this.setState({
			history: newHistory,
			origin: submittedLink,
		});
	}

	// Renders the actual UI.
	render() {
		// Gonna grab the history from state and render it, if there is any.
		const { history, origin } = this.state;
		// Maybe terrible syntax? If origin is null, make content the div.
		// when link is submitted, this we re-render, and it will display the visualizer.
		const content =
			origin === null ? (
				<>
					<div>
						<h1>Enter a link up top</h1>
					</div>
					<style jsx>{`
						div {
							display: flex;
							width: 100%;
							justify-content: center;
							background: #ff9999;
							flex: 1;
						}

						h1 {
							align-self: center;
						}
					`}</style>
				</>
			) : (
				<URLNodeList originUrl={origin} />
			);

		return (
			<>
				<Header
					title="Grapharoo"
					subtitle="Mapping out the old Switcheroo Links"
					onSubmit={this.handleSubmit}
				/>
				{history.map((oldLink) => {
					return <p key={oldLink}>{oldLink}</p>;
				})}
				{content}
			</>
		);
	}
}
