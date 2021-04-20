import React, { useState, useEffect } from 'react';

export default function ToolTip(props) {
    const { content, isShown } = props;

    return (
        <div className='toolTipContainer'>
            {
                isShown ?
                    <div className='toolTip'>
                        <div className='title'>Unable to Process Comment</div>
                    </div>
                    :
                    <></>
            }
            <style jsx>{`
                .toolTipContainer {
                    position: relative;
                }

                .toolTip {
                    z-index: 1;
                    position: absolute;
                    background-color: white;

                    border: solid 1px black;
                    border-radius: 5px;

                    top: 60%;
                    right: 40%;
                    padding: 0.25em;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}