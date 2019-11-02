import React, { useState } from 'react';
import Board from '../../components/board/Board';
import Player from '../../components/player/Player';
import WinModal from '../../components/winModal/WinModal';
import Button from '../button/Button';
import './game.css';


export default function Game() {
  
  const initGameBoard = () => {
    return (new Array(6).fill(undefined)).map(() => {
      return new Array(7).fill(undefined);
    });
  }

  const RandomPlayerPicker = () => {
    return  Math.floor(Math.random() * 2) === 0 ? 'red' : 'blue';
  }

  const [player, setPlayer] = useState(RandomPlayerPicker());
  const [winner, setWinner] = useState('');
  const [matrix, setMatrix] = useState(initGameBoard());
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [winningCombination, setWinningCombination] = useState([]);

  const newGame = () => {
    setWinner('');
    setMatrix(initGameBoard);
    setWinModalOpen(false);
    setWinningCombination([]);
  }

  const onMatrixUpdate = (i, j) => {
    let nextMatrix = [...matrix];
    const isNextPlayer = correctPlayerPosition(j, nextMatrix);
    if (isNextPlayer) {
      setMatrix(nextMatrix);
      const currentWinner = checkWhoWon(nextMatrix);
      if(currentWinner) {
        setWinModalOpen(true);
        setWinner(currentWinner);
      } else {
        setPlayer(togglePlayer());
      }
    }
  }

  const togglePlayer = () => {
     return player === 'red' ? 'blue' : 'red';
  }

  const correctPlayerPosition = (j, matrix) => {
    let flag = false;
    for (let r = matrix.length - 1; r >= 0; r--) {
      if (matrix[r][j] === undefined) {
        matrix[r][j] = player;
        flag = true;
        break;
      }
    }
    return flag;
  }

  const checkWhoWon = (matrix) => {
    for (let i = matrix.length - 1; i >= 0; i--) {
      for (let j = matrix[i].length - 1; j >= 0; j--) {
        if (!matrix[i][j]) {
          continue;
        }
        if (matrix[i][j] === matrix[i][j - 1] && matrix[i][j - 1] === matrix[i][j - 2] && matrix[i][j - 2] === matrix[i][j - 3]) {
          setWinningCombination([`${i}${j}`, `${i}${j - 1}`, `${i}${j - 2}`, `${i}${j - 3}`]);
          return matrix[i][j];
        }

        if (matrix[i - 3] && matrix[i][j] === matrix[i - 1][j] && matrix[i - 1][j] === matrix[i - 2][j] && matrix[i - 2][j] === matrix[i - 3][j]) {
          setWinningCombination([`${i}${j}`, `${i - 1}${j}`, `${i - 2}${j}`, `${i - 3}${j}`]);
          return matrix[i][j];
        }

        if(matrix[i-3] && matrix[i][j] === matrix[i - 1][j - 1] && matrix[i - 1][j - 1] === matrix[i-2][j-2] && matrix[i-2][j-2] === matrix[i-3][j-3]){
          setWinningCombination([`${i}${j}`, `${i - 1}${j - 1}`, `${i - 2}${j - 2}`, `${i - 3}${j - 3}`]);
          return matrix[i][j];
        }
        if(matrix[i-3] && matrix[i][j] === matrix[i - 1][j + 1] && matrix[i - 1][j + 1] === matrix[i-2][j+2] && matrix[i-2][j+2] === matrix[i-3][j+3]){
          setWinningCombination([`${i}${j}`, `${i - 1}${j + 1}`, `${i - 2}${j + 2}`, `${i - 3}${j + 3}`]);
          return matrix[i][j];
        }
      }
    }
    return '';
  }


  return (
    <>
      <h1 className="header">The 4 in a row game</h1>
      <div className="game">
        <WinModal
          isOpen={winModalOpen}
          message={`The ${winner} player has won`}
          cbFunc={newGame}
        />

        <Player color='blue' currentTurn={player === 'blue'} />
        
        <div className='board-container'>
          <Board
            matrixTable={matrix}
            onMatrixUpdate={onMatrixUpdate}
            winner={winner}
            winningCombination={winningCombination}
            />

          <Button
            className={'reset'}
            cbFunc={() => {
              newGame();
              setPlayer(RandomPlayerPicker());
            }}
            text='new game'
            />
        </div>
        
        <Player color='red' currentTurn={player === 'red'} />
      </div>
    </>
  );
}

