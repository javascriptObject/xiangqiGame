var ChineseChessUI = function(placeholder) {
	var unique = 'chiness_chess_ui';
	window[unique] = this;
	var searchEngine;
	var curBoard;
	var selectedPos;
	this._selected = function(i, j) {
		selectedPos = new ChessPoint(j, i);
		selectGrid([selectedPos])
	};
	this.start = function(level, who) {
		curBoard = [
			[2, 3, 6, 5, 1, 5, 6, 3, 2],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 4, 0, 0, 0, 0, 0, 4, 0],
			[7, 0, 7, 0, 7, 0, 7, 0, 7],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[14, 0, 14, 0, 14, 0, 14, 0, 14],
			[0, 11, 0, 0, 0, 0, 0, 11, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[9, 10, 13, 12, 8, 12, 13, 10, 9]
		];
		searchEngine = new SearchEngine(level);
		if (who == MACHINE) {
			var result = searchEngine.getGoodMove(curBoard);
			var bestMove = result.bestMove;
			curBoard = result.board;
			draw(curBoard);
			selectGrid(bestMove.to.y, bestMove.to.x)
		} else {
			draw(curBoard)
		}
	};
	this._move = function(i, j) {
		if (!selectedPos) {
			return
		}
		var moveTo = new ChessPoint(j, i);
		if (isValidMove(curBoard, selectedPos, moveTo)) {
			curBoard[moveTo.y][moveTo.x] = curBoard[selectedPos.y][selectedPos.x];
			curBoard[selectedPos.y][selectedPos.x] = NOCHESS;
			var limit = searchEngine.isGameOver(curBoard);
			if (limit == -19999) {
				draw(curBoard);
				selectGrid([new ChessPoint(j, i)]);
				alert('您胜利了');
				lockBoard();
				return
			}
			var result = searchEngine.getGoodMove(curBoard);
			var bestMove = result.bestMove;
			curBoard = result.board;
			limit = searchEngine.isGameOver(curBoard);
			if (limit == 19999) {
				draw(curBoard);
				selectGrid([bestMove.to]);
				alert('机器胜利了');
				lockBoard();
				return
			}
			selectedPos = null;
			draw(curBoard);
			selectGrid([new ChessPoint(j, i), bestMove.to])
		} else {
			alert('您走的位置不符合象棋规则')
		}
	};
	var draw = function(board) {
		curBoard = board;
		var html = '';
		for (var i = 0; i < 10; i++) {
			html += '<tr>';
			for (var j = 0; j < 9; j++) {
				var chess = board[i][j];
				var className = 'chess ';
				var handleName = '';
				if (isRed(chess)) {
					handleName = unique + '._selected(' + i + ',' + j + ')'
				} else {
					handleName = unique + '._move(' + i + ',' + j + ')'
				}
				switch (chess) {
					case B_KING:
						className += 'black_shuai';
						break;
					case R_KING:
						className += 'red_shuai';
						break;
					case B_BISHOP:
						className += 'black_shi';
						break;
					case R_BISHOP:
						className += 'red_shi';
						break;
					case B_ELEPHANT:
						className += 'black_xiang';
						break;
					case R_ELEPHANT:
						className += 'red_xiang';
						break;
					case B_HORSE:
						className += 'black_ma';
						break;
					case R_HORSE:
						className += 'red_ma';
						break;
					case B_CAR:
						className += 'black_che';
						break;
					case R_CAR:
						className += 'red_che';
						break;
					case B_CANON:
						className += 'black_pao';
						break;
					case R_CANON:
						className += 'red_pao';
						break;
					case B_PAWN:
						className += 'black_bing';
						break;
					case R_PAWN:
						className += 'red_bing';
						break;
					default:
						className = ''
				}
				html += '<td class="' + className + '" onclick="' + handleName + '" id="grid_' + i + '_' + j + '"></td>'
			}
			html += '</tr>'
		}
		html = '<table cellspacing="0" cellpadding="0" border="0">' + html + '</table>';
		document.getElementById(placeholder).innerHTML = html
	};
	var selectGrid = function(points) {
		var grids = document.getElementById(placeholder).getElementsByTagName('td');
		for (var k = 0; k < grids.length; k++) {
			grids[k].innerHTML = ''
		}
		for (var i = 0; i < points.length; i++) {
			var p = points[i];
			document.getElementById('grid_' + p.y + '_' + p.x).innerHTML = '<div class="chess selected"></div>'
		}
	};
	var lockBoard = function() {
		var grids = document.getElementById(placeholder).getElementsByTagName('td');
		for (var k = 0; k < grids.length; k++) {
			grids[k].setAttribute('onclick', '')
		}
	}
};