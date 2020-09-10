import React from 'react';
import './GraphVisualizer.css';

export default function GraphVisualizer({ graph }) {
	return (
		<ol>
			{graph.map((url, index) => {
				if (index + 1 === graph.length) {
					return null;
				}
				return (
					<li key={index}>
						<a href={url}>{url}</a>
						<p>{' => '}</p>
						<a href={graph[index + 1]}>{graph[index + 1]}</a>
					</li>
				);
			})}
		</ol>
	);
}
