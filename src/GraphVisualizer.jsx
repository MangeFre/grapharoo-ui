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
					width: 100%;
					height: 100%;
				}
			`}</style>
		</div>
	);
}

