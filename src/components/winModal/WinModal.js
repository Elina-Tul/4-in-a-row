import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './win-modal.css';

export default function WinModal({ isOpen, cbFunc, message }) {
  return isOpen && (
    <div className="win-modal">
      <div className="modal-container">
        <span>{message}</span>
        <Button
          cbFunc={cbFunc}
          text='new game'
          />
      </div>
    </div>
  )
}

WinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  cbFunc: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}