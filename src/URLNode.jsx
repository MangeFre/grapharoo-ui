import React, { Component } from 'react';
import getNextLink from './apiHandler.js';
import { toast } from 'react-toastify';

toast.configure();

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

		// In case there was any error.
		if (!url) {
			toast.warning('The last link did not get processed properly.', {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} else {
			this.setState({
				destination: url,
			});
		}
	}

	render() {
		const { destination, origin } = this.state;
		if (destination === null) return null;
		return (
			<>
				<div className="container">
					<a href={origin} target="blank">
						Link to post
					</a>
				</div>
				<URLNode url={destination} />
				<style jsx>{`
					.container {
						min-width: 200px;
						min-height: 100px;
						max-width: 100%;
						max-height: 200px;
						background: #ffebcc;
						display: flex;
						justify-content: center;
						margin: 5px;
					}

					a {
						align-self: center;
					}
				`}</style>
			</>
		);
	}
}
