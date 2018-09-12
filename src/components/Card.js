// @flow

import React, { type Node } from 'react';
import './Card.css';

type CardProps = {
    className: string,
    children: Node,
};

const Card = (props: CardProps): Node => (
    <div className={`card ${props.className}`}>
        <div className="card-body">{props.children}</div>
    </div>
);

Card.defaultProps = {
    className: '',
};

export default Card;
