import React from 'react';
import Layout from '../src/Layout';
import Header from '../src/Header';
import LinkGraph from '../src/LinkGraph';

export default function LinkGraphPage(props) {
	return (
		<>
			<Header
				title="Grapharoo"
				subtitle="Mapping out the old Switcheroo Links"
				onSubmit={() => {}}></Header>
			<LinkGraph></LinkGraph>
		</>
	);
}
