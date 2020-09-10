import React, { Component } from 'react';
import Header from './Header';
import getNextLink from './apiHandler.js';
import GraphVisualizer from './GraphVisualizer';

// Old way of making components
export default class Content extends Component {
	// Initializes the component
	constructor(props) {
		super(props);
		// initializing state - Infomartion we can change here.
		this.state = {
			history: [],
			graph: [],
		};
		// Here I am also binding some methods that I want to be called from other
		// components. This is just to use this component as context so I can call this
		// in it.
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(submittedLink) {
		const { history, graph } = this.state;

		// Response is JSON with a URL. Boy, imagine if I could make like... a TYPE of the response?
		// Would be a lot easier ;)
		const response = await getNextLink(submittedLink);
		const { url } = response;
		const newGraph = [...graph];

		// First insert gets added to chain.
		if (newGraph.length === 0) newGraph.push(submittedLink);

		newGraph.push(url);

		// Store the newly added link in "history"
		const newHistory = [...history];
		this.setState({
			history: newHistory,
			graph: newGraph,
		});
	}

	// Renders the actual UI.
	render() {
		// Gonna grab the history from state and render it, if there is any.
		const { history, graph } = this.state;
		console.log(graph);
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
				<GraphVisualizer graph={graph} />
			</>
		);
	}
}
