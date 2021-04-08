import React, { useState, useEffect } from 'react';
import Header from './Header';
import URLNodeList from './URLNodeList';

// Not sure about the intent of the History feature. This flag will turn it back on
const displayHistory = false;

export default function Content(props) {
	const [history, setHistory] = useState([]);
	const [originUrl, setOriginUrl] = useState(null);

	useEffect(() => {
		if (originUrl) {
			setHistory([...history, originUrl]);
		}
	}, [originUrl]);

	return (
		<>
			<Header
				title="Grapharoo"
				subtitle="Mapping out the old Switcheroo Links"
				onSubmit={setOriginUrl}
			/>
			{displayHistory ?
				history.map((oldLink) => {
					return <p key={oldLink}>{oldLink}</p>;
				})
				:
				<></>}
			{!originUrl ?
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
				:
				<URLNodeList originUrl={originUrl} />
			}
		</>
	)
}