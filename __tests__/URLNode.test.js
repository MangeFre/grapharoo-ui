import React from 'react';
import renderer from 'react-test-renderer';
import URLNode from '../src/components/url_node/URLNode';

const url = 'https://www.reddit.com/r/aww/comments/hd6xtp/comment/fvk5vao';
const onFinishLoad = () => {};

test('Create snapshot for future comparison', () => {
	const component = renderer.create(
		<URLNode url={url} key={url} onFinishLoad={onFinishLoad} />,
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
