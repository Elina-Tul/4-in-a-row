import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../circle/Circle';
import './board.css';

export default function Board({ matrixTable, onMatrixUpdate, winningCombination, winner }) {

	const drowBoard = (matrix) => {
		return matrix.map((row, rIndex) => {
				return (
					<tr key={`tr_${rIndex}`}>
						{
							row.map((col, cIndex) => {
									return (
										<td
											key={`td_${rIndex}_${cIndex}`}
											className={winningCombination.includes(`${rIndex}${cIndex}`) ? `${winner}-wins` : ''}
											onClick={() => { onMatrixUpdate(rIndex, cIndex) }
										}>
											{ col === undefined ? "" : <Circle color={col} /> }
										</td>
									)
							})
						}
					</tr>
				)
		})
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