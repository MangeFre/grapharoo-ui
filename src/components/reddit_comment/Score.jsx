import React, { useState, useEffect } from 'react';

export default function Score(props) {

    const {
        score,
        isScoreHidden
    } = props;

    const [formattedScore, setFormattedScore] = useState(null);

    useEffect(() => {
        setFormattedScore(isScoreHidden ? '[score hidden]' : `${score} point${score !== 1 ? 's' : ''}`);
    }, [score, isScoreHidden]);

    return (
        <>
            <div className='score'>{formattedScore}</div>
            <style jsx>{`
                .score {
                    color: #888;
                    font-size: 1.25em;
                    font-weight: 900;
                    font-family: 'Open Sans', sans-serif;
                }
            `}</style>
        </>
    );
}