const BoardModel = function () {
	let gameStatus = 1;
	let boardState = [0,0,0,0,0,0,0,0,0];
	let playerTurn = 'X';

	return {
		getPlayerTurn() {
			return playerTurn;
		},

		setPlayerTurn(player) {
			playerTurn = player;
		},

		changePlayerTurn() {
			playerTurn = playerTurn === 'X' ? 'O': 'X';
		},

		getGameStatus() {
			return gameStatus;
		},

		setGameStatus(status) {
			gameStatus = status;
		},

		getBoardState() {
			return Array.prototype.slice.call(boardState, 0);
		},

		setBoardState(state) {
			boardState = state;
			gameEvents.emit('board-state-updated', this.getGameState());
		},

		getGameState() {
			return {
				gameStatus: this.getGameStatus(),
				boardState: this.getBoardState(),
				playerTurn: this.getPlayerTurn(),
			};
		},

		resetState() {
			this.setGameStatus(1);
			this.setBoardState([0,0,0,0,0,0,0,0,0]);
			this.setPlayerTurn ('X');
		}
	}
};

if (typeof exports !== 'undefined') {
	module.exports = BoardModel;
}
