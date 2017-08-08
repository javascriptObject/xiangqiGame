var BOARD = [
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
var PERSON = 1;
var MACHINE = 0;
var NOCHESS = 0;
var B_KING = 1;
var B_CAR = 2;
var B_HORSE = 3;
var B_CANON = 4;
var B_BISHOP = 5;
var B_ELEPHANT = 6;
var B_PAWN = 7;
var B_BIGIN = B_KING;
var B_END = B_PAWN;
var R_KING = 8;
var R_CAR = 9;
var R_HORSE = 10;
var R_CANON = 11;
var R_BISHOP = 12;
var R_ELEPHANT = 13;
var R_PAWN = 14;
var R_BIGIN = R_KING;
var R_END = R_PAWN;
function isBlack(b) {
	return b >= B_BIGIN && b <= B_END
}
function isRed(r) {
	return r >= R_BIGIN && r <= R_END
}
function isSameSide(x, y) {
	return isBlack(x) && isBlack(y) || isRed(x) && isRed(y)
}
function ChessPoint(x, y) {
	this.x = x;
	this.y = y
}
function ChessMove(chess, from, to, score) {
	this.chess = chess;
	this.from = from;
	this.to = to;
	this.score = score
}