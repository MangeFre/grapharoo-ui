import React, { Component } from 'react';
import getNextLink from './apiHandler.js';
import { toast } from 'react-toastify';

toast.configure();

function unescapeHTML(escapedHTML) {
	return escapedHTML
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

export default class URLNode extends Component {
	constructor(props) {
		super();
		const { url } = props;
		this.state = {
			origin: url,
			destination: null,
		};
		this.loadData = this.loadData.bind(this);
	}

	async componentDidMount() {
		this.loadData();
	}

	// This function always takes prevProps and prevState. They're exactly what it sounds like.
	async componentDidUpdate(prevProps, prevState) {
		// Get the origin from the CURRENT props. So if I just passed new props, those are the ones I get.
		const { url: origin } = this.props;

		// If the state is not the same as props - there is a disconnect, so set state to the new one.
		// Changing the state will make another call to componentDidUpdate. If props and state origins are the same
		// then load the data again.
		if (this.state.origin !== origin) {
			this.setState({
				origin,
			});
		}
		// This.loadData also changes state so... Gotta be careful.
		else if (this.state.origin !== prevState.origin) {
			this.loadData();
		}
		// Otherwise, do nothing.
	}

	// breaking this function out.
	async loadData() {
		const { origin } = this.state;
		// Call the API here
		const response = await getNextLink(origin);
		const { url, subreddit_name_prefixed, score, author, body_html } = response;

		// In case there was any error.
		if (!url) {
			toast.warning('The last link did not get processed properly.', {
				position: toast.POSITION.BOTTOM_CENTER,
			});
			this.setState({ error: true });
		} else {
			this.setState({
				destination: url,
				subreddit_name_prefixed,
				score,
				author,
				body_html,
			});
		}
	}

	render() {
		const { destination } = this.state;
		if (destination === null) return null;
		const {
			subreddit_name_prefixed,
			score,
			author,
			origin,
			body_html,
		} = this.state;
		// Conditionally changing CSS if error.
		return (
			<>
				<div className="container">
					<h2>
						Switheroo in{' '}
						<a href={origin} target="blank">
							{subreddit_name_prefixed}
						</a>
					</h2>
					<div className="info">
						<p>Score: {score}</p>
						<p>By: {author}</p>
					</div>
					<p dangerouslySetInnerHTML={{ __html: unescapeHTML(body_html) }}></p>
				</div>
				<URLNode url={destination} />
				<style jsx>{`
					.container {
						display: flex;
						flex-direction: column;
						margin: 1rem 1rem 0rem 1rem;
						padding: 0.5rem;

						background-color: white;

						border-radius: 0.5rem;

						-webkit-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
						-moz-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
						box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
					}

					.container:last-of-type {
						margin-bottom: 1rem;
					}

					.info {
						display: flex;
					}

					p {
						padding: 1rem 1rem 0 0;
					}

					h2,
					p {
						margin: 0;
					}
				`}</style>
			</>
		);
	}
}
