import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GraphVisualizer.css';
import URLNode from './URLNode';

// This can be used for CSS - Changing CSS
// should not cause rer-renders (I think)
export default class GraphVisualizer extends Component {
	constructor(props) {
		super();
		const { origin } = props;
		this.state = {
			origin,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const { origin } = this.props;
		if (prevProps.origin !== origin) {
			console.log('Got new origin!');
			this.setState({
				origin,
			});
		}
	}

	render() {
		const { origin } = this.state;
		console.log(origin)
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
}
