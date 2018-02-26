const expect = require('chai').expect;
const BoardModel = require('../BoardModel');
const stubFn = require('./stub.js');

describe('BoardModel', function () {

	describe('#getPlayerTurn', function () {
		it('Should return X because that is the default state', function () {
			const boardModel = BoardModel();
			const playerTurn = boardModel.getPlayerTurn();
			expect(playerTurn).to.equal('X');
		});		
	});

	describe('#setPlayerTurn', function () {
		it('Should return X because that is the default state', function () {
			const boardModel = BoardModel();
			const origPlayerTurn = boardModel.getPlayerTurn();

			boardModel.setPlayerTurn('O');

			const newPlayerTurn = boardModel.getPlayerTurn();

			expect(origPlayerTurn).to.equal('X');
			expect(newPlayerTurn).to.equal('O');
		});		
	});

	describe('#changePlayerTurn', function () {
		it('Should change the player from X to O and vice versa', function () {
			const boardModel = BoardModel();
			const origPlayerTurn = boardModel.getPlayerTurn();

			boardModel.changePlayerTurn();

			const firstChangePlayerTurn = boardModel.getPlayerTurn();

			boardModel.changePlayerTurn();

			const secondChangePlayerTurn = boardModel.getPlayerTurn();

			expect(origPlayerTurn).to.equal('X');
			expect(firstChangePlayerTurn).to.equal('O');
			expect(secondChangePlayerTurn).to.equal('X');
		});
	});

	describe('#getGameStatus', function () {
		it('Should allow setting of the gameStatus', function () {
			const boardModel = BoardModel();
			const gameStatus = boardModel.getGameStatus();

			expect(gameStatus).to.equal(1);
		});
	});

	describe('#setGameStatus', function () {
		it('Should allow setting of the gameStatus', function () {
			const boardModel = BoardModel();
			const origGameStatus = boardModel.getGameStatus();

			boardModel.setGameStatus(0);
			const newGameStatus = boardModel.getGameStatus();

			expect(origGameStatus).to.equal(1);
			expect(newGameStatus).to.equal(0);
		});
	});

	describe('#getBoardState', function () {
		it('Should return the current boardState', function () {
			const boardModel = BoardModel();
			const expectedBoardState = [0,0,0,0,0,0,0,0,0];

			const boardState = boardModel.getBoardState();

			expect(boardState).to.eql(expectedBoardState);
		});
	});

	describe('#setBoardState', function () {
		it('Should allow setting of the boardState', function () {
			const boardModel = BoardModel();
			const expectedBoardState = ['X','X','O','O',0,0,0,0,0];
			const origBoardState = boardModel.getBoardState();

			boardModel.setBoardState(expectedBoardState);
			const newBoardState = boardModel.getBoardState();

			expect(newBoardState).to.eql(expectedBoardState);
		});
	});

	describe('#getGameState', function () {
		it('Should return the gameStatus and boardState in an object', function () {
			const boardModel = BoardModel();
			const expectedGameState = {
				gameStatus: 1,
				boardState: [0,0,0,0,0,0,0,0,0],
				playerTurn: 'X'
			};

			const gameState = boardModel.getGameState();

			expect(gameState).to.eql(expectedGameState);
		});
	});

	describe('#resetGame', function () {
		it('Should reset the game back to the defaults', function () {
			const boardModel = BoardModel();
			boardModel.setGameStatus(0);
			boardModel.setBoardState(['X','O','X','O','X','O','X','O','X']);
			boardModel.changePlayerTurn();

			const changedGameStatus = boardModel.getGameStatus();
			const changedBoardState = boardModel.getBoardState();
			const changedPlayerTurn = boardModel.getPlayerTurn();

			boardModel.resetGame();

			const resetGameStatus = boardModel.getGameStatus();
			const resetBoardState = boardModel.getBoardState();
			const resetPlayerTurn = boardModel.getPlayerTurn();

			expect(changedGameStatus).to.equal(0);
			expect(changedBoardState).to.eql(['X','O','X','O','X','O','X','O','X']);
			expect(changedPlayerTurn).to.equal('O');

			expect(resetGameStatus).to.equal(1);
			expect(resetBoardState).to.eql([0,0,0,0,0,0,0,0,0]);
			expect(resetPlayerTurn).to.equal('X');
		});

		it('Should emit the game-reset event', function () {
			const boardModel = BoardModel();
			const eventStub = stubFn();
			boardModel.events.on('game-reset', eventStub);

			boardModel.resetGame();

			expect(eventStub.called).to.equal(true);
		});
	});

});
