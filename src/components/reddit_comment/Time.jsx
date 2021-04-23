import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function Time(props) {

    const {
        utc
    } = props;

    const [formattedTime, setFormattedTime] = useState(null);

    useEffect(() => {
        if (utc) {
            let time = moment(utc).fromNow();
            if (time === 'a few seconds ago') {
                time = 'just now';
            }
            setFormattedTime(time);
        }
    }, [utc]);

    return (
        <>
            <div className='time'>{formattedTime}</div>
            <style jsx>{`
                .time {
                    color: #888;
                    font-size: 1.25em;
                    font-weight: 900;
                    font-family: 'Open Sans', sans-serif;
                }
            `}</style>
        </>
    );
}