import React from 'react';
import PropTypes from 'prop-types';
import './Quote.scss';

const Quote = props => (
    <blockquote className={`blockquote pl-3 ${props.className}`}>
        {props.children}

        <footer className="blockquote-footer">
            <a href={props.source}>{props.author}</a>
        </footer>
    </blockquote>
);

Quote.propTypes = {
    className: PropTypes.string,
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Quote.defaultProps = {
    className: '',
};

export default Quote;
