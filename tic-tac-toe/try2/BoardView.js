const BoardView = function () {
	let boardController;
	return {
		boardEl: document.querySelector('#board'),
		cells: {
			'cell-0': document.querySelector('#cell-0'),
			'cell-1': document.querySelector('#cell-1'),
			'cell-2': document.querySelector('#cell-2'),
			'cell-3': document.querySelector('#cell-3'),
			'cell-4': document.querySelector('#cell-4'),
			'cell-5': document.querySelector('#cell-5'),
			'cell-6': document.querySelector('#cell-6'),
			'cell-7': document.querySelector('#cell-7'),
			'cell-8': document.querySelector('#cell-8'),
		},
		message: document.querySelector('#message'),
		resetBtn: document.querySelector('#resetBtn'),
		computerPlayerBtn: document.querySelector('#computerPlayerBtn'),

		setBoardController(controller) {
			boardController = controller;
		},

		bindUIEvents() {
			this.boardEl.addEventListener('click', (e) => {
				boardController.handleBoardClick(e.target);
			});

			this.resetBtn.addEventListener('click', () => {
				boardController.resetGame();
			});

			this.computerPlayerBtn.addEventListener('click', () => {
				boardController.initiateComputerPlay();
			});
		},

		renderBoardState(gameState) {
			gameState.boardState.forEach((state, i) => {
				let idx = `cell-${i}`;
				if (state === 0) {
					this.cells[idx].innerText = '';
				} else {
					this.cells[idx].innerText = state;
				}
			});
		},

		displayWinner(data) {
			this.message.innerText = `${data.playerTurn} Wins!`;
		},

		displayDraw() {
			this.message.innerText = 'Draw!';
		},

		clearMessage() {
			this.message.innerText = '';
		},

		playCell(cellNum) {
			const idx = `cell-${cellNum}`;
			this.cells[idx].click();
		},

	};
};

if (typeof exports !== 'undefined') {
	module.exports = BoardView;
}