import React, { useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button(props) {

    const {
        faIcon,
        color,
        hoverColor,
        onClick
    } = props;

    return (
        <>
            <div className='button' onClick={() => { if (onClick) onClick(); }}>
                {faIcon ?
                    <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>
                    :
                    <></>
                }
                {props.children}
            </div>
            <style jsx>{`
                .button {
                    padding: 0 0.25em;
					transition-duration: 0.4s;
                    color: ${color};   
                }

                .button:hover {
					color: ${hoverColor};
				}
            `}</style>
        </>
    );
}