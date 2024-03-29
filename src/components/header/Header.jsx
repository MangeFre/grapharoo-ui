import React from 'react';
import LinkInput from './LinkInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

export default function Header({ title, subtitle, onSubmit }) {
	return (
		<div className="header">
			<div className="title">
				<div className="icon">
					<FontAwesomeIcon icon={faProjectDiagram}></FontAwesomeIcon>
				</div>
				<div>
					<h1>{title}</h1>
					<h3>{subtitle}</h3>
				</div>
			</div>
			<div className="searchForm">
				<LinkInput onSubmit={onSubmit} />
			</div>
			<style jsx>
				{`
					.header {
						display: flex;
						justify-content: center;
						align-content: center;

						background-color: rgb(253, 87, 87);
						color: white;
					}

					@media only screen and (max-width: 750px) {
						.header {
							flex-direction: column;
						}
					}

					.header .title {
						padding: 5px 15px;
						display: flex;
						align-self: center;
					}

					.header .icon {
						padding: 15px 15px;
						font-size: 2em;
						margin: auto 0;
					}

					.header h1 {
						margin: 5px 10px;
						font-size: 2.5em;
						font-weight: 900;
					}

					.header h3 {
						margin: 5px 5px 10px 10px;
						font-size: 1em;
					}

					.header .searchForm {
						margin: auto 0;
						flex-grow: 1;
						align-self: center;
					}

					.searchForm {
						padding-right: 1rem;
					}
				`}
			</style>
		</div>
	);
}
