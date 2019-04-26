import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = (props) => {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
};

Button.prototype = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
