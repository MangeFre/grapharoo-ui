import React, { useState, useEffect, useRef } from 'react';
import URLNode from './URLNode';
import { toast } from 'react-toastify';

import { getNextLink, fixLink } from './apiHandler.js';

toast.configure();

export default function URLNodeList(props) {

    const [urlNodes, setUrlNodes] = useState([]);
    const [nextUrlNode, setNextUrlNode] = useState(<></>);

    const [nextUrl, setNextUrl] = useState(null);
    const [errorUrl, setErrorUrl] = useState(null);
    const [fixedUrl, setFixedUrl] = useState(null);

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
        setFixedUrl(null);

        // fetch first url
        setNextUrl(originUrl);

    }, [originUrl]);

    function loadUrl(url, fetch) {
        if (url && url !== '') {
            if (urlNodes.some(urlNode => urlNode.url === url)) {
                toast.warning(`Cycle detected! ${url} has already been visited.`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                setNextUrlNode(<URLNode key={'LoadingUrlNode'} loadingUrl={url}></URLNode>);
                fetch();
            }
        }
    }

    function processResponse(res, url) {
        if (res) {
            if (res.next) {
                const comment = res.link.data;
                const url = res.link.url;
                setUrlNodes([...urlNodes, <URLNode key={comment.created_utc} url={url} comment={comment} seen={res.seen} fixed={res.fixed}></URLNode>])
                setNextUrl(res.next.url);
            } else {
                setErrorUrl(url);
            }
        }
    }

    useEffect(() => {
        if (nextUrl && nextUrl !== '') {
            const fetch = async () => {
                const res = await getNextLink(nextUrl);
                if (res) {
                    processResponse(res, nextUrl);
                }
            };
            loadUrl(nextUrl, fetch);
        }
    }, [nextUrl]);

    useEffect(() => {
        if (fixedUrl && fixedUrl !== '') {
            const fetch = async () => {
                const res = await await fixLink(errorUrl, fixedUrl);
                if (res) {
                    processResponse(res, fixedUrl);
                }
            };
            loadUrl(nextUrl, fetch);
        }
    }, [fixedUrl]);

    useEffect(() => {
        if (errorUrl) {
            toast.warning(`Processing this link did not work: ${errorUrl}`, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
            setNextUrlNode(<URLNode key={'ErrorUrlNode'} errorUrl={errorUrl} setFixedLink={setFixedUrl}></URLNode>);
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
                        padding-bottom: 1em;
					}
				`}</style>
        </div>
    )
}