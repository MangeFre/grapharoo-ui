import React, { useState } from 'react';

export default function ToolTip(props) {
    const { content } = props;

    const [isShown, setIsShown] = useState(false);

    return (
        <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            {props.children}
            <div className='toolTipContainer'>
                {
                    isShown ?
                        <div className='toolTip'>
                            <div className='title'>{content}</div>
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
        </div>
    );
}