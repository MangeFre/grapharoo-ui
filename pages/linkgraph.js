import React from 'react';
import Header from '../src/Header';
import LinkGraph from '../src/LinkGraph';
import { getAllNodes } from '../src/apiHandler.js';

export default function LinkGraphPage({ nodes }) {
	return (
		<>
			<Header
				title="Grapharoo"
				subtitle="Mapping out the old Switcheroo Links"
				onSubmit={() => {}}></Header>
			<LinkGraph nodes={nodes} />
		</>
	);
}

export async function getServerSideProps(context) {
	const nodes = await getAllNodes();
	return {
		props: {
			nodes,
		},
	};
}
