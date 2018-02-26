const expect = require('chai').expect;
const BoardController = require('../BoardController');

describe('BoardController', function () {
	describe('#getBoardModel', function () {
		it('Should be undefined before setting', function () {
			const boardController = BoardController();

			const boardModel = boardController.getBoardModel();

			expect(boardModel).to.be.undefined;
		});
	});

	describe('#setBoardModel', function () {
		it('Should allow setting of a boardModel', function () {
			const boardController = BoardController();
			const mockBoardModel = { id: 'mockBoardModel' };

			boardController.setBoardModel(mockBoardModel);
			const boardModel = boardController.getBoardModel();

			expect(boardModel).to.eql(mockBoardModel);
		});
	});

	describe('#getBoardView', function () {
		it('Should be undefined before setting', function () {
			const boardController = BoardController();
			const boardView = boardController.getBoardView();
			expect(boardView).to.be.undefined;
		});
	});

	describe('#setBoardView', function () {
		it('Should allow setting of a boardView', function () {
			const boardController = BoardController();
			const mockBoardView = { id: 'mockBoardView' };

			boardController.setBoardView(mockBoardView);
			const boardView = boardController.getBoardView();

			expect(boardView).to.eql(mockBoardView);
		});
	});

	describe('#getBoardStore', function () {
		it('Should', function () {
			const boardController = BoardController();
			const boardStore = boardController.getBoardStore();
			expect(boardStore).to.be.undefined;
		});
	});

	describe('#setBoardStore', function () {
		it('Should allow setting of a store', function () {
			const boardController = BoardController();
			const mockStore = { id: 'mockStore' };

			boardController.setBoardStore(mockStore);
			const boardStore = boardController.getBoardStore();

			expect(boardStore).to.eql(mockStore);
		});
	});

	describe('#init', function () {
		it('Should throw an error if the boardModel has not been set', function () {
			const boardController = BoardController();
			expect(boardController.init.bind(boardController)).to.throw('BoardModel has not been set');
		});

		it('Should throw an error if the boardView has not been set', function () {
			const boardController = BoardController();
			const mockBoardModel = { id: 'mockBoardModel' };

			boardController.setBoardModel(mockBoardModel);

			expect(boardController.init.bind(boardController)).to.throw('BoardView has not been set');
		});

		// it('Should')
	});

});