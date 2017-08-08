function isValidMove(board, from, to) {
	var chess;
	var target;
	if (from.x == to.x && from.y == to.y) {
		return false
	}
	chess = board[from.y][from.x];
	target = board[to.y][to.x];
	if (isSameSide(chess, target)) {
		return false
	}
	switch (chess) {
		case B_KING:
			if (target == R_KING) {
				if (from.x != to.x) {
					return false
				}
				for (var i = from.y + 1; i < to.y; i++) {
					if (board[i][from.x] != NOCHESS) {
						return false
					}
				}
			} else {
				if (to.y > 2 || to.x > 5 || to.x < 3) {
					return false
				}
				if (Math.abs(from.x - to.x) + Math.abs(from.y - to.y) > 1) {
					return false
				}
			}
			break;
		case R_KING:
			if (target == B_KING) {
				if (from.x != to.x) {
					return false
				}
				for (var i = from.y - 1; i > to.y; i--) {
					if (board[i][from.x] != NOCHESS) {
						return false
					}
				}
			} else {
				if (to.y < 7 || to.x > 5 || to.x < 3) {
					return false
				}
				if (Math.abs(from.x - to.x) + Math.abs(from.y - to.y) > 1) {
					return false
				}
			}
			break;
		case R_BISHOP:
			if (to.y < 7 || to.x < 3 || to.x > 5) {
				return false
			}
			if (Math.abs(from.y - to.y) != 1 || Math.abs(from.x - to.x) != 1) {
				return false
			}
			break;
		case B_BISHOP:
			if (to.y > 2 || to.x < 3 || to.x > 5) {
				return false
			}
			if (Math.abs(from.y - to.y) != 1 || Math.abs(from.x - to.x) != 1) {
				return false
			}
			break;
		case R_ELEPHANT:
			if (to.y < 5) {
				return false
			}
			if (Math.abs(from.x - to.x) != 2 || Math.abs(from.y - to.y) != 2) {
				return false
			}
			if (board[(from.y + to.y) / 2][(from.x + to.x) / 2] != NOCHESS) {
				return false
			}
			break;
		case B_ELEPHANT:
			if (to.y > 4) {
				return false
			}
			if (Math.abs(from.x - to.x) != 2 || Math.abs(from.y - to.y) != 2) {
				return false
			}
			if (board[(from.y + to.y) / 2][(from.x + to.x) / 2] != NOCHESS) {
				return false
			}
			break;
		case B_PAWN:
			if (to.y < from.y) {
				return false
			}
			if (from.y < 5 && from.y == to.y) {
				return false
			}
			if (to.y - from.y + Math.abs(to.x - from.x) > 1) {
				return false
			}
			break;
		case R_PAWN:
			if (to.y > from.y) {
				return false
			}
			if (from.y > 4 && from.y == to.y) {
				return false
			}
			if (from.y - to.y + Math.abs(from.x - to.x) > 1) {
				return false
			}
			break;
		case B_CAR:
		case R_CAR:
			if (from.y != to.y && from.x != to.x) {
				return false
			}
			if (from.y == to.y) {
				if (from.x < to.x) {
					for (var i = from.x + 1; i < to.x; i++) {
						if (board[from.y][i] != NOCHESS) {
							return false
						}
					}
				} else {
					for (var i = to.x + 1; i < from.x; i++) {
						if (board[from.y][i] != NOCHESS) {
							return false
						}
					}
				}
			} else {
				if (from.y < to.y) {
					for (var i = from.y + 1; i < to.y; i++) {
						if (board[i][from.x] != NOCHESS) {
							return false
						}
					}
				} else {
					for (var i = to.y + 1; i < from.y; i++) {
						if (board[i][from.x] != NOCHESS) {
							return false
						}
					}
				}
			}
			break;
		case B_HORSE:
		case R_HORSE:
			if (!(Math.abs(from.x - to.x) == 1 && Math.abs(from.y - to.y) == 2 || Math.abs(from.x - to.x) == 2 && Math.abs(from.y - to.y) == 1)) {
				return false
			}
			if (to.x - from.x == 2) {
				i = from.x + 1;
				j = from.y
			} else if (from.x - to.x == 2) {
				i = from.x - 1;
				j = from.y
			} else if (to.y - from.y == 2) {
				i = from.x;
				j = from.y + 1
			} else if (from.y - to.y == 2) {
				i = from.x;
				j = from.y - 1
			}
			if (board[j][i] != NOCHESS) {
				return false
			}
			break;
		case B_CANON:
		case R_CANON:
			if (from.y != to.y && from.x != to.x) {
				return false
			}
			if (target == NOCHESS) {
				if (from.y == to.y) {
					if (from.x < to.x) {
						for (var i = from.x + 1; i < to.x; i++) {
							if (board[from.y][i] != NOCHESS) {
								return false
							}
						}
					} else {
						for (var i = to.x + 1; i < from.x; i++) {
							if (board[from.y][i] != NOCHESS) {
								return false
							}
						}
					}
				} else {
					if (from.y < to.y) {
						for (var i = from.y + 1; i < to.y; i++) {
							if (board[i][from.x] != NOCHESS) {
								return false
							}
						}
					} else {
						for (var i = to.y + 1; i < from.y; i++) {
							if (board[i][from.x] != NOCHESS) {
								return false
							}
						}
					}
				}
			} else {
				var count = 0;
				if (from.y == to.y) {
					if (from.x < to.x) {
						for (var i = from.x + 1; i < to.x; i++) {
							if (board[from.y][i] != NOCHESS) {
								count++
							}
						}
						if (count != 1) {
							return false
						}
					} else {
						for (var i = to.x + 1; i < from.x; i++) {
							if (board[from.y][i] != NOCHESS) {
								count++
							}
						}
						if (count != 1) {
							return false
						}
					}
				} else {
					if (from.y < to.y) {
						for (var i = from.y + 1; i < to.y; i++) {
							if (board[i][from.x] != NOCHESS) {
								count++
							}
						}
						if (count != 1) {
							return false
						}
					} else {
						for (var i = to.y + 1; i < from.y; i++) {
							if (board[i][from.x] != NOCHESS) {
								count++
							}
						}
						if (count != 1) {
							return false
						}
					}
				}
			}
	}
	return true
}
var MoveGenerator = function() {
	var moveList;
	var moveCount;
	this.getMoveList = function() {
		return moveList
	}
	this.getMoveList = function(depth, count) {
		var tmp = [];
		for (var i = 0; i < count; i++) {
			tmp[i] = moveList[depth][i]
		}
		return tmp
	}
	this.createPossibleMove = function(board, ply, side) {
		moveCount = 0;
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] != NOCHESS) {
					var chess = board[i][j];
					if (side == 0 && isRed(chess)) {
						continue
					}
					if (side == 1 && isBlack(chess)) {
						continue
					}
					switch (chess) {
						case R_KING:
						case B_KING:
							GenKingMove(board, i, j, ply);
							break;
						case R_BISHOP:
							GenRBishopMove(board, i, j, ply);
							break;
						case B_BISHOP:
							GenBBishopMove(board, i, j, ply);
							break;
						case R_ELEPHANT:
						case B_ELEPHANT:
							GenElephantMove(board, i, j, ply);
							break;
						case R_HORSE:
						case B_HORSE:
							GenHorseMove(board, i, j, ply);
							break;
						case B_CAR:
						case R_CAR:
							GenCarMove(board, i, j, ply);
							break;
						case R_PAWN:
							GenRPawnMove(board, i, j, ply);
							break;
						case B_PAWN:
							GenBPawnMove(board, i, j, ply);
							break;
						case B_CANON:
						case R_CANON:
							GenCanonMove(board, i, j, ply);
							break;
						default:
							alert('无此棋子')
					}
				}
			}
		}
		return moveCount
	}
	var GenKingMove = function(board, i, j, ply) {
		var from = new ChessPoint(j, i);
		for (var x = 0; x < 3; x++) {
			for (var y = 3; y < 6; y++) {
				var to = new ChessPoint(y, x);
				if (isValidMove(board, from, to)) {
					addMove(from, to, ply)
				}
			}
		}
		for (var x = 7; x < 10; x++) {
			for (var y = 3; y < 6; y++) {
				var to = new ChessPoint(y, x);
				if (isValidMove(board, from, to)) {
					addMove(from, to, ply)
				}
			}
		}
	}
	var GenRBishopMove = function(board, i, j, ply) {
		var from = new ChessPoint(j, i);
		for (var y = 7; y < 10; y++) {
			for (var x = 3; x < 6; x++) {
				var to = new ChessPoint(x, y);
				if (isValidMove(board, from, to)) {
					addMove(from, to, ply)
				}
			}
		}
	}
	var GenBBishopMove = function(board, i, j, ply) {
		var from = new ChessPoint(j, i);
		for (var y = 0; y < 3; y++) {
			for (var x = 3; x < 6; x++) {
				var to = new ChessPoint(x, y);
				if (isValidMove(board, from, to)) {
					addMove(from, to, ply)
				}
			}
		}
	}
	var GenElephantMove = function(board, i, j, ply) {
		var x;
		var y;
		var from;
		var to;
		from = new ChessPoint(j, i);
		x = j + 2;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j + 2;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 2;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 2;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
	}
	var GenHorseMove = function(board, i, j, ply) {
		var x;
		var y;
		var from;
		var to;
		from = new ChessPoint(j, i);
		x = j + 2;
		y = i + 1;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j + 2;
		y = i - 1;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 2;
		y = i + 1;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 2;
		y = i - 1;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j + 1;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j + 1;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 1;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
		x = j - 1;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && isValidMove(board, from, to)) {
			addMove(from, to, ply)
		}
	}
	var GenBPawnMove = function(board, i, j, ply) {
		var x;
		var y;
		var chess = board[i][j];
		var from = new ChessPoint(j, i);
		x = j;
		y = i + 1;
		if (y < 10 && !isSameSide(chess, board[y][x])) {
			addMove(from, new ChessPoint(x, y), ply)
		}
		if (i > 4) {
			y = i;
			x = j + 1;
			if (x < 9 && !isSameSide(chess, board[y][x])) {
				addMove(from, new ChessPoint(x, y), ply)
			}
			x = j - 1;
			if (x >= 0 && !isSameSide(chess, board[y][x])) {
				addMove(from, new ChessPoint(x, y), ply)
			}
		}
	}
	var GenRPawnMove = function(board, i, j, ply) {
		var x;
		var y;
		var chess = board[i][j];
		var from = new ChessPoint(j, i);
		x = j;
		y = i - 1;
		if (y >= 0 && !isSameSide(chess, board[y][x])) {
			addMove(from, new ChessPoint(x, y), ply)
		}
		if (i < 5) {
			y = i;
			x = j + 1;
			if (x < 9 && !isSameSide(chess, board[y][x])) {
				addMove(from, new ChessPoint(x, y), ply)
			}
			x = j - 1;
			if (x >= 0 && !isSameSide(chess, board[y][x])) {
				addMove(from, new ChessPoint(x, y), ply)
			}
		}
	}
	var GenCarMove = function(board, i, j, ply) {
		var x;
		var y;
		var chess = board[i][j];
		var from = new ChessPoint(j, i);
		y = i;
		x = j + 1;
		while (x < 9) {
			if (board[y][x] == NOCHESS) {
				addMove(from, new ChessPoint(x, y), ply)
			} else {
				if (!isSameSide(chess, board[y][x])) {
					addMove(from, new ChessPoint(x, y), ply)
				}
				break
			}
			x++
		}
		y = i;
		x = j - 1;
		while (x >= 0) {
			if (board[y][x] == NOCHESS) {
				addMove(from, new ChessPoint(x, y), ply)
			} else {
				if (!isSameSide(chess, board[y][x])) {
					addMove(from, new ChessPoint(x, y), ply)
				}
				break
			}
			x--
		}
		y = i + 1;
		x = j;
		while (y < 10) {
			if (board[y][x] == NOCHESS) {
				addMove(from, new ChessPoint(x, y), ply)
			} else {
				if (!isSameSide(chess, board[y][x])) {
					addMove(from, new ChessPoint(x, y), ply)
				}
				break
			}
			y++
		}
		y = i - 1;
		x = j;
		while (y >= 0) {
			if (board[y][x] == NOCHESS) {
				addMove(from, new ChessPoint(x, y), ply)
			} else {
				if (!isSameSide(chess, board[y][x])) {
					addMove(from, new ChessPoint(x, y), ply)
				}
				break
			}
			y--
		}
	}
	var GenCanonMove = function(board, i, j, ply) {
		var x;
		var y;
		var flag;
		var chess = board[i][j];
		var from = new ChessPoint(j, i);
		x = j + 1;
		y = i;
		flag = false;
		while (x < 9) {
			if (board[y][x] == NOCHESS) {
				if (!flag) {
					addMove(from, new ChessPoint(x, y), ply)
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					if (!isSameSide(chess, board[y][x])) {
						addMove(from, new ChessPoint(x, y), ply)
					}
					break
				}
			}
			x++
		}
		x = j - 1;
		y = i;
		flag = false;
		while (x >= 0) {
			if (board[y][x] == NOCHESS) {
				if (!flag) {
					addMove(from, new ChessPoint(x, y), ply)
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					if (!isSameSide(chess, board[y][x])) {
						addMove(from, new ChessPoint(x, y), ply)
					}
					break
				}
			}
			x--
		}
		x = j;
		y = i + 1;
		flag = false;
		while (y < 10) {
			if (board[y][x] == NOCHESS) {
				if (!flag) {
					addMove(from, new ChessPoint(x, y), ply)
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					if (!isSameSide(chess, board[y][x])) {
						addMove(from, new ChessPoint(x, y), ply)
					}
					break
				}
			}
			y++
		}
		x = j;
		y = i - 1;
		flag = false;
		while (y >= 0) {
			if (board[y][x] == NOCHESS) {
				if (!flag) {
					addMove(from, new ChessPoint(x, y), ply)
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					if (!isSameSide(chess, board[y][x])) {
						addMove(from, new ChessPoint(x, y), ply)
					}
					break
				}
			}
			y--
		}
	}
	var addMove = function(from, to, ply) {
		var move = moveList[ply][moveCount];
		move.from = from;
		move.to = to;
		return ++moveCount
	}
	var initialize = function() {
		moveList = [];
		moveCount = 0;
		for (var i = 0; i < 8; i++) {
			moveList.push([]);
			for (var j = 0; j < 80; j++) {
				moveList[i][j] = new ChessMove()
			}
		}
	}
	initialize()
}