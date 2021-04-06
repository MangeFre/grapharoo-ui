import React from 'react';
import * as d3 from 'd3';
import useD3 from '../src/hooks/useD3';

function linkArc(d) {
	return `
	  M${d.source.x},${d.source.y}, ${d.target.x},${d.target.y}
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
	const width = 3000;
	const height = 3000;

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
			.attr('stroke', 'red')
			.attr('marker-end', 'url(#arrow)');

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

		const div = d3
			.select('.graph-container')
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0)
			.attr('position', 'absolute');

		svg
			.selectAll('circle')
			.on('mouseover', function (event, d) {
				div.transition().duration(200).style('opacity', 0.9);
				div
					.html(
						`<a href=${d.id} target='blank'>${new URL(d.id).pathname
							.split('/')
							.slice(0, 3)
							.join('/')}</a>`,
					)
					.style('left', event.pageX + 'px')
					.style('top', event.pageY - 28 + 'px');
			})
			.on('mouseout', function (d) {
				div.transition().duration(500).style('opacity', 0);
			})
			.on('click', function (e, d) {
				window.open(`${d.id}`);
			});

		simulation.on('tick', () => {
			link.attr('d', linkArc);
			node.attr('transform', (d) => `translate(${d.x},${d.y})`);
		});

		const zoom = d3
			.zoom()
			.on('zoom', (event) => {
				d3.selectAll('g').attr('transform', event.transform);
				link.attr('d', linkArc);
				node.attr('transform', (d) => `translate(${d.x},${d.y})`);
			})
			.scaleExtent([1, 10]);

		svg.call(zoom);

		return svg.node();
	});

	return (
		<div className="graph-container">
			<svg
				viewBox={[-width / 2, -height / 2, width, height]}
				ref={ref}
				style={{
					height: 'calc(100% - 20px)',
					width: '100%',
					margin: '10px',
					background: 'white',
				}}>
				<defs>
					<marker
						id="arrow"
						viewBox="0 0 10 10"
						refX="14"
						refY="5"
						markerWidth="6"
						markerHeight="6"
						orient="auto-start-reverse">
						<path d="M 0 0 L 10 5 L 0 10 z" />
					</marker>
				</defs>
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
			<style jsx global>
				{`
					.tooltip {
						position: absolute;
						text-align: center;
						width: min-content;
						height: min-content;
						padding: 2px;
						font: 12px sans-serif;
						background: lightsteelblue;
						border: 0px;
						border-radius: 8px;
						pointer-events: none;
					}
				`}
			</style>
		</div>
	);
}
