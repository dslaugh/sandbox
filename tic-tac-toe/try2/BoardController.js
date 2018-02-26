const BoardController = function() {
	let boardModel;
	let boardView;
	let boardStore;
	return {
		getBoardModel() {
			return boardModel;
		},

		setBoardModel(model) {
			boardModel = model;
		},

		getBoardView() {
			return boardView;
		},

		setBoardView(view) {
			boardView = view;
		},

		getBoardStore() {
			return boardStore;
		},

		setBoardStore(store) {
			boardStore = store;
		},

		init() {
			if (!boardModel) {
				throw new Error('BoardModel has not been set');
			}

			if (!boardView) {
				throw new Error('BoardView has not been set');
			}

			gameEvents.on('board-state-updated', boardView.renderBoardState.bind(boardView));
			gameEvents.on('board-state-updated', this.checkGameProgress.bind(BoardController));
			gameEvents.on('game-won', boardView.displayWinner.bind(boardView));
			gameEvents.on('game-draw', boardView.displayDraw.bind(boardView));
			gameEvents.on('game-reset', boardView.clearMessage.bind(boardView));
			boardView.bindUIEvents();
		},

		handleBoardClick(el) {
			const gameState = boardModel.getGameState();
			if (gameState.gameStatus !== 1) {
				return;
			}

			const [, cellNum] = el.id.split('-');
			const idx = parseInt(cellNum, 10);

			if (gameState.boardState[idx] !== 0) {
				console.log('Cell already occupied');
				return;
			}

			gameState.boardState[idx] = gameState.playerTurn;
			boardModel.setBoardState(gameState.boardState);
			gameEvents.emit('turn-played', boardModel.getGameState());
			boardModel.changePlayerTurn();
		},

		checkGameProgress(gameState) {
			const boardState = gameState.boardState;
			function topRowWinner(player) {
				return boardState[0] === player && boardState[1] === player && boardState[2] === player;
			}
			function middleRowWinner(player) {
				return boardState[3] === player && boardState[4] === player && boardState[5] === player;
			}
			function bottomRowWinner(player) {
				return boardState[6] === player && boardState[7] === player && boardState[8] === player;
			}
			function leftColWinner(player) {
				return boardState[0] === player && boardState[3] === player && boardState[6] === player;
			}
			function centerColWinner(player) {
				return boardState[1] === player && boardState[4] === player && boardState[7] === player;
			}
			function rightColWinner(player) {
				return boardState[2] === player && boardState[5] === player && boardState[8] === player;
			}
			function diagonal1Winner(player) {
				return boardState[0] === player && boardState[4] === player && boardState[8] === player;	
			}
			function diagonal2Winner(player) {
				return boardState[2] === player && boardState[4] === player && boardState[6] === player;	
			}

			function playerWins(player) {
				return topRowWinner(player) || 
					middleRowWinner(player) || 
					bottomRowWinner(player) || 
					leftColWinner(player) || 
					centerColWinner(player) || 
					rightColWinner(player) ||
					diagonal1Winner(player) ||
					diagonal2Winner(player);
			}

			if (playerWins('X')) {
				gameEvents.emit('game-won', boardModel.getGameState());
				boardModel.setGameStatus(0);
				return;
			}

			if (playerWins('O')) {
				gameEvents.emit('game-won', boardModel.getGameState());
				boardModel.setGameStatus(0);
				return;
			}

			const allCellsPlayed = gameState.boardState.every(cell => cell !== 0);

			if (allCellsPlayed) {
				boardModel.setGameStatus(0);
				gameEvents.emit('game-draw');
				return;
			}

		},

		resetGame() {
			boardModel.resetState();
			boardView.clearMessage();
		},


		initiateComputerPlay() {
			const gameState = boardModel.getGameState();
			if (gameState.playerTurn !== 'X') {
				console.log('It is not the computers turn');
				return;
			}
		}
	}
};

if (typeof exports !== 'undefined') {
	module.exports = BoardController;
}
