import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../circle/Circle';
import './player.css';

export default function Player({ color, currentTurn }) {
	return (
		<div className={`player${currentTurn ? ' current': ''}`}>
			<img src='/player.png' alt='player-img' />
			<Circle color={color} />
		</div>
	);
}

Player.propTypes = {
	color: PropTypes.string.isRequired,
	currentTurn: PropTypes.bool.isRequired
};