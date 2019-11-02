import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button({ text, cbFunc }) {
  return (
    <button
      onClick={cbFunc}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  cbFunc: PropTypes.func
}
