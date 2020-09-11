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
			error: false,
		};
	}

	async componentDidMount() {
		const { origin } = this.state;
		// Call the API here
		const response = await getNextLink(origin);
		const { url, subreddit_name_prefixed, score, author } = response;

		// In case there was any error.
		if (!url) {
			toast.warning('The last link did not get processed properly.', {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} else {
			this.setState({
				destination: url,
				subreddit_name_prefixed,
				score,
				author,
			});
		}
	}

	render() {
		const { destination } = this.state;
		if (destination === null) return null;
		const { subreddit_name_prefixed, score, author, origin } = this.state;
		// Conditionally changing CSS if error.
		return (
			<>
				<div className="container">
					<h2>{subreddit_name_prefixed}</h2>
					<p>Score: {score}</p>
					<a href={origin} target="blank">
						Link to post
					</a>
					<p>By {author}</p>
				</div>
				<URLNode url={destination} />
				<style jsx>{`
					.container {
						min-width: 200px;
						min-height: 100px;
						max-width: 100%;
						max-height: 200px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						background: #ffebcc;
						margin: 5px;
					}

					a,
					p,
					h2 {
						align-self: center;
					}
				`}</style>
			</>
		);
	}
}
