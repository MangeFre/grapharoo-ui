import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import BrokenComment from '../reddit_comment/BrokenComment';
import Comment from '../reddit_comment/Comment';
import LoadingComment from '../reddit_comment/LoadingComment';
import VoteArrows from '../reddit_comment/VoteArrows';

toast.configure();

export default function URLNode(props) {

	const { 
		url,
		errorUrl, 
		loadingUrl,
		comment,  
		setFixedLink, 
		seen,
		fixed
		
	} = props;

	const [isUpvoted, setIsUpvoted] = useState(false);
	const [isDownvoted, setIsDownvoted] = useState(false);

	useEffect(()=>{
		setIsUpvoted(comment !== null && comment !== undefined);
	}, [comment]);

	useEffect(()=>{
		setIsDownvoted(errorUrl !== null && errorUrl !== undefined);
	}, [errorUrl]);

	return (
		<>
			<div className='container'>
				<div className='reddit-comment'>
					<div className='vote-arrows'>
						<VoteArrows isUpvoted={isUpvoted} isDownvoted={isDownvoted}></VoteArrows>
					</div>
					<div className='comment'>
						{/*
						 Only one of the Comment elements below should be shown at a time
						*/}
						{ comment ? <Comment comment={comment} url={url} seen={seen} fixed={fixed}></Comment> : <></> }
						{ errorUrl ? <BrokenComment url={errorUrl} setFixedLink={setFixedLink}></BrokenComment> : <></> }
						{ loadingUrl ? <LoadingComment url={loadingUrl}></LoadingComment> : <></> }
					</div>
				</div>
			</div>
			<style jsx>{`
				.container {
					display: flex;
					flex-direction: row;

					margin: 1rem 1rem 0rem 1rem;
					padding: 1rem 1rem 0rem 1rem;

					border-radius: 0.5rem;

					background-color: white;

					-webkit-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
					-moz-box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
					box-shadow: 5px 5px 9px 3px rgba(0, 0, 0, 0.38);
				}

				.reddit-comment {
                    display: flex;
					flex-direction: row;
                }
				
                .vote-arrows {
                    padding-right: 1em;
                }
			`}</style>
		</>
	);
}
