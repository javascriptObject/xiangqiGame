var Evaluation = function() {
	var BASEVALUE_PAWN = 100;
	var BASEVALUE_BISHOP = 250;
	var BASEVALUE_ELEPHANT = 250;
	var BASEVALUE_CAR = 500;
	var BASEVALUE_HORSE = 350;
	var BASEVALUE_CANON = 350;
	var BASEVALUE_KING = 10000;
	var FLEXIBILITY_PAWN = 15;
	var FLEXIBILITY_BISHOP = 1;
	var FLEXIBILITY_ELEPHANT = 1;
	var FLEXIBILITY_CAR = 6;
	var FLEXIBILITY_HORSE = 12;
	var FLEXIBILITY_CANON = 6;
	var FLEXIBILITY_KING = 0;
	var baseValue;
	var flexValue;
	var attackPos;
	var guardPos;
	var flexibilityPos;
	var chessValue;
	var posCount;
	var relatePos;
	var R_PAWN_VALUE = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[90, 90, 110, 120, 120, 120, 110, 90, 90],
		[90, 90, 110, 120, 120, 120, 110, 90, 90],
		[70, 90, 110, 110, 110, 110, 110, 90, 70],
		[70, 70, 70, 70, 70, 70, 70, 70, 70],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	var B_PAWN_VALUE = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[90, 90, 110, 120, 120, 120, 110, 90, 90],
		[90, 90, 110, 120, 120, 120, 110, 90, 90],
		[70, 90, 110, 110, 110, 110, 110, 90, 70],
		[70, 70, 70, 70, 70, 70, 70, 70, 70],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	var getPawnValue = function(x, y, board) {
		if (board[y][x] == R_PAWN) {
			return R_PAWN_VALUE[y][x]
		}
		if (board[y][x] == B_PAWN) {
			return B_PAWN_VALUE[y][x]
		}
		return 0
	};
	var resetData = function() {
		attackPos = [];
		guardPos = [];
		flexibilityPos = [];
		chessValue = [];
		for (var i = 0; i < 10; i++) {
			attackPos.push([]);
			guardPos.push([]);
			flexibilityPos.push([]);
			chessValue.push([]);
			for (var j = 0; j < 9; j++) {
				attackPos[i][j] = 0;
				guardPos[i][j] = 0;
				flexibilityPos[i][j] = 0;
				chessValue[i][j] = 0
			}
		}
	};
	var initialize = function() {
		baseValue = [];
		flexValue = [];
		relatePos = [];
		baseValue[B_KING] = BASEVALUE_KING;
		baseValue[B_CAR] = BASEVALUE_CAR;
		baseValue[B_HORSE] = BASEVALUE_HORSE;
		baseValue[B_BISHOP] = BASEVALUE_BISHOP;
		baseValue[B_ELEPHANT] = BASEVALUE_ELEPHANT;
		baseValue[B_CANON] = BASEVALUE_CANON;
		baseValue[B_PAWN] = BASEVALUE_PAWN;
		baseValue[R_KING] = BASEVALUE_KING;
		baseValue[R_CAR] = BASEVALUE_CAR;
		baseValue[R_HORSE] = BASEVALUE_HORSE;
		baseValue[R_BISHOP] = BASEVALUE_BISHOP;
		baseValue[R_ELEPHANT] = BASEVALUE_ELEPHANT;
		baseValue[R_CANON] = BASEVALUE_CANON;
		baseValue[R_PAWN] = BASEVALUE_PAWN;
		flexValue[B_KING] = FLEXIBILITY_KING;
		flexValue[B_CAR] = FLEXIBILITY_CAR;
		flexValue[B_HORSE] = FLEXIBILITY_HORSE;
		flexValue[B_BISHOP] = FLEXIBILITY_BISHOP;
		flexValue[B_ELEPHANT] = FLEXIBILITY_ELEPHANT;
		flexValue[B_CANON] = FLEXIBILITY_CANON;
		flexValue[B_PAWN] = FLEXIBILITY_PAWN;
		flexValue[R_KING] = FLEXIBILITY_KING;
		flexValue[R_CAR] = FLEXIBILITY_CAR;
		flexValue[R_HORSE] = FLEXIBILITY_HORSE;
		flexValue[R_BISHOP] = FLEXIBILITY_BISHOP;
		flexValue[R_ELEPHANT] = FLEXIBILITY_ELEPHANT;
		flexValue[R_CANON] = FLEXIBILITY_CANON;
		flexValue[R_PAWN] = FLEXIBILITY_PAWN
	};
	var addPoint = function(point) {
		relatePos[posCount] = point;
		posCount++
	};
	var canTouch = function(board, from, to) {
		var chess;
		var target;
		if (from.x == to.x && from.y == to.y) {
			return false
		}
		chess = board[from.y][from.x];
		target = board[to.y][to.x];
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
	};
	var GenKingMove = function(board, i, j) {
		var from = new ChessPoint(j, i);
		for (var x = 0; x < 3; x++) {
			for (var y = 3; y < 6; y++) {
				var to = new ChessPoint(y, x);
				if (canTouch(board, from, to)) {
					addPoint(to)
				}
			}
		}
		for (var x = 7; x < 10; x++) {
			for (var y = 3; y < 6; y++) {
				var to = new ChessPoint(y, x);
				if (canTouch(board, from, to)) {
					addPoint(to)
				}
			}
		}
	};
	var GenRBishopMove = function(board, i, j) {
		var from = new ChessPoint(j, i);
		for (var y = 7; y < 10; y++) {
			for (var x = 3; x < 6; x++) {
				var to = new ChessPoint(x, y);
				if (canTouch(board, from, to)) {
					addPoint(to)
				}
			}
		}
	};
	var GenBBishopMove = function(board, i, j) {
		var from = new ChessPoint(j, i);
		for (var y = 0; y < 3; y++) {
			for (var x = 3; x < 6; x++) {
				var to = new ChessPoint(x, y);
				if (canTouch(board, from, to)) {
					addPoint(to)
				}
			}
		}
	};
	var GenElephantMove = function(board, i, j) {
		var x;
		var y;
		var from;
		var to;
		from = new ChessPoint(j, i);
		x = j + 2;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j + 2;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 2;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 2;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
	};
	var GenHorseMove = function(board, i, j) {
		var x;
		var y;
		var from;
		var to;
		from = new ChessPoint(j, i);
		x = j + 2;
		y = i + 1;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j + 2;
		y = i - 1;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 2;
		y = i + 1;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 2;
		y = i - 1;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j + 1;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j + 1;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x < 9 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 1;
		y = i + 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y < 10 && canTouch(board, from, to)) {
			addPoint(to)
		}
		x = j - 1;
		y = i - 2;
		to = new ChessPoint(x, y);
		if (x >= 0 && y >= 0 && canTouch(board, from, to)) {
			addPoint(to)
		}
	};
	var GenBPawnMove = function(board, i, j) {
		var x;
		var y;
		var chess = board[i][j];
		x = j;
		y = i + 1;
		if (y < 10) {
			addPoint(new ChessPoint(x, y))
		}
		if (i > 4) {
			y = i;
			x = j + 1;
			if (x < 9) {
				addPoint(new ChessPoint(x, y))
			}
			x = j - 1;
			if (x >= 0) {
				addPoint(new ChessPoint(x, y))
			}
		}
	};
	var GenRPawnMove = function(board, i, j) {
		var x;
		var y;
		var chess = board[i][j];
		x = j;
		y = i - 1;
		if (y >= 0) {
			addPoint(new ChessPoint(x, y))
		}
		if (i < 5) {
			y = i;
			x = j + 1;
			if (x < 9) {
				addPoint(new ChessPoint(x, y))
			}
			x = j - 1;
			if (x >= 0) {
				addPoint(new ChessPoint(x, y))
			}
		}
	};
	var GenCarMove = function(board, i, j) {
		var x;
		var y;
		var chess = board[i][j];
		y = i;
		x = j + 1;
		while (x < 9) {
			if (board[y][x] == NOCHESS) {
				addPoint(new ChessPoint(x, y))
			} else {
				addPoint(new ChessPoint(x, y));
				break
			}
			x++
		}
		y = i;
		x = j - 1;
		while (x >= 0) {
			if (board[y][x] == NOCHESS) {
				addPoint(new ChessPoint(x, y))
			} else {
				addPoint(new ChessPoint(x, y));
				break
			}
			x--
		}
		y = i + 1;
		x = j;
		while (y < 10) {
			if (board[y][x] == NOCHESS) {
				addPoint(new ChessPoint(x, y))
			} else {
				addPoint(new ChessPoint(x, y));
				break
			}
			y++
		}
		y = i - 1;
		x = j;
		while (y >= 0) {
			if (board[y][x] == NOCHESS) {
				addPoint(new ChessPoint(x, y))
			} else {
				addPoint(new ChessPoint(x, y));
				break
			}
			y--
		}
	};
	var GenCanonMove = function(board, i, j) {
		var x;
		var y;
		var flag;
		var chess = board[i][j];
		x = j + 1;
		y = i;
		flag = false;
		while (x < 9) {
			if (board[y][x] == NOCHESS) {
				if (!flag) {
					addPoint(new ChessPoint(x, y))
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					addPoint(new ChessPoint(x, y));
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
					addPoint(new ChessPoint(x, y))
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					addPoint(new ChessPoint(x, y));
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
					addPoint(new ChessPoint(x, y))
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					addPoint(new ChessPoint(x, y));
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
					addPoint(new ChessPoint(x, y))
				}
			} else {
				if (!flag) {
					flag = true
				} else {
					addPoint(new ChessPoint(x, y));
					break
				}
			}
			y--
		}
	};
	var getRelateChess = function(board, i, j) {
		posCount = 0;
		var chess;
		var x;
		var y;
		chess = board[i][j];
		switch (chess) {
			case R_KING:
			case B_KING:
				GenKingMove(board, i, j);
				break;
			case B_BISHOP:
				GenBBishopMove(board, i, j);
				break;
			case R_BISHOP:
				GenRBishopMove(board, i, j);
				break;
			case B_BISHOP:
				GenBBishopMove(board, i, j);
				break;
			case B_ELEPHANT:
			case R_ELEPHANT:
				GenElephantMove(board, i, j);
				break;
			case B_HORSE:
			case R_HORSE:
				GenHorseMove(board, i, j);
				break;
			case R_CAR:
			case B_CAR:
				GenCarMove(board, i, j);
				break;
			case B_PAWN:
				GenBPawnMove(board, i, j);
				break;
			case R_PAWN:
				GenRPawnMove(board, i, j);
				break;
			case B_CANON:
			case R_CANON:
				GenCanonMove(board, i, j);
				break;
			default:
				alert('不存在的棋子')
		}
	};
	this.eval = function(board, side) {
		test++;
		var chess;
		var target;
		resetData();
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] != NOCHESS) {
					chess = board[i][j];
					getRelateChess(board, i, j);
					for (var k = 0; k < posCount; k++) {
						target = board[relatePos[k].y][relatePos[k].x];
						if (target == NOCHESS) {
							flexibilityPos[i][j]++
						} else {
							if (isSameSide(chess, target)) {
								guardPos[relatePos[k].y][relatePos[k].x]++
							} else {
								attackPos[relatePos[k].y][relatePos[k].x]++;
								flexibilityPos[i][j]++;
								switch (target) {
									case R_KING:
										if (side == 0) {
											return 18888
										}
										break;
									case B_KING:
										if (side == 1) {
											return -18888
										}
										break;
									default:
										attackPos[relatePos[k].y][relatePos[k].x] += (30 + (baseValue[target] - baseValue[chess]) / 10) / 10
								}
							}
						}
					}
				}
			}
		}
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] != NOCHESS) {
					chess = board[i][j];
					chessValue[i][j]++;
					chessValue[i][j] += flexValue[chess] * flexibilityPos[i][j];
					chessValue[i][j] += getPawnValue(j, i, board)
				}
			}
		}
		var halfValue;
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] != NOCHESS) {
					chess = board[i][j];
					halfValue = baseValue[chess] / 16;
					chessValue[i][j] += baseValue[chess];
					if (isRed(chess)) {
						if (attackPos[i][j]) {
							if (side == 1) {
								if (chess == R_KING) {
									chessValue[i][j] -= 20
								} else {
									chessValue[i][j] -= halfValue * 2;
									if (guardPos[i][j]) {
										chessValue[i][j] += halfValue
									}
								}
							} else {
								if (chess == R_KING) {
									return 18888
								}
								chessValue[i][j] -= halfValue * 10;
								if (guardPos[i][j]) {
									chessValue[i][j] += halfValue * 9
								}
							}
							chessValue[i][j] -= attackPos[i][j]
						} else {
							if (guardPos[i][j]) {
								chessValue[i][j] += 5
							}
						}
					} else {
						if (attackPos[i][j]) {
							if (side == 0) {
								if (chess == B_KING) {
									chessValue[i][j] -= 20
								} else {
									chessValue[i][j] -= halfValue * 2;
									if (guardPos[i][j]) {
										chessValue[i][j] += halfValue
									}
								}
							} else {
								if (chess == B_KING) {
									return -18888
								}
								chessValue[i][j] -= halfValue * 10;
								if (guardPos[i][j]) {
									chessValue[i][j] += halfValue * 9
								}
							}
							chessValue[i][j] -= attackPos[i][j]
						} else {
							if (guardPos[i][j]) {
								chessValue[i][j] += 5
							}
						}
					}
				}
			}
		}
		var redValue = 0;
		var blackValue = 0;
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 9; j++) {
				chess = board[i][j];
				if (chess != NOCHESS) {
					if (isRed(chess)) {
						redValue += chessValue[i][j];
					} else {
						blackValue += chessValue[i][j];
					}
				}
			}
		}
		return blackValue - redValue
	};
	initialize()
};
var test = 0;