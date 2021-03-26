import React from 'react';
import renderer from 'react-test-renderer';
import Content from '../src/Content';

test('Create snapshot for future comparison', () => {
    const component = renderer.create(<Content/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})