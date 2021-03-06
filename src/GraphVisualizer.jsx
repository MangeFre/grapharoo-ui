import React, { Component } from 'react';
import './GraphVisualizer.css';
import URLNode from './URLNode';
import { toast } from 'react-toastify';

toast.configure();

// This can be used for CSS - Changing CSS
// should not cause rer-renders (I think)
export default class GraphVisualizer extends Component {
	constructor(props) {
		super();
		const { origin } = props;
		this.state = {
			nodes: [origin],
		};
		this.addNode = this.addNode.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		const { origin } = this.props;
		if (prevProps.origin !== origin) {
			this.setState({
				nodes: [origin],
			});
		}
	}

	addNode(node) {
		const { nodes } = this.state;

		if (nodes.includes(node)) {
			toast.warning(`Cycle detected! ${node} has already been visited.`, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} else {
			const newNodes = [...nodes];
			newNodes.push(node);
			this.setState({
				nodes: newNodes,
			});
		}
	}

	render() {
		const { nodes } = this.state;
		const allNodes = nodes.map((nodeLink) => {
			return (
				<URLNode
					url={nodeLink}
					key={nodeLink}
					onFinishLoad={(node) => this.addNode(node)}
				/>
			);
		});
		return (
			<div>
				{allNodes}
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
}
