import React from 'react';
import PropTypes from 'prop-types';
import './circle.css';

export default function Circle({ color }) {
	return (
		<div
			className={`circle ${color}`}
		/>
	)
}

Circle.propTypes = {
	color: PropTypes.string.isRequired
}

