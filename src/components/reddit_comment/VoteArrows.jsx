import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function VoteArrows(props) {
    
    const {
        isUpvoted,
        isDownvoted
    } = props;

    return (
        <>
            <div className='vote-arrow-container'>
                <div className={`vote-arrow ${ isUpvoted ? 'upvoted' : '' }`}>
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </div>
                <div className={`vote-arrow ${ isDownvoted ? 'downvoted' : '' }`}>
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </div>
            </div>
            <style jsx>{`
                .vote-arrow-container {
                    padding-top: 0.25em;
                }

                .vote-arrow {
					color: #c6c6c6;
					font-size: 1.75em;
				}

                .upvoted {
					color: #ff8b60;
                    font-weight: 1000;
				}

                .downvoted {
                    color: #9494ff;
                }
            `}</style>
        </>
    );
}