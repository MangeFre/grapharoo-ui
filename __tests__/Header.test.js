import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/Header';

const title = 'Grapharoo';
const subtitle = 'Mapping out the old Switcheroo Links';
const onSubmit = () => {};

test('Create snapshot for future comparison', () => {
	const component = renderer.create(
		<Header title={title} subtitle={subtitle} onSubmit={onSubmit} />,
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
