import React, { useRef, useEffect } from 'react';

import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { isValidUrl } from './common';

toast.configure();

export default function FixLinkDialog(props) {
    const { linkToFix, setFixedLink, isShown, setIsShown } = props;

    const dialogRef = useRef(null);
    const linkInputRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            const wasClicked = dialogRef.current && dialogRef.current.contains(event.target);
            if (dialogRef.current) {
                setIsShown(wasClicked);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [dialogRef]);

    function onSaveClick() {
        // Get the link input element
        const linkInput = linkInputRef.current;
        // This is the value of the link input
        const submittedLink = linkInput.value.trim();
        // Here, we validate the input is a valid url
        const valid = isValidUrl(submittedLink);

        /***************************************
         
        This seems like a good place to call the API with the new url
        to test to see if it is valid. However later on we may want to move 
        that API call up into URLNode or even into the URLNodeList in order 
        to not have to worry about passing data, such as first time visited, 
        back up to an ancestor for display.

        ****************************************/
        if (!valid) {
            // This should display an error.
            toast.error('That does not look like a link!', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else {
            linkInput.value = '';
            setFixedLink(submittedLink);
        }
    }

    return (
        isShown ?
            <div className='focus'>
                <div className='container' ref={dialogRef}>
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

                .container {
                    width: 33vw;
                    position: absolute;
                    top: 25%;
                    left: 33%;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    border-radius: 0.25em;
                }

                .container > div {
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
            </div>
            :
            <></>
    );

}