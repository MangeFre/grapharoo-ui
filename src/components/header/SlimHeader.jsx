import React from 'react';
import LinkInput from '../../LinkInput';
import Navigation from './Navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

export default function SlimHeader(props) {
    const {
        onSubmit
    } = props;

    return (
        <>
            <div className="header">
                <a className="icon" href="/">
                    <FontAwesomeIcon icon={faProjectDiagram}></FontAwesomeIcon>
                </a>
                <div className="search">
                    <LinkInput onSubmit={onSubmit} />
                </div>
                <div className="navigation">
                    <Navigation></Navigation>
                </div>
                
            </div>
            <style jsx>{`           
            .header {
                display: flex;
                background-color: rgb(253, 87, 87);
                color: white;
            }

            .header .icon {
                padding: 0.25em 0.5em;
                font-size: 2.5em;
                margin: auto 0;
                color: white;
            }

            .header .search {
                margin: auto 0;
                align-self: center;
                width: 30em;
            }

            .navigation {
                margin-left: auto;
                margin-top: auto;
                margin-bottom: auto;               
            }
            `}</style>
        </>
    )
}