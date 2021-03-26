import React from 'react';
import renderer from 'react-test-renderer';
import GraphVisualizer from '../src/GraphVisualizer';

const testLink = 'https://www.reddit.com/r/aww/comments/hd6xtp/comment/fvk5vao';

test('Create snapshot for future comparison', () => {
    const component = renderer.create(<GraphVisualizer origin={testLink}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})