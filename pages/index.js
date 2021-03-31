import App from '../src/App';
import React from 'react';

export default function HomePage() {
	return (
		<App>
			<style jsx global>
				{`
					height: 100vh;
					width: 100vw;
					display: flex;
					marign: 0;
					padding: 0;
				`}
			</style>
		</App>
	);
}
