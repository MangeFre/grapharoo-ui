import React, { useState, useEffect } from 'react';
import HTML from 'html-parse-stringify';

function unescapeHTML(escapedHTML) {
    return escapedHTML
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function addOptionsToHTML(unescapedHTML, options = {}) {
    let newHTML = unescapedHTML;
    let newJson = HTML.parse(newHTML);
    traverseJsonRec(newJson[0], options);
    newHTML = HTML.stringify(newJson);
    return newHTML;
}

function traverseJsonRec(node, options) {
    // If this node is a tag (a, p, etc) and the options want to modify that part.
    if (node.type === 'text') {
        return;
    }

    if (node.type === 'tag' && options[node.name]) {
        const allKeys = Object.keys(options[node.name]);
        for (let key of allKeys) {
            node.attrs[key] = options[node.name][key];
        }
    }

    for (let child of node.children) {
        traverseJsonRec(child, options);
    }

    return;
}

export default function Body(props) {

    const {
        body
    } = props;

    const [html, setHTML] = useState(null);

    useEffect(() => {
        if (body) {
            let escapedHTML = unescapeHTML(body);
            let html = addOptionsToHTML(escapedHTML, { a: { target: 'blank', style: 'text-decoration: none;' } });
            setHTML(html);
        }
    }, [body]);


    return (
        <>
            <p className='body' dangerouslySetInnerHTML={{ __html: html }}></p>
            <style jsx>{`
                .body {
                    font-size: 1.7em;
                    font-family: 'Open Sans', sans-serif;
                }
            `}</style>
        </>
    );
}