import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
// 	render() {
// 		return (
// 			<button className="square" onClick={() => this.props.onClick()}>
// 				{ this.props.value }
// 			</button>
// 		);
// 	}
// }

// Changed this to a 'Functional Component'
function Square(props) {
	let classes = 'square';
	if (props.highlight) {
		classes += ' highlight';
	}
	return (
		<button className={ classes } onClick={ props.onClick }>
			{ props.value }
		</button>
	);
}

class Board extends React.Component {
	renderSquare(position, highlight=false) {
		return (
			<Square
				value={ this.props.squares[position] }
				onClick={ () => this.props.onClick(position) }
				key={ getLocationByIndex(position) }
				highlight={ highlight }
			/>
		);
	}

	render() {
		const boardSquares = [];
		let position = 0;
		let rowKey;
		for (let j=0; j<3; j++) {
			rowKey = '';
			const row = [];
			for (let k=0; k<3; k++) {
				if (this.props.winningSquares instanceof Array && this.props.winningSquares.includes(position)) {
					row.push(this.renderSquare(position, true));
				} else {
					row.push(this.renderSquare(position));
				}

				rowKey += getLocationByIndex(position);
				position += 1;
			}
			boardSquares.push(<div key={ rowKey } className="board-row">{ row }</div>);
		}

		return (
			<div>{ boardSquares }</div>
		);

		// return (
		// 	<div>
		// 		<div className="board-row">
		// 			{this.renderSquare(0)}
		// 			{this.renderSquare(1)}
		// 			{this.renderSquare(2)}
		// 		</div>
		// 		<div className="board-row">
		// 			{this.renderSquare(3)}
		// 			{this.renderSquare(4)}
		// 			{this.renderSquare(5)}
		// 		</div>
		// 		<div className="board-row">
		// 			{this.renderSquare(6)}
		// 			{this.renderSquare(7)}
		// 			{this.renderSquare(8)}
		// 		</div>
		// 	</div>
		// );
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				moveNum: 0,
			}],
			stepNumber: 0,
			xIsNext: true,
			sortDir: 'asc',
			winningSquares: null,
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (squares[i]) {
			return;
		}
		const gameStatus = getGameStatus(squares);
		if (gameStatus.gameOver) {
			if (['X', 'O'].includes(gameStatus.winner)) {
				this.setState({
					winningSquares: gameStatus.winningSquares,
				});
			}
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
				location: getLocationByIndex(i),
				moveNum: history.length,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}

	setSortDir() {
		this.setState({
			sortDir: this.state.sortDir === 'asc' ? 'desc' : 'asc',
		});
	}

	render() {
		const history = Array.prototype.slice.call(this.state.history, 0);
		const current = history[this.state.stepNumber];
		const gameStatus = getGameStatus(current.squares);

		if (this.state.sortDir === 'desc') {
			history.sort((a, b) => b.moveNum - a.moveNum);
		}

		const moves = history.map((step) => {
			const desc = step.moveNum ?
				'Go to move #' + step.moveNum + ' location (' + step.location + ')' :
				'Go to game start';

			const boldClass = this.state.stepNumber === step.moveNum ? 'embolden' : '';

			return (
				<li key={ step.moveNum }>
					<button onClick={ () => this.jumpTo(step.moveNum) }  className={ boldClass } >{ desc }</button>
				</li>
			);
		});

		let status;
		let winningSquares;
		if (gameStatus.gameOver) {
			winningSquares = gameStatus.winningSquares;
			status = 'Winner: ' + gameStatus.winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={ current.squares }
						onClick={ (i) => this.handleClick(i) }
						winningSquares={ winningSquares }
					/>
				</div>
				<div className="game-info">
					<div>{ status }</div>
					<button onClick={ () => this.setSortDir() }>Change sort</button>
					<ul>{ moves }</ul>
				</div>
			</div>
		);
	}
}

function getGameStatus(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const response = {
		gameOver: false,
		winner: null,
		winningSquares: null,
	};

	for (let i=0; i<lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return (
				Object.assign(response, {
					gameOver: true,
					winner: squares[a],
					winningSquares: [a, b, c]
				})
			);
		}
	}

	if (squares.every(s => s !== null)) {
		return Object.assign(response, { gameOver: true, winner: 'Draw' });
	}

	return response;
}

function getLocationByIndex(idx) {
	const locs = [
		'0, 0',
		'1, 0',
		'2, 0',
		'1, 0',
		'1, 1',
		'1, 2',
		'2, 0',
		'2, 1',
		'2, 2',
	];
	return locs[idx];
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
