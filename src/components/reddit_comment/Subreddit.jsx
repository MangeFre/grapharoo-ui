import React from 'react';

export default function Subreddit(props) {

    const {
        subreddit,
        url
    } = props;

    return (
        <>
            <div className='subreddit'>
                in{' '}
                <a href={url} target="blank">
                    {subreddit}
                </a>
            </div>
            <style jsx>{`
            .subreddit {
                color: #888;
                font-size: 1.25em;
                font-weight: 900;
                font-family: 'Open Sans', sans-serif;
            }

            a {
                font-weight: 1000;
                text-decoration: none;
            }
            `}</style>
        </>
    );
}