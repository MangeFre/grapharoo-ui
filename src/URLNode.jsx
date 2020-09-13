import React, { Component } from 'react';
import getNextLink from './apiHandler.js';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faShekelSign } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

toast.configure();

function unescapeHTML(escapedHTML) {
	return escapedHTML
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

// create_utc is in seconds
function getFormattedTimePassed(created_utc) {
	let output = '';

	let now = Date.now() / 1000; // get current time in seconds
	let timeDiff = now - created_utc;
	let minutes = timeDiff / 60;
	let hours = minutes / 60;
	let days = hours / 24;
	let weeks = days / 7;
	let months = weeks / 4;
	let years = days / 365;

	if (minutes < 0)
	{
		output = 'just now';
	} else if (minutes < 60) {
		output = `${Math.floor(minutes)} minute${minutes >= 2 ? 's' : ''} ago`;
	} else if (hours < 24) {
		output = `${Math.floor(hours)} hour${hours >= 2 ? 's' : ''} ago`;
	} else if (days < 7) {
		output = `${Math.floor(days)} day${days >= 2 ? 's' : ''} ago`;
	} else if (weeks < 4) {
		output = `${Math.floor(weeks)} week${weeks >= 2 ? 's' : ''} ago`;
	} else if (months < 12) {
		output = `${Math.floor(months)} month${months >= 2 ? 's' : ''} ago`;
	} else {
		output = `${Math.floor(years)} year${years >= 2 ? 's' : ''} ago`;
	}
	return output;
}

function getFormattedScore(score, score_hidden) {
	return score_hidden ? '[score hidden]' : `${score} point${score !== 1 ? 's' : ''}` 
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
		const { url, subreddit_name_prefixed, score, author, body_html, score_hidden, created_utc } = response;

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
				score_hidden,
				created_utc
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
			score_hidden,
			created_utc
		} = this.state;
		const authorURL = `https://www.reddit.com/user/${author}`;
		const authorElement = author !== '[deleted]' ? 
			<a className="author" style={{ textDecoration: 'none' }} href={authorURL} target="blank">{author}</a> :
			<div style={{ color: '#888' }}>{author}</div>;

		// Conditionally changing CSS if error.
		return (
			<>
				<div className="container">
					<div className="votesContainer">
						<div className="vote up">
							<FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
						</div>
						<div className="vote down">
							<FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
						</div>					
					</div>
					<div>
						<div className="headerContainer">
							{authorElement}
							<div className="details">
								<div>
									{getFormattedScore(score, score_hidden)}
								</div>
								<div>
									{getFormattedTimePassed(created_utc)}
								</div>
								<div>
									in{' '}
									<a href={origin} target="blank">
										{subreddit_name_prefixed}
									</a> 
								</div>
							</div>
						</div>
						<p dangerouslySetInnerHTML={{ __html: unescapeHTML(body_html) }}></p>
					</div>
				</div>
				<URLNode url={destination} />
				<style jsx>{`
					.container {
						display: flex;
						flex-direction: column;
						margin: 1rem 1rem 0rem 1rem;

						display: flex;
						flex-direction: row;

						background-color: white;

						border-radius: 0.5rem;

						-webkit-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
						-moz-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
						box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
					}

					.container:last-of-type {
						margin-bottom: 1rem;
					}


					.container > div {
						padding: 0.5rem;
					}


					.headerContainer {
						display: flex;
						font-size: 1.25rem;						
						font-weight: 900;
						color: #336699;
					}

					.headerContainer .details {
						padding: 0 0.75em;
						color: #888;
						font-size: 0.75;

						display: flex;
					}

					.headerContainer .details div {
						padding-right: 0.25rem;
					}

					.votesContainer {
						display: flex;
						flex-direction: column;
					}

					.vote {
						color: #C6C6C6;
						font-size: 1.5rem;
					}

					.up {
						color: #FF8b60;
					}

					.container:last-of-type .up {
						color: #C6C6C6;
					}
					
					.container:last-of-type .down {
						color: #9494FF;
					}

					.info {
						display: flex;
					}

					p {
						padding: 0;
						font-size: 1.5rem;
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
