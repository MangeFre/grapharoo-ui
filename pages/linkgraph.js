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
			<LinkGraph nodes={nodes}></LinkGraph>
		</>
	);
}

export async function getServerSideProps(context) {
	const res = await getAllNodes();
	const nodes = await JSON.parse(res);
	return {
		props: {
			nodes,
		},
	};
}
