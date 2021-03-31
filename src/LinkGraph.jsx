import React from 'react';
import * as d3 from 'd3';
import useD3 from '../src/hooks/useD3';

function linkArc(d) {
	const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
	return `
	  M${d.source.x},${d.source.y}
	  A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
	`;
}

const drag = (simulation) => {
	function dragstarted(event, d) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(event, d) {
		d.fx = event.x;
		d.fy = event.y;
	}

	function dragended(event, d) {
		if (!event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	return d3
		.drag()
		.on('start', dragstarted)
		.on('drag', dragged)
		.on('end', dragended);
};

export default function LinkGraph({ nodes }) {
	const ref = useD3((svg) => {
		const cleanNodes = Array.from(
			new Set(nodes.flatMap((node) => [node.link.url, node.next.url])),
		).map((url) => {
			return Object.create({ id: url });
		});

		const links = nodes.map((node) => {
			return Object.create({ source: node.link.url, target: node.next.url });
		});

		const simulation = d3
			.forceSimulation(cleanNodes)
			.force(
				'link',
				d3.forceLink(links).id((d) => d.id),
			)
			.force('charge', d3.forceManyBody().strength(-800))
			.force('x', d3.forceX())
			.force('y', d3.forceY());

		const link = svg
			.append('g')
			.attr('fill', 'none')
			.attr('stroke-width', 1.5)
			.selectAll('path')
			.data(links)
			.join('path')
			.attr('stroke', 'red');

		const node = svg
			.append('g')
			.attr('fill', 'blue')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round')
			.selectAll('g')
			.data(cleanNodes)
			.join('g')
			.call(drag(simulation));

		node
			.append('circle')
			.attr('stroke', 'white')
			.attr('stroke-width', 1.5)
			.attr('r', 4);

		node
			.append('text')
			.attr('x', 8)
			.attr('y', '0.31em')
			.text((d) => d.id)
			.clone(true)
			.lower()
			.attr('fill', 'none')
			.attr('stroke', 'white')
			.attr('stroke-width', 3);

		simulation.on('tick', () => {
			link.attr('d', linkArc);
			node.attr('transform', (d) => `translate(${d.x},${d.y})`);
		});


		return svg.node();
	});

	return (
		<div>
			<svg
				ref={ref}
				style={{
					height: 'calc(100% - 20px)',
					width: '100%',
					margin: '10px',
					background: 'white',
				}}>
				<g className="plot-area" />
				<g className="x-axis" />
				<g className="y-axis" />
			</svg>
			<style jsx>
				{`
					div {
						display: flex;
						height: 100%;
						width: 100%;
					}
				`}
			</style>
		</div>
	);
}
