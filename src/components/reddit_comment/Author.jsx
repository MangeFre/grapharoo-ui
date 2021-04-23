import React from 'react';

export default function Author(props) {
    const {
        author
    } = props;

    return (
        <>
            {
                author !== '[deleted]' ?
                    <a className='author' href={`https://www.reddit.com/user/${author}`} target='blank'>
                        {author}
                    </a>
                    :
                    <div className='author'>
                        {author}
                    </div>
            }
            <style jsx>{`
                .author {
                    font-size: 1.35em;
					font-weight: 900;
                    font-family: 'Open Sans', sans-serif;
                }

                a.author {
                    text-decoration: none;
                }

                div.author {
                    color: #888;
                }

            `}</style>
        </>
    );
}