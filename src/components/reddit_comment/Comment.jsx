import React from 'react';

import Author from './Author';
import Body from './Body';
import Score from './Score';
import Subreddit from './Subreddit';
import Time from './Time';

import Button from '../common/Button';
import ToolTip from '../common/ToolTip';

import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Comment(props) {

    const {
        comment,
        url,
        seen,
        fixed
    } = props;

    return (
        <>
            <div className='comment-container'>
                <div className='header'>
                    <Author author={comment.author}></Author>
                    <div className='details'>
                        <div>
                            <Score score={comment.score} isScoreHidden={comment.score_hidden}></Score>
                        </div>
                        <div>
                            <Time utc={comment.created_utc}></Time>
                        </div>
                        <div>
                            <Subreddit subreddit={comment.subreddit_name_prefixed} url={url}></Subreddit>
                        </div>
                        {
                            !seen ?
                                <ToolTip content={"First time this link has been found"}>
                                    <Button faIcon={faExclamation} color={'black'}></Button>
                                </ToolTip>
                                :
                                <></>
                        }
                                                {
                            fixed ?
                                <ToolTip content={"This link has been fixed"}>
                                    <Button faIcon={faLink} color={'black'}></Button>
                                </ToolTip>
                                :
                                <></>
                        }
                    </div>
                </div>
                <Body body={comment.body_html}></Body>
            </div>
            <style jsx>{`
                .header {
                    display: flex;
                }

                .details {
                    display: flex;
                    padding: 0 0.75em;
                }

                .details > div {
                    padding-right: 0.25rem;
                }
            `}</style>
        </>
    );
}