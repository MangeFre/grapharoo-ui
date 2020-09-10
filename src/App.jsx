import React from 'react';
import { hot } from 'react-hot-loader';
import Content from './Content';

function App() {
	return (
		<div className="App">
			<Content />
			<style jsx>{`
				div {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
				}
			`}</style>
		</div>
	);
}

export default hot(module)(App);
