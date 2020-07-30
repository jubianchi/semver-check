import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Octicon from 'react-octicon';
import Clipboard from 'react-clipboard.js';

export const CopyUrl = props =>
    ((props.constraint || {}).semver || (props.version || {}).semver) && (
        <section className={`row ${props.className || ''}`}>
            <div className="col">
                <h6>COPY THE URL TO THIS CHECK</h6>

                <div className="input-group">
                    <input className="form-control" type="text" value={document.location.href} readOnly />
                    <div className="input-group-append">
                        <Clipboard data-clipboard-text={document.location.href} className="btn btn-secondary">
                            <Octicon name="clippy" />
                        </Clipboard>
                    </div>
                </div>
            </div>
        </section>
    );

CopyUrl.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object,
    version: PropTypes.object,
};

export default connect(state => state)(CopyUrl);
