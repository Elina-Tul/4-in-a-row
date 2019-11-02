import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../circle/Circle';
import './board.css';

export default function Board({ matrixTable, onMatrixUpdate, winningCombination, winner }) {

const drowBoard = (matrix) => {
	let arr = [];
	for (let i = 0; i < matrix.length; i++) {
		let row = [];
		for (let j = 0; j < matrix[i].length; j++) {
			row.push(
				<td
					key={`td_${i}_${j}`}
					className={winningCombination.includes(`${i}${j}`) ? `${winner}-wins` : ''}
					onClick={() => { onMatrixUpdate(i, j) }
				}>
					{ matrix[i][j] === undefined ? "" : <Circle color={matrix[i][j]} /> }
				</td>
			);
			}
				arr.push(<tr key={`tr_${i}`}>{row}</tr>);
			}
		return arr;
	}

	return (
		<table>
			<tbody>
				{drowBoard(matrixTable)}
			</tbody>
		</table>
	)
}

Board.proTotype = {
	matrixTable: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	winningCombination: PropTypes.arrayOf(PropTypes.string).isRequired,
	onMatrixUpdate: PropTypes.func.isRequired,
	winner: PropTypes.string.isRequired
};