import React from 'react';
import LinkInput from './LinkInput';
import './Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

export default function Header({ title, subtitle, onSubmit }) {


    return (
        <div className="header">
            <div className="title">
                <div className="icon">
                    <FontAwesomeIcon icon={faProjectDiagram}></FontAwesomeIcon>
                </div>
                <div>
                    <h1>{title}</h1>
                    <h3>{subtitle}</h3>
                </div>
            </div>
            <div className="searchForm">
                <LinkInput  onSubmit={onSubmit} />
            </div>
        </div>
    );
}