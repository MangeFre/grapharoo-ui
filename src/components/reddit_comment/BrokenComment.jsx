import React, { useState } from 'react';

import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import Button from '../common/Button';
import ToolTip from '../common/ToolTip';

import FixLinkDialog from '../dialogs/FixLinkDialog';

export default function BrokenComment(props) {

    const {
        url,
        setFixedLink
    } = props;

    const [isFixLinkDialogShown, setIsFixLinkDialogShown] = useState(false);

    return (
        <>
            <div className='broken-comment-container'>
                <div className='header'>
                    <div>Error Loading:</div>
                    <ToolTip content={'Fix'}>
                        <Button faIcon={faWrench} color={'black'} hoverColor={'rgb(253, 87, 87)'} onClick={() => setIsFixLinkDialogShown(true)}></Button>
                    </ToolTip>
                    <ToolTip content={'More Info'}>
                        <Button faIcon={faQuestion} color={'black'} hoverColor={'rgb(253, 87, 87)'}></Button>
                    </ToolTip>
                    <FixLinkDialog isShown={isFixLinkDialogShown} setIsShown={setIsFixLinkDialogShown} linkToFix={url} setFixedLink={setFixedLink}></FixLinkDialog>
                </div>
                <div className='url'>
                    <a href={url} target='blank'>
                        {url}
                    </a>
                </div>
            </div>
            <style jsx>{`
            .header {
                display: flex;
                font-size: 1.5em;
                font-weight: 600;
            }

            a {
                text-decoration: none;
                font-size: 1.5em;
                font-weight: 600;
            }

            .url {
                margin: 1em 0;
            }
            `}</style>
        </>
    );
}