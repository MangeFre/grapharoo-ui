import React, { useRef, useEffect } from 'react';

import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { isValidUrl } from '../../common';

import Dialog from '../common/Dialog';

toast.configure();

export default function FixLinkDialog(props) {
    const { linkToFix, setFixedLink, isShown, setIsShown } = props;

    const linkInputRef = useRef(null);

    function onSaveClick() {
        // Get the link input element
        const linkInput = linkInputRef.current;
        // This is the value of the link input
        const submittedLink = linkInput.value.trim();
        // Here, we validate the input is a valid url
        const valid = isValidUrl(submittedLink);

        if (!valid) {
            // This should display an error.
            toast.error('That does not look like a link!', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else {
            linkInput.value = '';
            setFixedLink(submittedLink);
            setIsShown(false);
        }
    }

    return (
        <>
            <Dialog isShown={isShown} setIsShown={setIsShown}>
                <div className='fix-link-dialog-container'>
                    <div className='header'>
                        <div>Fix Link</div>
                        <div className='icon'>
                            <FontAwesomeIcon icon={faTimes} onClick={() => setIsShown(false)}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className='broken'>
                        <div>Broken Link:</div>
                        <div className='link'>
                            <a href={linkToFix} target="blank">
                                {linkToFix}
                            </a>
                        </div>
                    </div>
                    <div className='fixed'>
                        <div>Fixed Link:</div>
                        <input type="text" ref={linkInputRef} placeholder="Enter Fixed Link"></input>
                        <div className="submit">
                            <button onClick={() => onSaveClick()}>Save</button>
                            <button onClick={() => setIsShown(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>


            <style jsx>
                {`
                .focus {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.75); 
                }

                .fix-link-dialog-container {
                    display: flex;
                    flex-direction: column;
                }

                .fix-link-dialog-container > div {
                    padding: 0.3em 0.55em;
                    white-space: nowrap;
                    color: black;
                    font-size: 1.25em;
                }

                .header {
                    font-size: 1em;
                    background-color: rgb(253,87,87);
                    color: white !important;
                    display: flex;
                }

                .header .icon {
                    padding: 0 0.25em;
                    margin-left: auto;
                    font-size: 1em;
                }

                .link {
                    overflow: hidden;
					text-overflow: ellipsis;
					width: 97%;
                }

                a {
					font-size: .9em;
                    padding: 0.25em;
				}

                .fixed input[type=text] {
                    font-size: 0.75em;
                    margin-bottom: 1em;
                    margin-left: 0.25em;
                    width: 97%;
                }

                .fixed .submit button {
                    margin-right: 0.5em;
                    font-size: 0.75em;
                    margin-bottom: 0.5em;
                }
                `}
            </style>

        </>
    );

}