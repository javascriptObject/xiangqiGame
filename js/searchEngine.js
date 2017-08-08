var SearchEngine = function(depth) {
	var moveCreator = new MoveGenerator();
	var evaluation = new Evaluation();
	var maxDepth = depth;
	var bestMove;
	var curBoard;
	var historyTable = new HistoryTable();
	var self = this;
	var makeMove = function(move) {
		var target;
		target = curBoard[move.to.y][move.to.x];
		curBoard[move.to.y][move.to.x] = curBoard[move.from.y][move.from.x];
		curBoard[move.from.y][move.from.x] = NOCHESS;
		return target
	};
	var unMakeMove = function(move, chess) {
		curBoard[move.from.y][move.from.x] = curBoard[move.to.y][move.to.x];
		curBoard[move.to.y][move.to.x] = chess
	};
	this.getGoodMove = function(board) {
		test = 0;
		curBoard = board;
		var value = alphaBeta(-20000, 20000, maxDepth);
		makeMove(bestMove);
		return {
			board: curBoard,
			bestMove: bestMove
		}
	};
	this.isGameOver = function(board) {
		var redLive = false;
		var blackLive = false;
		for (var i = 7; i < 10; i++) {
			for (var j = 3; j < 6; j++) {
				if (board[i][j] == B_KING) {
					blackLive = true
				}
				if (board[i][j] == R_KING) {
					redLive = true
				}
			}
		}
		for (var i = 0; i < 3; i++) {
			for (var j = 3; j < 6; j++) {
				if (board[i][j] == B_KING) {
					blackLive = true
				}
				if (board[i][j] == R_KING) {
					redLive = true
				}
			}
		}
		if (!redLive) {
			return 19999
		}
		if (!blackLive) {
			return -19999
		}
		return 0
	};
	var maxMin = function(depth) {
		var limit = self.isGameOver(curBoard);
		if (limit) {
			return limit
		}
		if (depth <= 0) {
			var value = evaluation.eval(curBoard, (maxDepth) % 2);
			return value
		}
		var moveCount = moveCreator.createPossibleMove(curBoard, depth, (maxDepth - depth) % 2);
		var moveList = moveCreator.getMoveList();
		if ((maxDepth - depth) % 2 == 0) {
			var current = -99999;
			for (var i = 0; i < moveCount; i++) {
				var chess = makeMove(moveList[depth][i]);
				var score = maxMin(depth - 1);
				unMakeMove(moveList[depth][i], chess);
				if (score > current) {
					current = score;
					if (maxDepth == depth) {
						bestMove = moveList[depth][i]
					}
				}
			}
			return current
		} else {
			var current = 99999;
			for (var i = 0; i < moveCount; i++) {
				var chess = makeMove(moveList[depth][i]);
				var score = maxMin(depth - 1);
				unMakeMove(moveList[depth][i], chess);
				if (score < current) {
					current = score;
					if (maxDepth == depth) {
						bestMove = moveList[depth][i]
					}
				}
			}
			return current
		}
	};
	var alphaBeta = function(alphi, beta, depth) {
		var limit = self.isGameOver(curBoard);
		if (limit) {
			return limit
		}
		if (depth <= 0) {
			var value = evaluation.eval(curBoard, maxDepth % 2);
			return value
		}
		var bestMoveFlag = -1;
		var moveCount = moveCreator.createPossibleMove(curBoard, depth, (maxDepth - depth) % 2);
		var moveList = moveCreator.getMoveList(depth, moveCount);
		for (var i = 0; i < moveCount; i++) {
			moveList[i].score = historyTable.getHistoryScore(moveList[i])
		}
		if ((maxDepth - depth) % 2 == 1) {
			moveList.sort(function(a, b) {
				return b.score - a.score
			});
			for (var i = 0; i < moveCount; i++) {
				var chess = makeMove(moveList[i]);
				var score = alphaBeta(alphi, beta, depth - 1);
				unMakeMove(moveList[i], chess);
				if (score < beta) {
					beta = score;
					if (maxDepth == depth) {
						bestMove = moveList[i]
					}
					bestMoveFlag = i;
					if (alphi >= beta) {
						bestMoveFlag = i;
						return alphi
					}
				}
			};
			if (bestMoveFlag != -1) {
				historyTable.enterHistoryTable(moveList[bestMoveFlag], depth)
			}
			return beta
		} else {
			moveList.sort(function(a, b) {
				return b.score - a.score
			});
			for (var i = 0; i < moveCount; i++) {
				var chess = makeMove(moveList[i]);
				var score = alphaBeta(alphi, beta, depth - 1);
				unMakeMove(moveList[i], chess);
				if (score > alphi) {
					alphi = score;
					if (maxDepth == depth) {
						bestMove = moveList[i]
					}
					bestMoveFlag = i;
					if (alphi >= beta) {
						bestMoveFlag = i;
						return beta
					}
				}
			};
			if (bestMoveFlag != -1) {
				historyTable.enterHistoryTable(moveList[bestMoveFlag], depth)
			}
			return alphi
		}
	}
};
var HistoryTable = function() {
	var historyTable;
	var initialize = function() {
		historyTable = [];
		for (var i = 0; i < 90; i++) {
			historyTable.push([]);
			for (var j = 0; j < 90; j++) {
				historyTable[i][j] = 0
			}
		}
	};
	this.enterHistoryTable = function(move, depth) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		historyTable[from][to] += 2 << depth
	};
	this.getHistoryScore = function(move) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		return historyTable[from][to]
	};
	initialize()
};