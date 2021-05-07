import React from 'react';
import Layout from '../src/Layout';
import '../src/fonts.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
