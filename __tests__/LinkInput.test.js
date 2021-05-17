import React from 'react';
import renderer from 'react-test-renderer';
import LinkInput from '../src/components/header/LinkInput';

const onSubmit = () => {};

test('Create snapshot for future comparison', () => {
    const component = renderer.create(<LinkInput onSubmit={onSubmit}></LinkInput>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})