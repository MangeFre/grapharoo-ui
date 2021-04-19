import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import HTML from 'html-parse-stringify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

import ToolTip from './ToolTip';
import FixLinkDialog from './FixLinkDialog';

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
	let output = moment(created_utc).fromNow();
	if (output === 'a few seconds ago') {
		output = 'just now';
	}
	return output;
}

function getFormattedScore(score, score_hidden) {
	return score_hidden
		? '[score hidden]'
		: `${score} point${score !== 1 ? 's' : ''}`;
}

export default function URLNode(props) {

	const { url, comment, hasError, setFixedLink } = props;

	const [isToolTipShown, setIsToolTipShown] = useState(false);
	const [isFixLinkDialogShown, setIsFixLinkDialogShown] = useState(false);

	// Use to denote that a user submitted a fix for this link
	const [isFixed, setIsFixed] = useState(false);
	// Use to denote that this is the first time this link was found
	const [isFirstTime, setIsFirstTime] = useState(false);

	// Conditionally changing CSS if error.
	return (
		<>
			<div className="container">
				<div className="votesContainer">
					<div className="vote up">
						<FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
					</div>
					<div className={`vote down ${hasError ? 'error' : '' }`}>
						<FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
					</div>
				</div>
				{comment ? 
					// Has Comment
					<div className="comment">
						<div className="headerContainer">
							{comment.author !== '[deleted]' ? (
								<a
									className="author"
									style={{ textDecoration: 'none' }}
									href={`https://www.reddit.com/user/${comment.author}`}
									target="blank">
									{comment.author}
								</a>
							) : (
								<div style={{ color: '#888' }}>{comment.author}</div>
							)}
							<div className="details">
								<div>{getFormattedScore(comment.score, comment.score_hidden)}</div>
								<div>{getFormattedTimePassed(comment.created_utc)}</div>
								<div>
									in{' '}
									<a href={url} target="blank">
										{comment.subreddit_name_prefixed}
									</a>
								</div>
							</div>
						</div>
						<p
							dangerouslySetInnerHTML={{
								__html: addOptionsToHTML(unescapeHTML(comment.body_html), {
									a: { target: 'blank' },
								}),
							}}></p>
					</div>
					:
					// Has no comments
					<div className="comment">
						<div className="headerContainer">
							<div className="loading">
								{hasError ? "Error Loading" : "Loading"}
							</div>
							{
								hasError ?
									<div className="errorWarning">
										<div className="icon">
											<FontAwesomeIcon icon={faWrench} onClick={()=>setIsFixLinkDialogShown(true)}></FontAwesomeIcon>
										</div>
										<div className="icon" onMouseEnter={()=>setIsToolTipShown(true)} onMouseLeave={()=>setIsToolTipShown(false)}>
											<FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon>
										</div>
										<ToolTip isShown={isToolTipShown}></ToolTip>
										<FixLinkDialog isShown={isFixLinkDialogShown} setIsShown={setIsFixLinkDialogShown} linkToFix={url} setFixedLink={setFixedLink}></FixLinkDialog>
									</div>
									:
									<></>
							}
						</div>
						<p className="loading-link" >
							<a href={url} target="blank">
								{url}
							</a>
						</p>
					</div>
				}
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

				.comment {
					width: 100%;
				}

				.headerContainer {
					display: flex;
					font-size: 1.25rem;
					font-weight: 900;
					color: #336699;
					width: 100%;
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

				.headerContainer .loading {
					color: black;
					padding-bottom: 0.75em;
				}

				.headerContainer .errorWarning {
					color: rgb(253, 87, 87);
					margin-left: auto;
					display: flex;
				}

				.headerContainer .errorWarning .icon {
					padding: 0 0.25em;
					transition-duration: 0.4s;
                    color: black;  
				}

				.headerContainer .errorWarning .icon:hover {
					color: rgb(253, 87, 87);
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

				.down.error {
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

				.loading-link {
					padding-bottom: 0.75em;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 90%;
				}
			`}</style>
		</>
	);
}
