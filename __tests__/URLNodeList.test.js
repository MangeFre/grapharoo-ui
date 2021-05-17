import React from 'react';
import renderer from 'react-test-renderer';
import URLNodeList from '../src/components/url_node/URLNodeList';

const testLink = 'https://www.reddit.com/r/aww/comments/hd6xtp/comment/fvk5vao';

test('Create snapshot for future comparison', () => {
    const component = renderer.create(<URLNodeList originUrl={testLink}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})