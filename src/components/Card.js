import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = props => (
    <div className={`card ${props.className}`}>
        <div className="card-body">{props.children}</div>
    </div>
);

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Card.defaultProps = {
    className: '',
};

export default Card;
