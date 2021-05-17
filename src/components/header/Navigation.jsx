import React from 'react';
import Button from '../common/Button';

export default function Navigation(props) {

    const {

    } = props;

    return (
        <>
            <div className="navigation-container">
                <div className="navigation-button">
                    <Button>
                        <a className='navigation-link' href='/'>Home</a>
                    </Button>
                </div>
                <div className="navigation-button">
                    <Button>
                        <a className='navigation-link' href='/linkgraph'>Graph</a>
                    </Button>
                </div>
            </div>
            <style jsx>{`
            .navigation-container {
                display: flex;
            }

            .navigation-button {
                margin: auto 0;
                font-size: 1.35em;
                font-weight: 550;
                padding-right: 0.8em;
            }

            .navigation-link {
                text-decoration: none;
                color: white;
            }

            .navigation-link:hover {
                color: lightgray;
            }
            `}</style>
        </>
    );
}