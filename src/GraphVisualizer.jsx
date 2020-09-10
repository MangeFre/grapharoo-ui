import React from 'react';
import './GraphVisualizer.css';

export default function GraphVisualizer({ graph }) {
	return (
		<ol>
			{graph.map((item, index) => {
				if (index + 1 === graph.length) {
					return (
						<p key={index}>
							<a href={item}>{item}</a>
						</p>
					);
				} else {
					return (
						<p key={index}>
							<a href={item}>{item}</a>
							{' => '}
						</p>
					);
				}
			})}
		</ol>
	);
}
