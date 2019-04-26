import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import './index.css';

const Modal = props => {
  const { children } = props;
  return (
    <div className="Modal">
      <Card>{children}</Card>
    </div>
  );
};

Modal.prototype = {
  children: PropTypes.string.isRequired
};

export default Modal;
