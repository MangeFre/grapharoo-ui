import React from 'react';
import SlimHeader from '../src/components/header/SlimHeader';
import LinkGraph from '../src/LinkGraph';
import { getAllNodes } from '../src/apiHandler.js';

export default function LinkGraphPage({ nodes }) {
	return (
		<>
			<SlimHeader onSubmit={() => {}}></SlimHeader>
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
