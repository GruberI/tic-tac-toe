import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helper'

const Game = () => {
    //set history, start at null
    const [history, setHistory] = useState([Array(9).fill(null)]);
    //keep track of steps, start with 0
    const [stepNumber, setStepNumber ] = useState(0);
    //start with X, X always first (true)
    const [xIsNext, setXisNext] = useState(true);
    //Keep track of the winner
    const winner = calculateWinner(history[stepNumber]);
    //x or o in square
    const xO = xIsNext ? 'X' : 'O';

    //event handler
    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        //copy of squares, copy of current history
        const squares = [...current];
        //return if won or square is occupied
        if (winner || squares[i]) return;
        //if game is not over and square has not been clicked then select the sqaure
        squares[i] = xO;
        //history of squares plus the sqaure you just clicked
        setHistory([...historyPoint, squares]);
        //set step number
        setStepNumber(historyPoint.length);
        //opposite of X next. set's O's turn.
        setXisNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        //figure out if it's x or o
        setXisNext(step % 2 === 0);
    }

    const renderMoves = () => 
          //map through each move to create a destination
    history.map((_step, move) => {
        //if move number is not zero then go to move number move
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
    

    return (
        <>
            <h1>React Tic Tac Toe - with Hooks</h1>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className='info-wrapper'>
                <div>
                    <h3>History</h3>
                    {/* function to render history */}
                    {renderMoves()}
                    {/* declare either the winner or the next player pass winner or xO */}
                </div>
                <h3>{winner ? "Winner:" + winner : "Next Player:" + xO }</h3>
            </div> 
        </>
    )
}

export default Game;