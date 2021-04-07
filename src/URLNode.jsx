import React, { useState, useEffect } from 'react';
import { getNextLink } from './apiHandler.js';
import { toast } from 'react-toastify';
import HTML from 'html-parse-stringify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

toast.configure();

function unescapeHTML(escapedHTML) {
	return escapedHTML
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

function traverseJsonRec(node, options) {
	// If this node is a tag (a, p, etc) and the options want to modify that part.
	if (node.type === 'text') {
		return;
	}

	if (node.type === 'tag' && options[node.name]) {
		const allKeys = Object.keys(options[node.name]);
		for (let key of allKeys) {
			node.attrs[key] = options[node.name][key];
		}
	}

	for (let child of node.children) {
		traverseJsonRec(child, options);
	}

	return;
}

function addOptionsToHTML(unescapedHTML, options = {}) {
	let newHTML = unescapedHTML;
	let newJson = HTML.parse(newHTML);
	traverseJsonRec(newJson[0], options);
	newHTML = HTML.stringify(newJson);
	return newHTML;
}

function getFormattedTimePassed(created_utc) {
	let output = '';
	let created = Date.parse(created_utc) / 1000; // convert created_utc to Date and get it in seconds
	let now = Date.now() / 1000; // get current time in seconds
	let timeDiff = now - created;
	let minutes = timeDiff / 60;
	let hours = minutes / 60;
	let days = hours / 24;
	let weeks = days / 7;
	let months = weeks / 4;
	let years = days / 365;

	if (minutes < 0) {
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
	return score_hidden
		? '[score hidden]'
		: `${score} point${score !== 1 ? 's' : ''}`;
}

export default function URLNode(props) {
	const [next, setNext] = useState(null);
	const [fetchError, setFetchError] = useState(false);
	const [commentData, setCommentData] = useState(null);
	const [hasUpdatedParent, setHasUpdatedParent] = useState(false);
	const { onFinishLoad, url } = props;

	useEffect(() => {
		const fetch = async () => {
			const res = await getNextLink(url);
			if (!res.next) {
				setFetchError(true);
				return;
			}
			setCommentData(res.link.data);
			setNext(res.next.url);
		};
		fetch();
	}, [url]);

	useEffect(() => {
		if (fetchError) {
			toast.warning(`Processing this link did not work: ${url}`, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
			return;
		}

		if (next === null || hasUpdatedParent) return;
		setHasUpdatedParent(true);
		onFinishLoad(next);
	}, [next, fetchError, onFinishLoad, hasUpdatedParent, url]);

	if (next === null || fetchError) return '';

	const {
		subreddit_name_prefixed,
		score,
		author,
		origin,
		body_html,
		score_hidden,
		created_utc,
	} = commentData;
	const authorURL = `https://www.reddit.com/user/${author}`;
	const authorElement =
		author !== '[deleted]' ? (
			<a
				className="author"
				style={{ textDecoration: 'none' }}
				href={authorURL}
				target="blank">
				{author}
			</a>
		) : (
			<div style={{ color: '#888' }}>{author}</div>
		);

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
							<div>{getFormattedScore(score, score_hidden)}</div>
							<div>{getFormattedTimePassed(created_utc)}</div>
							<div>
								in{' '}
								<a href={origin} target="blank">
									{subreddit_name_prefixed}
								</a>
							</div>
						</div>
					</div>
					<p
						dangerouslySetInnerHTML={{
							__html: addOptionsToHTML(unescapeHTML(body_html), {
								a: { target: 'blank' },
							}),
						}}></p>
				</div>
			</div>
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
					color: #c6c6c6;
					font-size: 1.5rem;
				}

				.up {
					color: #ff8b60;
				}

				.container:last-of-type .up {
					color: #c6c6c6;
				}

				.container:last-of-type .down {
					color: #9494ff;
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
