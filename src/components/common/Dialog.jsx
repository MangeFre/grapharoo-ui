import React, { useRef, useEffect } from 'react';

export default function Dialog(props) {

    const {
        isShown,
        setIsShown
    } = props;

    const dialogRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            const wasClicked = dialogRef.current && dialogRef.current.contains(event.target);
            if (dialogRef.current && setIsShown) {
                setIsShown(wasClicked);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [dialogRef]);

    return (
        isShown ?
            <div className='focus'>
                <div className='dialog-container' ref={dialogRef}>
                    {props.children}
                </div>
                <style jsx>{`
                .focus {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.75); 
                }

                .dialog-container {
                    width: 33vw;
                    position: absolute;
                    top: 25%;
                    left: 33%;
                    background-color: white;
                    border-radius: 0.25em;
                }           
                `}</style>
            </div>
            :
            <></>
    );
}