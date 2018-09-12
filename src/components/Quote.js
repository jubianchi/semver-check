// @flow

import React, { type Node } from 'react';
import './Quote.css';

type QuoteProps = {
    className: string,
    author: string,
    source: string,
    children: Node,
};

const Quote = (props: QuoteProps): Node => (
    <blockquote className={`blockquote pl-3 ${props.className}`}>
        {props.children}

        <footer className="blockquote-footer">
            <a href={props.source}>{props.author}</a>
        </footer>
    </blockquote>
);

Quote.defaultProps = {
    className: '',
};

export default Quote;
