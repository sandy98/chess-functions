// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
var global = arguments[3];
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var groupArray = function groupArray(arr) {
  return arr.reduce(function (base, x) {
    if (x in base) {
      base[x] += 1;
    } else {
      base[x] = 1;
    }

    return base;
  }, {});
};

var makeSet = function makeSet(arr) {
  return arr.reduce(function (b, el) {
    return b.find(function (el2) {
      return el2 === el;
    }) ? b : [].concat(_toConsumableArray(b), [el]);
  }, []);
};

var range = function range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (start === end) {
    return [start];
  }

  if (!step) {
    if (start < end) {
      step = 1;
    } else {
      step = -1;
    }
  }

  if (start > end && step > 0) {
    return [];
  }

  if (start < end && step < 0) {
    return [];
  }

  return [start].concat(_toConsumableArray(range(start + step, end, step)));
};

var chessboard = range(0, 63);
var sanRegExp = /(?:(^0-0-0|^O-O-O)|(^0-0|^O-O)|(?:^([a-h])(?:([1-8])|(?:x([a-h][1-8])))(?:=?([NBRQ]))?)|(?:^([NBRQK])([a-h])?([1-8])?(x)?([a-h][1-8])))(?:(\+)|(#)|(\+\+))?$/;
var pgnTagLineRegExp = /^\s*\[\s*(.+?)\s+"(.+?)"\s*\]\s*$/;
var defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var sicilianFen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1';
var scandinavianFen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2';
var oddFrenchFen = 'rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3';
var mateLocoFen = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3';
var mateAyudadoFen = 'r1bqnNnr/pppkpp1p/7R/3p4/8/8/PPPPPPP1/RNBQKBN1 b Q - 0 6';
var prePastorFen = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4';
var pastorFen = 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4';
var preWCastlingFen = 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
var preBCastlingFen = 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4';
var simpleFen = '7k/7P/7K/8/8/8/8/8 w - - 0 1';
var simpleRookMate = 'R6k/6pp/8/8/3n4/8/8/7K b - - 0 1';
var simpleRookCheck = 'R6k/6pp/8/8/3r4/8/8/7K b - - 0 1';
var complexRookMate = 'R6k/6qp/5B2/8/8/8/8/7K b - - 0 1';
var testFen1 = '8/6B1/6p1/R6k/7p/8/8/K5R1 b KQkq - 0 1';
var testFen2 = '8/5BB1/6p1/R6k/7p/8/8/K5R1 b KQkq - 0 1';

var fen2obj = function fen2obj(fen) {
  var arr = fen.split(/\s+/);
  return {
    fenString: arr[0],
    turn: arr[1],
    castling: arr[2],
    enPassant: arr[3],
    halfMoveClock: arr[4],
    fullMoveNumber: arr[5],
    fenArray: fen2array(arr[0])
  };
};

var obj2fen = function obj2fen(fenObj) {
  delete fenObj.fenArray;
  return values(fenObj).join(' ');
};

var expandFen = function expandFen(fen) {
  return fen.replace(/\//g, '').replace(/[1-8]/g, function (d) {
    return '0'.repeat(parseInt(d));
  });
};

var compressFen = function compressFen(fen) {
  return fen.replace(/(.{8})(?!$)/g, "$1/").replace(/0+/g, function (z) {
    return z.length.toString();
  });
};

var fen2array = function fen2array(fen) {
  if (/^(.+\/){7}.+$/.test(fen)) {
    fen = expandFen(fen);
  } else if (fen.length !== 64) {
    return [];
  }

  return fen.split('').map(function (_, i, self) {
    return self[i ^ 56];
  });
};

var defaultFenArray = fen2array(fen2obj(defaultFen).fenString);

var array2fenString = function array2fenString(arr) {
  return compressFen(arr.map(function (v, i) {
    return arr[i ^ 56];
  }).join(''));
};

var computedFenString = array2fenString(defaultFenArray);

var sq2san = function sq2san(sq) {
  return sq >= 0 && sq < 64 ? "".concat(String.fromCharCode(97 + col(sq))).concat(String.fromCharCode(49 + row(sq))) : '-';
};

var san2sq = function san2sq(san) {
  return /[a-h][1-8]/.test(san) ? rowcol2sq(san.charCodeAt(1) - 49, san.charCodeAt(0) - 97) : -1;
};

var sqNumber = function sqNumber(sq) {
  return isNaN(sq) ? san2sq(sq) : parseInt(sq);
};

var row = function row(sq) {
  return Math.floor(sqNumber(sq) / 8);
};

var col = function col(sq) {
  return sqNumber(sq) % 8;
};

var col2letter = function col2letter(c) {
  return String.fromCharCode(97 + c);
};

var letter2col = function letter2col(l) {
  return l.charCodeAt(0) - 97;
};

var sq2rowcol = function sq2rowcol(sq) {
  return {
    row: row(sq),
    col: col(sq)
  };
};

var rowcol2sq = function rowcol2sq(r, c) {
  return r * 8 + c;
};

var isBlackFigure = function isBlackFigure(fig) {
  return /[pnbrqk]/.test(fig);
};

var isWhiteFigure = function isWhiteFigure(fig) {
  return /[PNBRQK]/.test(fig);
};

var isEmptyFigure = function isEmptyFigure(fig) {
  return fig === '0';
};

var isDarkSquare = function isDarkSquare(sq) {
  if (sq.constructor.name === 'String') {
    sq = san2sq(sq);
  }

  return row(sq) % 2 === 0 && col(sq) % 2 === 0 || row(sq) % 2 !== 0 && col(sq) % 2 !== 0;
};

var isLightSquare = function isLightSquare(sq) {
  return !isDarkSquare(sq);
};

var difRow = function difRow(sq1, sq2) {
  return Math.abs(row(sq1) - row(sq2));
};

var difCol = function difCol(sq1, sq2) {
  return Math.abs(col(sq1) - col(sq2));
};

var isSameRow = function isSameRow(sq1, sq2) {
  return difRow(sq1, sq2) === 0;
};

var isSameCol = function isSameCol(sq1, sq2) {
  return difCol(sq1, sq2) === 0;
};

var isDiagonal = function isDiagonal(sq1, sq2) {
  return difCol(sq1, sq2) === difRow(sq1, sq2);
};

var isAntiDiagonal = function isAntiDiagonal(sq1, sq2) {
  return difCol(sq1, sq2) === difRow(sq1, sq2) && Math.abs(sqNumber(sq1) - sqNumber(sq2)) % 7 === 0 && sqNumber(sq1) !== 63 && sqNumber(sq2) !== 63;
};

var isKnightJump = function isKnightJump(sq1, sq2) {
  return difCol(sq1, sq2) === 2 && difRow(sq1, sq2) === 1 || difCol(sq1, sq2) === 1 && difRow(sq1, sq2) === 2;
};

var isKingReach = function isKingReach(sq1, sq2) {
  return difCol(sq1, sq2) < 2 && difRow(sq1, sq2) < 2;
};

var rowStep = 1;
var colStep = 8;
var diagStep = 9;
var antiDiagStep = 7;

var path = function path(sq1, sq2) {
  var step;

  if (sq1 === sq2) {
    return [sqNumber(sq1)];
  } else if (isSameCol(sq1, sq2)) {
    if (sqNumber(sq1) < sqNumber(sq2)) {
      step = colStep;
    } else {
      step = -colStep;
    }
  } else if (isSameRow(sq1, sq2)) {
    if (sqNumber(sq1) < sqNumber(sq2)) {
      step = rowStep;
    } else {
      step = -rowStep;
    }
  } else if (isAntiDiagonal(sq1, sq2)) {
    if (sqNumber(sq1) < sqNumber(sq2)) {
      step = antiDiagStep;
    } else {
      step = -antiDiagStep;
    }
  } else if (isDiagonal(sq1, sq2)) {
    if (sqNumber(sq1) < sqNumber(sq2)) {
      step = diagStep;
    } else {
      step = -diagStep;
    }
  } else if (isKnightJump(sq1, sq2)) {
    return [sqNumber(sq1), sqNumber(sq2)];
  } else {
    return [];
  }

  return range(sqNumber(sq1), sqNumber(sq2), step);
};

var innerPath = function innerPath(pth) {
  return pth.slice(1, -1);
};

var isForward = function isForward(fig, sqFrom, sqTo) {
  return isBlackFigure(fig) ? row(sqFrom) > row(sqTo) : row(sqFrom) < row(sqTo);
};

var arrayFromFen = function arrayFromFen(fen) {
  if (fen.constructor.name === 'Array') {
    return fen;
  } else if (!(fen.constructor.name === 'String')) {
    return [];
  } else {
    if (/\s+/.test(fen)) {
      return fen2obj(fen).fenArray;
    } else {
      return fen2array(fen);
    }
  }
};

var kingSq = function kingSq(fen, colour) {
  return arrayFromFen(fen).findIndex(function (x) {
    return x === (/[a-z]/.test(colour) && colour !== 'w' ? 'k' : 'K');
  });
};

var isClearPath = function isClearPath(fen, pth) {
  if (pth.length < 3) {
    return true;
  }

  var fenArr = arrayFromFen(fen);
  var iPath = innerPath(pth);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iPath[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var v = _step.value;

      if (fenArr[v] !== '0') {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
};

var isBishopMove = function isBishopMove(sqFrom, sqTo) {
  return isDiagonal(sqFrom, sqTo) && sqFrom !== sqTo;
};

var isRookMove = function isRookMove(sqFrom, sqTo) {
  return (isSameRow(sqFrom, sqTo) || isSameCol(sqFrom, sqTo)) && sqFrom !== sqTo;
};

var isQueenMove = function isQueenMove(sqFrom, sqTo) {
  return (isBishopMove(sqFrom, sqTo) || isRookMove(sqFrom, sqTo)) && sqFrom !== sqTo;
};

var isKingMove = function isKingMove(sqFrom, sqTo) {
  return difRow(sqNumber(sqFrom), sqNumber(sqTo)) < 2 && difCol(sqNumber(sqFrom), sqNumber(sqTo)) < 2 && sqFrom !== sqTo;
};

var isPawnMove = function isPawnMove(sqFrom, sqTo) {
  var colour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'w';
  colour = colour.toLowerCase();

  if (!/[wb]/.test(colour)) {
    return false;
  }

  var fig = colour === 'w' ? 'P' : 'p';
  sqFrom = sqNumber(sqFrom);
  sqTo = sqNumber(sqTo);

  if (!isForward(fig, sqFrom, sqTo)) {
    return 0;
  }

  if (fig === 'P') {
    if (sqTo === sqFrom + 8) return 1;
    if (sqTo === sqFrom + 16 && row(sqFrom) === 1) return 2;
    return 0;
  } else {
    if (sqTo === sqFrom - 8) return 1;
    if (sqTo === sqFrom - 16 && row(sqFrom) === 6) return 2;
    return 0;
  }
};

var isPawnAttack = function isPawnAttack(sqFrom, sqTo) {
  var colour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'w';
  colour = colour.toLowerCase();

  if (!/[wb]/.test(colour)) {
    return false;
  }

  var fig = colour === 'w' ? 'P' : 'p';

  if (!isForward(fig, sqFrom, sqTo)) {
    return false;
  }

  if (difCol(sqFrom, sqTo) !== 1) return false;
  if (difRow(sqFrom, sqTo) !== 1) return false;
  return true;
};

var isCastling = function isCastling(sqFrom, sqTo) {
  var colour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'w';
  colour = colour.toLowerCase();

  if (!/[wb]/.test(colour)) {
    return false;
  }

  sqFrom = sqNumber(sqFrom);
  sqTo = sqNumber(sqTo);

  if (colour === 'w') {
    return sqFrom === 4 && (sqTo === 2 || sqTo === 6);
  } else {
    return sqFrom === 60 && (sqTo === 58 || sqTo === 62);
  }
};

var army = function army(fen, fig) {
  var fenArr = fen2array(fen);
  var ret = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = chessboard[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var v = _step2.value;

      if (fenArr[v] === fig) {
        ret = [].concat(_toConsumableArray(ret), [v]);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return ret;
};

var bPawns = function bPawns(fen) {
  return army(fen, 'p');
};

var bKnights = function bKnights(fen) {
  return army(fen, 'n');
};

var bBishops = function bBishops(fen) {
  return army(fen, 'b');
};

var bRooks = function bRooks(fen) {
  return army(fen, 'r');
};

var bQueens = function bQueens(fen) {
  return army(fen, 'q');
};

var bKings = function bKings(fen) {
  return army(fen, 'k');
};

var wPawns = function wPawns(fen) {
  return army(fen, 'P');
};

var wKnights = function wKnights(fen) {
  return army(fen, 'N');
};

var wBishops = function wBishops(fen) {
  return army(fen, 'B');
};

var wRooks = function wRooks(fen) {
  return army(fen, 'R');
};

var wQueens = function wQueens(fen) {
  return army(fen, 'Q');
};

var wKings = function wKings(fen) {
  return army(fen, 'K');
};

var wArmy = function wArmy(fen) {
  return [].concat(_toConsumableArray(wPawns(fen)), _toConsumableArray(wKnights(fen)), _toConsumableArray(wBishops(fen)), _toConsumableArray(wRooks(fen)), _toConsumableArray(wQueens(fen)), _toConsumableArray(wKings(fen)));
};

var bArmy = function bArmy(fen) {
  return [].concat(_toConsumableArray(bPawns(fen)), _toConsumableArray(bKnights(fen)), _toConsumableArray(bBishops(fen)), _toConsumableArray(bRooks(fen)), _toConsumableArray(bQueens(fen)), _toConsumableArray(bKings(fen)));
};

var wAttackers = function wAttackers(fen) {
  return [].concat(_toConsumableArray(wKnights(fen)), _toConsumableArray(wBishops(fen)), _toConsumableArray(wRooks(fen)), _toConsumableArray(wQueens(fen)));
};

var bAttackers = function bAttackers(fen) {
  return [].concat(_toConsumableArray(bKnights(fen)), _toConsumableArray(bBishops(fen)), _toConsumableArray(bRooks(fen)), _toConsumableArray(bQueens(fen)));
};

var wAttacks = function wAttacks(fen) {
  return wAttackers(fen).map(function (a) {
    return attacksFromSq(fen, a);
  }).reduce(function (a1, a2) {
    return a1.concat(a2);
  }, []);
};

var bAttacks = function bAttacks(fen) {
  return bAttackers(fen).map(function (a) {
    return attacksFromSq(fen, a);
  }).reduce(function (a1, a2) {
    return a1.concat(a2);
  }, []);
};

var wPMoves = function wPMoves(fen) {
  return wPawns(fen).map(function (p) {
    return chessboard.filter(function (n) {
      return canMove(fen, p, n);
    });
  }).reduce(function (a1, a2) {
    return a1.concat(a2);
  });
};

var bPMoves = function bPMoves(fen) {
  return bPawns(fen).map(function (p) {
    return chessboard.filter(function (n) {
      return canMove(fen, p, n);
    });
  }).reduce(function (a1, a2) {
    return a1.concat(a2);
  });
};

var isFriend = function isFriend(fig1, fig2) {
  return isBlackFigure(fig1) && isBlackFigure(fig2) || isWhiteFigure(fig1) && isWhiteFigure(fig2);
};

var isFoe = function isFoe(fig1, fig2) {
  return isBlackFigure(fig1) && isWhiteFigure(fig2) || isWhiteFigure(fig1) && isBlackFigure(fig2);
};

var getFigure = function getFigure(fen, sq) {
  return arrayFromFen(fen)[sqNumber(sq)];
};

var getFigures = function getFigures(fen, path) {
  return path.map(function (n) {
    var obj = {};
    obj[n] = getFigure(fen, n);
    return obj;
  }).reduce(function (el1, el2) {
    return _objectSpread({}, el1, {}, el2);
  }, {});
};

var attacksFromSq = function attacksFromSq(fen, sq) {
  var fenArr = arrayFromFen(fen);
  sq = sqNumber(sq);
  var fig = fenArr[sq];
  if (isEmptyFigure(fig)) return [];
  var filterFunc;

  switch (fig.toLowerCase()) {
    case 'n':
      filterFunc = isKnightJump;
      break;

    case 'b':
      filterFunc = isBishopMove;
      break;

    case 'r':
      filterFunc = isRookMove;
      break;

    case 'q':
      filterFunc = isQueenMove;
      break;

    case 'k':
      filterFunc = isKingMove;
      break;

    default:
      return fig === 'p' ? [sq - 7, sq - 9] : [sq + 7, sq + 9];
  }

  var candidatesArr = chessboard.filter(function (n) {
    return filterFunc(sq, n);
  });
  return candidatesArr.filter(function (n) {
    return isClearPath(fenArr, path(sq, n));
  });
};

var attacksOnSq = function attacksOnSq(fen, sq) {
  var colour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'w';
  colour = colour.toLowerCase();

  if (!/[wb]/.test(colour)) {
    return null;
  }

  sq = sqNumber(sq);
  var army = colour === 'w' ? wArmy(fen) : bArmy(fen); // console.log("Army:\n", army)

  return army.filter(function (s) {
    return attacksFromSq(fen, s).some(function (s2) {
      return s2 === sq;
    });
  });
};

var checksTo = function checksTo(fen) {
  var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'w';
  var foe = colour.toLowerCase() === 'w' ? 'b' : 'w';
  return attacksOnSq(fen, kingSq(fen, colour.toLowerCase()), foe);
};

var isCheck = function isCheck(fen) {
  return checksTo(fen, fen2obj(fen).turn).length > 0;
};

var isCheckMate = function isCheckMate(fen) {
  return isCheck(fen) && availableMoves(fen).length === 0;
};

var isStaleMate = function isStaleMate(fen) {
  return !isCheck(fen) && availableMoves(fen).length === 0;
};

var isCheckMateOld = function isCheckMateOld(fen) {
  if (!isCheck(fen)) return false;

  var _fen2obj = fen2obj(fen),
      turn = _fen2obj.turn;

  var _ref = turn === 'w' ? ['w', 'b', kingSq(fen, 'w')] : ['b', 'w', kingSq(fen, 'b')],
      _ref2 = _slicedToArray(_ref, 3),
      friend = _ref2[0],
      foe = _ref2[1],
      kSq = _ref2[2];

  var cands = candidateMoves(fen); //console.log(`Candidates: ${JSON.stringify(cands)}`)

  var kingMoves = cands.find(function (it) {
    return it[0] === kSq;
  })[1];
  if (kingMoves.length > 0) return false;
  var checks = checksTo(fen, friend);
  if (checks.length > 1) return true;
  var remaining = cands.filter(function (it) {
    return it[0] !== kSq;
  }); //console.log(`Remaining moves: ${JSON.stringify(remaining)}`)

  var checkPath = path(checks[0], kSq).filter(function (n) {
    return n !== kSq;
  }); //console.log(`Check path: ${JSON.stringify(checkPath)}`)

  var filtered = remaining.filter(function (duo) {
    return duo[1].some(function (n) {
      return checkPath.find(function (pth) {
        return pth === n;
      });
    });
  }); //console.log(`Filtered: ${JSON.stringify(filtered)}`)

  if (filtered.length > 0) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = filtered[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var pair = _step3.value;
        var newPair = [pair[0], pair[1].filter(function (v) {
          return checkPath.find(function (n) {
            return n === v;
          });
        })]; //console.log(`New Pair: ${JSON.stringify(newPair)}`)

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = pair[1][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var v = _step4.value;
            //console.log(`pair[0]: ${pair[0]} , v: ${v}`)
            var newFen = tryMove(fen, pair[0], v, 'Q'); //console.log(`newFen: ${newFen}`)

            if (newFen && validateFen(newFen).valid) return false;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return true;
};

var canKingMove = function canKingMove(fen, sqFrom, sqTo, king) {
  var _fen2obj2 = fen2obj(fen),
      castling = _fen2obj2.castling,
      turn = _fen2obj2.turn,
      fenArray = _fen2obj2.fenArray;

  var friend = king === 'k' ? 'b' : 'w';
  var foe = king === 'k' ? 'w' : 'b'; //console.log(`Castling: ${castling}, turn: ${turn}, friend: ${friend}, foe: ${foe}`)

  if (isKingMove(sqFrom, sqTo)) {
    return attacksOnSq(fen, sqTo, foe).length === 0;
  } else if (isCastling(sqFrom, sqTo, friend)) {
    //console.log(`IsCastling: ${sqFrom}, ${sqTo}`)
    if (!isEmptyFigure(fenArray[sqTo])) {
      //console.log('Aledgely square ', sqTo, ' is not empty')
      return false;
    }

    var pathToCheck;

    switch (sqTo) {
      case 6:
        if (!/K/.test(castling)) return false;
        pathToCheck = path(4, 6);
        break;

      case 2:
        if (!/Q/.test(castling)) return false;
        pathToCheck = path(4, 2);
        break;

      case 62:
        if (!/k/.test(castling)) return false;
        pathToCheck = path(60, 62);
        break;

      case 58:
        if (!/q/.test(castling)) return false;
        pathToCheck = path(60, 58);
        break;

      default:
        return false;
    } //console.log("!pathToCheck.map(s => attacksOnSq(fen, s, foe)).some(a => a.length > 0)",


    !pathToCheck.map(function (s) {
      return attacksOnSq(fen, s, foe);
    }).some(function (a) {
      return a.length > 0;
    });
    return !pathToCheck.map(function (s) {
      return attacksOnSq(fen, s, foe);
    }).some(function (a) {
      return a.length > 0;
    });
  } else {
    return false;
  }
};

var canMove = function canMove(fen, sqFrom, sqTo) {
  if (path(sqFrom, sqTo).length < 2) {
    return false;
  }

  if (!isClearPath(fen, path(sqFrom, sqTo))) {
    return false;
  }

  sqFrom = sqNumber(sqFrom);
  sqTo = sqNumber(sqTo);
  var sanSqTo = sq2san(sqTo);
  var fenObj = fen2obj(fen);
  var fenArray = fenObj.fenArray,
      enPassant = fenObj.enPassant;
  var figOrigen = fenArray[sqFrom];

  if (figOrigen === '0') {
    return false;
  }

  var figDestino = fenArray[sqTo];

  if (isFriend(figOrigen, figDestino)) {
    return false;
  }

  switch (figOrigen) {
    case 'p':
      //console.log(`Testing move from ${sqFrom} to ${sqTo} for black pawn`)
      if (isPawnMove(sqFrom, sqTo, 'b') && !isEmptyFigure(figDestino)) return false;
      if (isPawnAttack(sqFrom, sqTo, 'b') && !isWhiteFigure(figDestino) && sanSqTo !== enPassant) return false;
      if (!isPawnMove(sqFrom, sqTo, 'b') && !isPawnAttack(sqFrom, sqTo, 'b')) return false;
      break;

    case 'P':
      //console.log(`Testing move from ${sqFrom} to ${sqTo} for white pawn`)
      if (isPawnMove(sqFrom, sqTo, 'w') && !isEmptyFigure(figDestino)) return false;
      if (isPawnAttack(sqFrom, sqTo, 'w') && !isBlackFigure(figDestino) && sanSqTo !== enPassant) return false;
      if (!isPawnMove(sqFrom, sqTo, 'w') && !isPawnAttack(sqFrom, sqTo, 'w')) return false;
      break;

    case 'K':
    case 'k':
      return canKingMove(fen, sqFrom, sqTo, figOrigen);
      break;

    case 'q':
    case 'Q':
      if (!isQueenMove(sqFrom, sqTo)) return false;
      break;

    case 'r':
    case 'R':
      if (!isRookMove(sqFrom, sqTo)) return false;
      break;

    case 'b':
    case 'B':
      if (!isBishopMove(sqFrom, sqTo)) return false;
      break;

    case 'n':
    case 'N':
      if (!isKnightJump(sqFrom, sqTo)) return false;
      break;

    default:
      return false;
  }

  return true;
};

var candidateMoves = function candidateMoves(fen) {
  var _fen2obj3 = fen2obj(fen),
      fenArray = _fen2obj3.fenArray,
      turn = _fen2obj3.turn,
      castling = _fen2obj3.castling,
      enPassant = _fen2obj3.enPassant;

  var army = turn === 'w' ? wArmy(fen) : bArmy(fen);
  return army.map(function (sq) {
    return [sq, chessboard.filter(function (n) {
      return canMove(fen, sq, n);
    })];
  });
};

var availableMoves = function availableMoves(fen) {
  var retArr = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = candidateMoves(fen)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = item[1][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var sq = _step6.value;
          var newFen = tryMove(fen, item[0], sq, 'Q');
          if (newFen && validateFen(newFen).valid) retArr = [].concat(_toConsumableArray(retArr), [{
            from: item[0],
            to: sq
          }]);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return retArr;
};

var validateFen = function validateFen(fen) {
  var _fen2obj4 = fen2obj(fen),
      fenArray = _fen2obj4.fenArray,
      turn = _fen2obj4.turn;

  if (fenArray.filter(function (fig) {
    return fig === 'k';
  }).length !== 1) {
    return {
      valid: false,
      code: 2,
      message: 'There must be one and only one black king'
    };
  }

  if (fenArray.filter(function (fig) {
    return fig === 'K';
  }).length !== 1) {
    return {
      valid: false,
      code: 3,
      message: 'There must be one and only one white king'
    };
  }

  if (checksTo(fen, turn === 'w' ? 'b' : 'w').length > 0) {
    return {
      valid: false,
      code: 1,
      message: "The ".concat(turn === 'b' ? 'white' : 'black', " side is in check, while it's not its turn to move")
    };
  }

  return {
    valid: true,
    code: 0,
    message: 'OK'
  };
};

var tryMove = function tryMove(fen, sqFrom, sqTo) {
  var promotion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Q';
  if (!fen || fen.constructor.name !== 'String') return false;
  if (!canMove(fen, sqFrom, sqTo)) return false;

  var _fen2obj5 = fen2obj(fen),
      fenArray = _fen2obj5.fenArray,
      turn = _fen2obj5.turn,
      castling = _fen2obj5.castling,
      enPassant = _fen2obj5.enPassant,
      halfMoveClock = _fen2obj5.halfMoveClock,
      fullMoveNumber = _fen2obj5.fullMoveNumber;

  sqFrom = sqNumber(sqFrom);
  sqTo = sqNumber(sqTo);
  var _ref3 = [fenArray[sqFrom], fenArray[sqTo]],
      figFrom = _ref3[0],
      figTo = _ref3[1];

  var newArray = _toConsumableArray(fenArray);

  newArray[sqFrom] = '0';

  if (figFrom === 'P' && row(sqTo) === 7) {
    newArray[sqTo] = promotion ? promotion.toUpperCase() : 'Q';
  } else if (figFrom === 'p' && row(sqTo) === 0) {
    newArray[sqTo] = promotion ? promotion.toLowerCase() : 'q';
  } else {
    newArray[sqTo] = figFrom;
  }

  if (figFrom === 'P' && sq2san(sqTo) === enPassant) {
    newArray[sqTo - 8] = '0';
  } else if (figFrom === 'p' && sq2san(sqTo) === enPassant) {
    newArray[sqTo + 8] = '0';
  }

  if (figFrom === 'K' && sqFrom === 4 && sqTo === 6) {
    newArray[5] = 'R';
    newArray[7] = '0';
  } else if (figFrom === 'K' && sqFrom === 4 && sqTo === 2) {
    newArray[3] = 'R';
    newArray[0] = '0';
  } else if (figFrom === 'k' && sqFrom === 60 && sqTo === 62) {
    newArray[61] = 'r';
    newArray[63] = '0';
  } else if (figFrom === 'k' && sqFrom === 60 && sqTo === 58) {
    newArray[59] = 'r';
    newArray[56] = '0';
  }

  if (sqFrom === 4) castling = castling.replace('K', '').replace('Q', '');
  if (sqFrom === 60) castling = castling.replace('k', '').replace('q', '');
  if (sqFrom === 7) castling = castling.replace('K', '');
  if (sqFrom === 0) castling = castling.replace('Q', '');
  if (sqFrom === 63) castling = castling.replace('k', '');
  if (sqFrom === 56) castling = castling.replace('q', '');
  if (castling === '') castling = '-';
  turn = turn === 'w' ? 'b' : 'w';

  if (figFrom === 'P' && isPawnMove(sqFrom, sqTo, 'w') === 2) {
    enPassant = sq2san(sqTo - 8);
  } else if (figFrom === 'p' && isPawnMove(sqFrom, sqTo, 'b') === 2) {
    enPassant = sq2san(sqTo + 8);
  } else {
    enPassant = '-';
  }

  if (figFrom !== 'P' && figFrom !== 'p' && figTo === '0') {
    halfMoveClock = parseInt(halfMoveClock) + 1;
  } else {
    halfMoveClock = '0';
  }

  fullMoveNumber = turn === 'w' ? parseInt(fullMoveNumber) + 1 : fullMoveNumber;
  var fenString = array2fenString(newArray);
  return "".concat(fenString, " ").concat(turn, " ").concat(castling, " ").concat(enPassant, " ").concat(halfMoveClock, " ").concat(fullMoveNumber);
};

var stripSan = function stripSan(san) {
  return san.replace(/[+#=x]/g, '');
};

var san2args = function san2args(fen, san) {
  var fenobj = fen2obj(fen);
  san = stripSan(san);

  if (san === '0-0' || san === 'O-O') {
    if (fenobj.turn === 'w') {
      return {
        sqFrom: 4,
        sqTo: 6,
        promotion: null
      };
    } else {
      return {
        sqFrom: 60,
        sqTo: 62,
        promotion: null
      };
    }
  }

  if (san === '0-0-0' || san === 'O-O-O') {
    if (fenobj.turn === 'w') {
      return {
        sqFrom: 4,
        sqTo: 2,
        promotion: null
      };
    } else {
      return {
        sqFrom: 60,
        sqTo: 58,
        promotion: null
      };
    }
  }

  var sqFrom, sqTo, promotion, army;

  if (/[a-h]/.test(san[0])) {
    var colOrig = letter2col(san[0]);

    if (/[1-8]/.test(san[1])) {
      sqTo = sqNumber(san.slice(0, 2));
    } else {
      sqTo = sqNumber(san.slice(1, 3));
    }

    army = fenobj.turn === 'w' ? wPawns(fen) : bPawns(fen);
    sqFrom = army.find(function (n) {
      return col(n) === colOrig && canMove(fen, n, sqTo);
    }) || -1;

    if (/[QNRBqnrb]/.test(san[san.length - 1])) {
      promotion = san[san.length - 1];
    } else {
      promotion = null;
    }

    return {
      sqFrom: sqFrom,
      sqTo: sqTo,
      promotion: promotion
    };
  } else if (isWhiteFigure(san[0]) && san[0] !== 'P') {
    promotion = null;
    var fig = san[0];

    switch (fig) {
      case 'N':
        army = fenobj.turn === 'w' ? wKnights(fen) : bKnights(fen);
        break;

      case 'B':
        army = fenobj.turn === 'w' ? wBishops(fen) : bBishops(fen);
        break;

      case 'R':
        army = fenobj.turn === 'w' ? wRooks(fen) : bRooks(fen);
        break;

      case 'Q':
        army = fenobj.turn === 'w' ? wQueens(fen) : bQueens(fen);
        break;

      case 'K':
        army = fenobj.turn === 'w' ? wKings(fen) : bKings(fen);
        break;
    }

    sqTo = san2sq(san.slice(san.length - 2, san.length));

    if (san.length === 5) {
      sqFrom = san2sq(san.slice(1, 3));
    } else if (san.length === 4) {
      var extraInfo = san[1];

      var _ref4 = /[1-8]/.test(extraInfo) ? [row, parseInt(extraInfo) - 1] : [col, letter2col(extraInfo)],
          _ref5 = _slicedToArray(_ref4, 2),
          rowOrColFunc = _ref5[0],
          geoInfo = _ref5[1];

      sqFrom = army.find(function (n) {
        return rowOrColFunc(n) === geoInfo && canMove(fen, n, sqTo);
      }) || -1;
    } else {
      var candids = army.filter(function (n) {
        return canMove(fen, n, sqTo);
      });

      switch (candids.length) {
        case 0:
          sqFrom = -1;
          break;

        case 1:
          sqFrom = candids[0];
          break;

        default:
          var reals = candids.filter(function (sq) {
            var newfen = tryMove(fen, sq, sqTo, null);
            return newfen && validateFen(newfen).valid;
          }); // console.log("Hay " + reals.length + " jugada/s para elegir")

          sqFrom = reals.length === 1 ? reals[0] : -1;
      }
    }

    return {
      sqFrom: sqFrom,
      sqTo: sqTo,
      promotion: promotion
    };
  } else {
    return {
      sqFrom: -1,
      sqTo: -1,
      promotion: null
    };
  }
};

var args2san = function args2san(fen, sqFrom, sqTo, promotion) {
  var _fen2obj6 = fen2obj(fen),
      fenArray = _fen2obj6.fenArray,
      turn = _fen2obj6.turn,
      enPassant = _fen2obj6.enPassant,
      castling = _fen2obj6.castling;

  sqFrom = sqNumber(sqFrom);
  sqTo = sqNumber(sqTo);
  var _ref6 = [fenArray[sqFrom], fenArray[sqTo]],
      figFrom = _ref6[0],
      figTo = _ref6[1];
  if (isEmptyFigure(figFrom)) return null;
  var figure, extrainfo, capture, destiny, promotionFigure, check;
  var newfen = tryMove(fen, sqFrom, sqTo, promotion);
  if (!(newfen && validateFen(newfen).valid)) return null;

  if (isCheckMate(newfen)) {
    check = '#';
  } else if (isCheck(newfen)) {
    check = '+';
  } else {
    check = '';
  }

  if (figFrom === 'K' && sqFrom === 4) {
    if (sqTo === 6) return "O-O".concat(check);
    if (sqTo === 2) return "O-O-O".concat(check);
  }

  if (figFrom === 'k' && sqFrom === 60) {
    if (sqTo === 62) return "O-O".concat(check);
    if (sqTo === 58) return "O-O-O".concat(check);
  }

  capture = !isEmptyFigure(figTo) ? 'x' : /[Pp]/.test(figFrom) && sqNumber(enPassant) === sqTo ? 'x' : '';
  destiny = sq2san(sqTo);

  if (/[Pp]/.test(figFrom)) {
    figure = isSameCol(sqFrom, sqTo) ? '' : col2letter(col(sqFrom));
    extrainfo = '';

    if (row(sqTo) === 7 && figFrom === 'P' || row(sqTo) === 7 && figFrom === 'P') {
      promotionFigure = "=".concat(promotion ? promotion.toUpperCase() : 'Q');
    } else {
      promotionFigure = '';
    }
  } else {
    figure = figFrom.toUpperCase();
    promotionFigure = '';
    var attacks = attacksOnSq(fen, sqTo, turn);
    var fig_from_attacks = attacks.filter(function (sq) {
      return fenArray[sq] === figFrom && sq !== sqFrom;
    });

    if (fig_from_attacks.length === 0) {
      extrainfo = '';
    } else {
      var valids = fig_from_attacks.filter(function (sq) {
        var otherfen = tryMove(fen, sq, sqTo, null);
        return otherfen && validateFen(otherfen).valid;
      });

      if (valids.length > 1) {
        extrainfo = sq2san(sqFrom);
      } else if (valids.length === 1) {
        if (isSameCol(sqFrom, valids[0])) {
          extrainfo = (row(sqFrom) + 1).toString();
        } else {
          extrainfo = col2letter(col(sqFrom));
        }
      } else {
        extrainfo = '';
      }
    }
  }

  return "".concat(figure).concat(extrainfo).concat(capture).concat(destiny).concat(promotionFigure).concat(check);
};

var makeFenComparable = function makeFenComparable(fen) {
  return fen.split(/\s+/).slice(0, 4).join(' ');
};

var Chess =
/*#__PURE__*/
function () {
  function Chess() {
    var fen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFen;

    _classCallCheck(this, Chess);

    this.reset(fen);
  }

  _createClass(Chess, [{
    key: "reset",
    value: function reset() {
      var fen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFen;
      this.__fens__ = [fen];
      this.__sans__ = [''];
    }
  }, {
    key: "move",
    value: function move() {
      var fenObj = fen2obj(this.fen);
      var sqFrom, sqTo, promotion;

      switch (arguments.length) {
        case 0:
          return false;

        case 1:
          var result = san2args(this.fen, arguments.length <= 0 ? undefined : arguments[0]);
          sqFrom = result.sqFrom;
          sqTo = result.sqTo;
          promotion = result.promotion;
          break;

        default:
          sqFrom = sqNumber(arguments.length <= 0 ? undefined : arguments[0]);
          sqTo = sqNumber(arguments.length <= 1 ? undefined : arguments[1]);
          promotion = arguments.length <= 2 ? undefined : arguments[2];
      }

      if (isWhiteFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'b' || isBlackFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'w') return false;
      var newFen = tryMove(this.fen, sqFrom, sqTo, promotion);
      if (!newFen) return false;
      if (!validateFen(newFen).valid) return false;
      var san = args2san(this.fen, sqFrom, sqTo, promotion);
      var fenArray = fenObj.fenArray,
          turn = fenObj.turn,
          enPassant = fenObj.enPassant;
      var _ref7 = [fenArray[sqFrom], fenArray[sqTo]],
          figFrom = _ref7[0],
          figTo = _ref7[1];
      var newSanObj = {
        san: san,
        piece: figFrom,
        color: turn,
        from: sq2san(sqFrom),
        to: sq2san(sqTo)
      };
      if (!isEmptyFigure(figTo)) newSanObj = _objectSpread({}, newSanObj, {
        captured: figTo
      });
      var isEnPassant = /[Pp]/.test(figFrom) && sqTo === san2sq(enPassant);
      var isBigPawn = /[Pp]/.test(figFrom) && difRow(sqFrom, sqTo) === 2;
      var isPromotion = figFrom === 'p' && row(sqTo) === 0 || figFrom === 'P' && row(sqTo) === 7;
      if (isPromotion) newSanObj = _objectSpread({}, newSanObj, {
        promotion: promotion ? promotion.toUpperCase() : 'Q'
      });
      var flags = '';

      if (figFrom === 'K' && sqFrom === 4 && sqTo === 6 || figFrom === 'k' && sqFrom === 60 && sqTo === 62) {
        flags += 'k';
      } else if (figFrom === 'K' && sqFrom === 4 && sqTo === 2 || figFrom === 'k' && sqFrom === 60 && sqTo === 58) {
        flags += 'q';
      }

      if (isPromotion) {
        flags += 'p';
      } else if (isBigPawn) {
        flags += 'b';
      }

      flags += isEnPassant ? 'e' : newSanObj.captured ? 'c' : 'n';
      this.__sans__ = [].concat(_toConsumableArray(this.__sans__), [_objectSpread({}, newSanObj, {
        flags: flags
      })]);
      this.__fens__ = [].concat(_toConsumableArray(this.__fens__), [newFen]);
      setTimeout(function () {}, 0);
      return this;
    }
  }, {
    key: "history",
    value: function history(options) {
      return options && options.verbose ? this.__sans__.slice(1) : this.__sans__.slice(1).map(function (obj) {
        return obj.san;
      });
    }
  }, {
    key: "moves",
    value: function moves() {
      var _this = this;

      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return from ? availableMoves(this.fen).filter(function (it) {
        return it.from === sqNumber(from);
      }).map(function (it) {
        return args2san(_this.fen, it.from, it.to, 'Q');
      }) : availableMoves(this.fen).map(function (it) {
        return args2san(_this.fen, it.from, it.to, 'Q');
      });
    }
  }, {
    key: "in_threefold_repetition",
    value: function in_threefold_repetition() {
      var current = makeFenComparable(this.fen);
      var groups = groupArray(this.fens().map(makeFenComparable));
      return groups[current] >= 3;
    }
  }, {
    key: "get",
    value: function get(sq) {
      return fen2obj(this.fen).fenArray[sqNumber(sq)];
    }
  }, {
    key: "fens",
    value: function fens() {
      return this.__fens__;
    }
  }, {
    key: "undo",
    value: function undo() {
      if (this.__fens__.length < 2) return false;

      this.__fens__.splice(this.__fens__.length - 1, this.__fens__.length);

      this.__sans__.splice(this.__sans__.length - 1, this.__sans__.length);

      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.fen;
    }
  }, {
    key: "isCheck",
    get: function get() {
      return isCheck(this.fen);
    }
  }, {
    key: "isCheckMate",
    get: function get() {
      return isCheckMate(this.fen);
    }
  }, {
    key: "isStaleMate",
    get: function get() {
      return isStaleMate(this.fen);
    }
  }, {
    key: "fen",
    get: function get() {
      return this.__fens__[this.__fens__.length - 1];
    }
  }]);

  return Chess;
}();

var thisExports = {
  groupArray: groupArray,
  makeSet: makeSet,
  range: range,
  sanRegExp: sanRegExp,
  pgnTagLineRegExp: pgnTagLineRegExp,
  defaultFen: defaultFen,
  sicilianFen: sicilianFen,
  scandinavianFen: scandinavianFen,
  oddFrenchFen: oddFrenchFen,
  mateLocoFen: mateLocoFen,
  mateAyudadoFen: mateAyudadoFen,
  prePastorFen: prePastorFen,
  pastorFen: pastorFen,
  makeFenComparable: makeFenComparable,
  fen2obj: fen2obj,
  obj2fen: obj2fen,
  expandFen: expandFen,
  compressFen: compressFen,
  fen2array: fen2array,
  defaultFenArray: defaultFenArray,
  array2fenString: array2fenString,
  computedFenString: computedFenString,
  row: row,
  col: col,
  sq2rowcol: sq2rowcol,
  rowcol2sq: rowcol2sq,
  col2letter: col2letter,
  letter2col: letter2col,
  sq2san: sq2san,
  san2sq: san2sq,
  isBlackFigure: isBlackFigure,
  isWhiteFigure: isWhiteFigure,
  isEmptyFigure: isEmptyFigure,
  isDarkSquare: isDarkSquare,
  isLightSquare: isLightSquare,
  difRow: difRow,
  difCol: difCol,
  isSameRow: isSameRow,
  isSameCol: isSameCol,
  isDiagonal: isDiagonal,
  isAntiDiagonal: isAntiDiagonal,
  isKingReach: isKingReach,
  path: path,
  innerPath: innerPath,
  isForward: isForward,
  kingSq: kingSq,
  isClearPath: isClearPath,
  isPawnMove: isPawnMove,
  isPawnAttack: isPawnAttack,
  isCastling: isCastling,
  isKingMove: isKingMove,
  isBishopMove: isBishopMove,
  isRookMove: isRookMove,
  isQueenMove: isQueenMove,
  army: army,
  wBishops: wBishops,
  wKings: wKings,
  wKnights: wKnights,
  wPawns: wPawns,
  wQueens: wQueens,
  wRooks: wRooks,
  bBishops: bBishops,
  bKings: bKings,
  bKnights: bKnights,
  bPawns: bPawns,
  bQueens: bQueens,
  bRooks: bRooks,
  wArmy: wArmy,
  bArmy: bArmy,
  wAttackers: wAttackers,
  bAttackers: bAttackers,
  wAttacks: wAttacks,
  bAttacks: bAttacks,
  wPMoves: wPMoves,
  bPMoves: bPMoves,
  isFriend: isFriend,
  isFoe: isFoe,
  getFigure: getFigure,
  getFigures: getFigures,
  attacksFromSq: attacksFromSq,
  attacksOnSq: attacksOnSq,
  checksTo: checksTo,
  isCheck: isCheck,
  isCheckMate: isCheckMate,
  isStaleMate: isStaleMate,
  canKingMove: canKingMove,
  canMove: canMove,
  candidateMoves: candidateMoves,
  availableMoves: availableMoves,
  validateFen: validateFen,
  tryMove: tryMove,
  stripSan: stripSan,
  args2san: args2san,
  san2args: san2args,
  Chess: Chess
};
var cf = thisExports;
/*

try {
    export default thisExports
}
catch(e) {
    console.log(`EXPORT (1) ERROR: ${e.message}`)
}

*/

if (typeof window !== 'undefined') {
  window.Chess = Chess;
}

if (typeof global !== 'undefined') {
  global.Chess = Chess;
}

try {
  if (typeof module !== 'undefined') {
    module.exports = Chess;
  } else {
    var exports = Chess;
  }
} catch (e) {
  console.log("EXPORT (2) ERROR: ".concat(e.message));
}
/*
try {
    if (window) window.base_chess_functions = this.exports
}
catch(e) {
    console.log(`WINDOW ERROR: ${e.message}`)
}

*/
},{}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map