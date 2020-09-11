import React from 'react';
import './GraphVisualizer.css';
import URLNode from './URLNode';

// This can be used for CSS - Changing CSS
// should not cause rer-renders (I think)
export default function GraphVisualizer({ origin }) {
	return (
		<div>
			<URLNode url={origin} />
			<style jsx>{`
				div {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
					background: #ff9999;
				}

				div:last-child {
					margin-bottom: 1rem;
				}
			`}</style>
		</div>
	);
}
