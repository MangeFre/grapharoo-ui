import React from 'react';

export default function LoadingComment(props) {

    const {
        url
    } = props;

    return (
        <>
            <div className='loading-comment-container'>
                <div className='header'>
                    <div>Loading:</div>
                </div>
                <div className='url'>
                    <a href={url} target='blank'>
                        {url}
                    </a>
                </div>
            </div>
            <style jsx>{`
            .header {
                display: flex;
                font-size: 1.5em;
                font-weight: 600;
            }

            a {
                text-decoration: none;
                font-size: 1.5em;
                font-weight: 600;
            }

            .url {
                margin: 1em 0;
            }
            `}</style>
        </>
    );
}