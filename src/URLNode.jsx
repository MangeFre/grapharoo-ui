import React, { Component } from 'react';
import getNextLink from './apiHandler.js';

export default class URLNode extends Component {
	constructor(props) {
		super();
		const { url } = props;
		this.state = {
			origin: url,
			destination: null,
		};
	}

	async componentDidMount() {
		const { origin } = this.state;
		// Call the API here
		const response = await getNextLink(origin);
		const { url } = response;
		this.setState({
			destination: url,
		});
	}

	render() {
		const { destination, origin } = this.state;
		if (destination === null) return null;
		return (
			<div>
				<div className="container">
					<a href={origin}>Link to post</a>
				</div>
				<URLNode url={destination} />
				<style jsx>{`
					.container {
						min-width: 200px;
						min-height: 200px;
						width: 100%;
						background: #ffebcc;
						display: flex;
						justify-content: center;
					}

					a {
						align-self: center;
					}
				`}</style>
			</div>
		);
	}
}
