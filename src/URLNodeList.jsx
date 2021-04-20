import React, { useState, useEffect, useRef } from 'react';
import URLNode from './URLNode';
import { toast } from 'react-toastify';

import { getNextLink } from './apiHandler.js';

toast.configure();

export default function URLNodeList(props) {

    const [urlNodes, setUrlNodes] = useState([]);
    const [nextUrlNode, setNextUrlNode] = useState(<></>);

    const [nextUrl, setNextUrl] = useState(null);
    const [errorUrl, setErrorUrl] = useState(null);

    const [isAtBottom, setIsAtBottom] = useState(true);
    const [wasAtBottom, setWasAtBottom] = useState(true);

    const { originUrl } = props;

    const containerRef = useRef(null);
    const scrollToRef = useRef(null);

    // On originUrl change
    useEffect(() => {
        // Clear previous data if any
        setUrlNodes([]);
        setNextUrlNode(<></>);
        setErrorUrl(null);

        // fetch first url
        setNextUrl(originUrl);

    }, [originUrl]);

    useEffect(() => {
        if (nextUrl && nextUrl !== '') {
            if (urlNodes.some(urlNode => urlNode.url === nextUrl)) {
                toast.warning(`Cycle detected! ${nextUrl} has already been visited.`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
            else {
                setNextUrlNode(<URLNode key={'LoadingUrlNode'} url={nextUrl}></URLNode>);
                const fetch = async () => {
                    const res = await getNextLink(nextUrl);
                    if (res) {
                        if (res.next) {
                            const comment = res.link.data;
                            setUrlNodes([...urlNodes, <URLNode key={comment.created_utc} url={nextUrl} comment={comment}></URLNode>])
                            setNextUrl(res.next.url);
                        } else {
                            setErrorUrl(nextUrl);
                        }
                    }

                };
                fetch();
            }
        }
    }, [nextUrl]);

    useEffect(() => {
        if (errorUrl) {
            toast.warning(`Processing this link did not work: ${errorUrl}`, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
            setNextUrlNode(<URLNode key={'ErrorUrlNode'} url={errorUrl} hasError={true} setFixedLink={setNextUrl}></URLNode>);
        }
    }, [errorUrl]);

    useEffect(() => {
        if (nextUrlNode) {
            if (wasAtBottom && isAtBottom)
                scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
            setWasAtBottom(isAtBottom);
        }
    }, [nextUrlNode, scrollToRef]);

    return (
        <div ref={containerRef} onScroll={()=> setIsAtBottom(containerRef.current.offsetHeight + containerRef.current.scrollTop === containerRef.current.scrollHeight)}>
            {urlNodes}
            {nextUrlNode}
            <span ref={scrollToRef}></span>
            <style jsx>{`
					div {
						display: flex;
						flex-direction: column;
						width: 100%;
						height: 100%;
						background: #ff9999;
                        overflow-y: auto;
					}

					div:last-child {
						padding-bottom: 1rem;
					}

					li {
						list-style-type: none;
					}

				`}</style>
        </div>
    )
}