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
            <div className='button'>
                <FontAwesomeIcon icon={faIcon} onClick={() => { if(onClick) onClick(); }}></FontAwesomeIcon>
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