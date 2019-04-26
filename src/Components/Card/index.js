import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Card = (props) => {
  const { children } = props;
  return <div className="Card">{children}</div>;
};

Card.prototype = {
  children: PropTypes.string.isRequired,
};

export default Card;
