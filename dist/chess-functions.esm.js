var lpad = function (stri, padChar, num) {
  if ( padChar === void 0 ) padChar = '0';
  if ( num === void 0 ) num = 2;

  return ("" + (padChar.repeat(stri.toString().length >= num ? 0 : num - stri.toString().length)) + stri);
};
var rpad = function (stri, padChar, num) {
  if ( padChar === void 0 ) padChar = '0';
  if ( num === void 0 ) num = 2;

  return ("" + stri + (padChar.repeat(stri.toString().length >= num ? 0 : num - stri.toString().length)));
};

var capitalize = function (stri) { return ("" + (stri[0].toUpperCase()) + (stri.slice(1))); };

var partition = function (arr, len) { return arr.reduce(function (base, el) { return base[base.length -1].length < len ? base.slice(0, -1).concat( [( base[base.length -1] ).concat( [el])]) : 
                                        base.concat( [[el]]); } , [[]]); };

var groupArray = function (arr) {
    return arr.reduce(function (base, x) {
        if (x in base) {
            base[x] += 1;
        } else {
            base[x] = 1;
        }
        return base
    }, {})
};

var makeSet = function (arr) { return arr.reduce(function (b, el) { return b.find(function (el2) { return el2 === el; }) ? b : b.concat( [el]); }, []); };

var range = function (start, end, step) {
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = 9;
    if ( step === void 0 ) step = 1;

    if (start === end) {
        return [start]
    }

    if (!step) {
        if (start < end) {
            step = 1;
        } else {
            step = -1;
        }
    }

    if (start > end && step > 0) {
        return []
    }

    if (start < end && step < 0) {
        return []
    }

    return [start ].concat( range(start + step, end, step))
};

var chessboard = range(0, 63);

var sanRegExp = /(?:(^0-0-0|^O-O-O)|(^0-0|^O-O)|(?:^([a-h])(?:([1-8])|(?:x([a-h][1-8])))(?:=?([NBRQ]))?)|(?:^([NBRQK])([a-h])?([1-8])?(x)?([a-h][1-8])))(?:(\+)|(#)|(\+\+))?$/;
var pgnTagLineRegExp = /^\s*\[\s*(.+?)\s+"(.+?)"\s*\]\s*$/;

var defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var emptyFen = '8/8/8/8/8/8/8/8 w - - 0 1';
var sicilianFen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1';
var scandinavianFen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2';
var oddFrenchFen = 'rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3';
var mateLocoFen = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3';
var mateAyudadoFen = 'r1bqnNnr/pppkpp1p/7R/3p4/8/8/PPPPPPP1/RNBQKBN1 b Q - 0 6';
var prePastorFen = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4';
var pastorFen = 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4';

var fen2obj = function (fen) {
    var arr = fen.split(/\s+/);
    return {
        fenString: arr[0],
        turn: arr[1],
        castling: arr[2],
        enPassant: arr[3],
        halfMoveClock: arr[4],
        fullMoveNumber: arr[5],
        fenArray: fen2array(arr[0])
    }
};

var obj2fen = function (fenObj) {
    delete fenObj.fenArray;
    return ((fenObj.fenString) + " " + (fenObj.turn) + " " + (fenObj.castling) + " " + (fenObj.enPassant) + " " + (fenObj.halfMoveClock) + " " + (fenObj.fullMoveNumber))
};

var expandFen = function (fen) { return fen.replace(/\//g, '').replace(/[1-8]/g, function (d) { return ('0').repeat(parseInt(d)); }); };

var compressFen = function (fen) { return fen.replace(/(.{8})(?!$)/g, "$1/").replace(/0+/g, function (z) { return z.length.toString(); }); };

var fen2array = function (fen) {
    if (/^(.+\/){7}.+$/.test(fen)) {
        fen = expandFen(fen);
    } else if (fen.length !== 64) {
        return []
    }
    return fen.split('').map(function (_, i, self) { return self[i ^ 56]; })
};

var defaultFenArray = fen2array(fen2obj(defaultFen).fenString);

var array2fenString = function (arr) { return compressFen(arr.map(function (v, i) { return arr[i ^56]; }).join('')); };

var computedFenString = array2fenString(defaultFenArray);

var sq2san = function (sq) { return sq >= 0 && sq < 64 ? 
                     ("" + (String.fromCharCode(97 + col(sq))) + (String.fromCharCode(49 + row(sq)))) :
                     '-'; };

var san2sq = function (san) { return /[a-h][1-8]/.test(san) ? 
                      rowcol2sq(san.charCodeAt(1) -49, san.charCodeAt(0) - 97) :
                      -1; };

var sqNumber = function (sq) { return isNaN(sq) ? san2sq(sq) : parseInt(sq); };

var row = function (sq) { return Math.floor(sqNumber(sq) / 8); };

var col = function (sq) { return sqNumber(sq) % 8; };

var col2letter = function (c) { return String.fromCharCode(97 + c); };

var letter2col = function (l) { return l.charCodeAt(0) - 97; };

var sq2rowcol = function (sq) { return ({row: row(sq), col: col(sq)}); };

var rowcol2sq = function (r, c) { return r * 8 + c; };

var isBlackFigure = function (fig) { return /[pnbrqk]/.test(fig); };

var isWhiteFigure = function (fig) { return /[PNBRQK]/.test(fig); };

var isEmptyFigure = function (fig) { return fig === '0'; };

var isDarkSquare = function (sq) {
    if (sq.constructor.name === 'String') {
        sq = san2sq(sq);
    }
    return (row(sq) % 2 === 0 && col(sq) % 2 === 0) || (row(sq) % 2 !== 0 && col(sq) % 2 !== 0)
};

var isLightSquare = function (sq) { return !isDarkSquare(sq); };

var difRow = function (sq1, sq2) { return Math.abs(row(sq1) - row(sq2)); };

var difCol = function (sq1, sq2) { return Math.abs(col(sq1) - col(sq2)); };

var isSameRow = function (sq1, sq2) { return difRow(sq1, sq2) === 0; };

var isSameCol = function (sq1, sq2) { return difCol(sq1, sq2) === 0; };

var isDiagonal = function (sq1, sq2) { return difCol(sq1, sq2) === difRow(sq1, sq2); };

var isAntiDiagonal = function (sq1, sq2) { return difCol(sq1, sq2) === difRow(sq1, sq2) && 
                                     Math.abs(sqNumber(sq1) - sqNumber(sq2)) % 7 === 0 &&
                                     sqNumber(sq1) !== 63 &&
                                     sqNumber(sq2) !== 63; };

var isKnightJump = function (sq1, sq2) { return (difCol(sq1, sq2) === 2  && difRow(sq1, sq2) === 1) ||
                                   (difCol(sq1, sq2) === 1  && difRow(sq1, sq2) === 2); }; 

var isKingReach = function (sq1, sq2) { return difCol(sq1, sq2) < 2 && difRow(sq1, sq2) < 2; };

var rowStep = 1;
var colStep = 8;
var diagStep = 9;
var antiDiagStep = 7;

var path = function (sq1, sq2) {
    var step;
    if (sq1 === sq2) {
        return [sqNumber(sq1)]
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
        return [sqNumber(sq1), sqNumber(sq2)]
    } else {
        return []
    }
    return range(sqNumber(sq1), sqNumber(sq2), step)
};

var innerPath = function (pth) { return pth.slice(1, -1); };

var isForward = function (fig, sqFrom, sqTo) { return isBlackFigure(fig) ? 
                  row(sqFrom) > row(sqTo) : 
                  row(sqFrom) < row(sqTo); };

var arrayFromFen = function (fen) {
    if (fen.constructor.name === 'Array') {
        return fen
    } else if (!(fen.constructor.name === 'String')) {
        return []
    } else {
        if (/\s+/.test(fen)) {
            return fen2obj(fen).fenArray
        } else {
            return fen2array(fen)
        }
    }
};

var kingSq = function (fen, colour) { return arrayFromFen(fen).findIndex( function (x) { return x === (/[a-z]/.test(colour) && colour !== 'w' ? 'k' : 'K'); }); };

var isClearPath = function (fen, pth) {
    if  (pth.length < 3) {
        return true
    }

    var fenArr = arrayFromFen(fen);
    var iPath = innerPath(pth);

    for (var i in iPath) {
        if (fenArr[iPath[i]] !== '0') {
            return false
        }
    }

    return true
};

var isBishopMove = function (sqFrom, sqTo) { return isDiagonal(sqFrom, sqTo) && sqFrom !== sqTo; };

var isRookMove = function (sqFrom, sqTo) { return (isSameRow(sqFrom, sqTo) || isSameCol(sqFrom, sqTo)) && sqFrom !== sqTo; };

var isQueenMove = function (sqFrom, sqTo) { return (isBishopMove(sqFrom, sqTo) || isRookMove(sqFrom, sqTo)) && sqFrom !== sqTo; };

var isKingMove = function (sqFrom, sqTo) { return difRow(sqNumber(sqFrom), sqNumber(sqTo)) < 2 &&  
                                     difCol(sqNumber(sqFrom), sqNumber(sqTo)) < 2 &&
                                     sqFrom !== sqTo; };

var isPawnMove = function (sqFrom, sqTo, colour) {
    if ( colour === void 0 ) colour = 'w';

    colour = colour.toLowerCase();
    if (!/[wb]/.test(colour)) {
        return false
    }
    var fig = colour === 'w' ? 'P' : 'p';
    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    if (!isForward(fig, sqFrom, sqTo)) {
        return 0
    }

    if (fig === 'P') {
        if (sqTo === (sqFrom + 8)) { return 1 }
        if (sqTo === (sqFrom + 16) && row(sqFrom) === 1) { return 2 }
        return 0
    } else {
        if (sqTo === (sqFrom - 8)) { return 1 }
        if (sqTo === (sqFrom - 16) && row(sqFrom) === 6) { return 2 }
        return 0
    }
};

var isPawnAttack = function (sqFrom, sqTo, colour) {
    if ( colour === void 0 ) colour = 'w';

    colour = colour.toLowerCase();
    if (!/[wb]/.test(colour)) {
        return false
    }
    var fig = colour === 'w' ? 'P' : 'p';
    if (!isForward(fig, sqFrom, sqTo)) {
        return false
    }
    if (difCol(sqFrom, sqTo) !== 1) { return false }
    if (difRow(sqFrom, sqTo) !== 1) { return false }
    return true
};

var isPawnPromotion = function (sqFrom, sqTo, colour) {
    if ( colour === void 0 ) colour = 'w';


    if (!isPawnAttack(sqFrom, sqTo, colour) && !isPawnMove(sqFrom, sqTo, colour)) {
        return false
    }
    
    colour = colour.toLowerCase();

    if (colour === 'w' && row(sqTo) === 7) { return true }
    if (colour === 'b' && row(sqTo) === 0) { return true }

    return false
};

var isCastling = function (sqFrom, sqTo, colour) {
    if ( colour === void 0 ) colour = 'w';

    colour = colour.toLowerCase();
    if (!/[wb]/.test(colour)) {
        return false
    }
    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    if (colour === 'w') {
        return sqFrom === 4 && (sqTo === 2 || sqTo === 6)
    } else {
        return sqFrom === 60 && (sqTo === 58 || sqTo === 62)
    }
};

var army = function (fen, fig) {
    var fenArr = fen2array(fen);
    var ret = [];
    for (var i in chessboard) {
        if (fenArr[chessboard[i]] === fig) {
            ret = ret.concat( [chessboard[i]]);
        }
    }
    return ret
};

var bPawns = function (fen) { return army(fen, 'p'); };
var bKnights = function (fen) { return army(fen, 'n'); };
var bBishops = function (fen) { return army(fen, 'b'); };
var bBishopsL = function (fen) { return army(fen, 'b').filter(function (sq) { return isLightSquare(sq); }); };
var bBishopsD = function (fen) { return army(fen, 'b').filter(function (sq) { return isDarkSquare(sq); }); };
var bRooks = function (fen) { return army(fen, 'r'); };
var bQueens = function (fen) { return army(fen, 'q'); };
var bKings = function (fen) { return army(fen, 'k'); };

var wPawns = function (fen) { return army(fen, 'P'); };
var wKnights = function (fen) { return army(fen, 'N'); };
var wBishops = function (fen) { return army(fen, 'B'); };
var wBishopsL = function (fen) { return army(fen, 'B').filter(function (sq) { return isLightSquare(sq); }); };
var wBishopsD = function (fen) { return army(fen, 'B').filter(function (sq) { return isDarkSquare(sq); }); };
var wRooks = function (fen) { return army(fen, 'R'); };
var wQueens = function (fen) { return army(fen, 'Q'); };
var wKings = function (fen) { return army(fen, 'K'); };

var wArmy = function (fen) { return wPawns(fen).concat( wKnights(fen), 
    wBishops(fen),
    wRooks(fen),
    wQueens(fen),
    wKings(fen) ); };

var bArmy = function (fen) { return bPawns(fen).concat( bKnights(fen), 
    bBishops(fen),
    bRooks(fen),
    bQueens(fen),
    bKings(fen) ); };

var wAttackers = function (fen) { return wKnights(fen).concat( wBishops(fen),
    wRooks(fen),
    wQueens(fen) ); };

var bAttackers = function (fen) { return bKnights(fen).concat( bBishops(fen),
    bRooks(fen),
    bQueens(fen) ); };

var wAttacks = function (fen) { return wAttackers(fen).map(function (a) { return attacksFromSq(fen, a); }).reduce(function (a1, a2) { return a1.concat(a2); }, []); };
var bAttacks = function (fen) { return bAttackers(fen).map(function (a) { return attacksFromSq(fen, a); }).reduce(function (a1, a2) { return a1.concat(a2); }, []); };

var wPMoves = function (fen) { return wPawns(fen).map(function (p) { return chessboard.filter(function (n) { return canMove(fen, p, n); }); })
                       .reduce(function (a1, a2) { return a1.concat(a2); }); };   

var bPMoves = function (fen) { return bPawns(fen).map(function (p) { return chessboard.filter(function (n) { return canMove(fen, p, n); }); })
                       .reduce(function (a1, a2) { return a1.concat(a2); }); };   

var isFriend = function (fig1, fig2) { return (isBlackFigure(fig1) && isBlackFigure(fig2)) || (isWhiteFigure(fig1) && isWhiteFigure(fig2)); };
var isFoe = function (fig1, fig2) { return (isBlackFigure(fig1) && isWhiteFigure(fig2)) || (isWhiteFigure(fig1) && isBlackFigure(fig2)); };

var getFigure = function (fen, sq) { return arrayFromFen(fen)[sqNumber(sq)]; };

var getFigures = function (fen, path) { return path.map( function (n) {
    var obj = {};
    obj[n] = getFigure(fen, n);
    return obj
//}).reduce((el1, el2) => ({...el1, ...el2}), {})
}).reduce(function (el1, el2) { return Object.assign(el1, el2); }, {}); };

var attacksFromSq = function (fen, sq) {
    var fenArr = arrayFromFen(fen);
    sq = sqNumber(sq);
    var fig = fenArr[sq];
    if (isEmptyFigure(fig)) { return [] }
    var filterFunc;

    switch (fig.toLowerCase()) {
        case 'n':
            filterFunc = isKnightJump;
            break
        case 'b':
            filterFunc = isBishopMove;
            break
        case 'r':
            filterFunc = isRookMove;
            break
        case 'q':
            filterFunc = isQueenMove;
            break
        case 'k':
            filterFunc = isKingMove;
            break
        default: 
            // return fig === 'p' ? [sq - 7, sq - 9] : [sq + 7, sq + 9]
            if (fig === 'p') {
                if (col(sq) === 0) { return [sq - 7] }
                if (col(sq) === 7) { return [sq - 9] }
                return [sq - 7, sq - 9]
            } else if (fig === 'P') {
                if (col(sq) === 0) { return [sq + 9] }
                if (col(sq) === 7) { return [sq + 7] }
                return [sq + 7, sq + 9]
            } else {
                return []
            }
        }

        var candidatesArr = chessboard.filter( function (n) { return filterFunc(sq, n); });

        return candidatesArr.filter(function (n) { return isClearPath(fenArr, path(sq, n)); })
};

var attacksOnSq = function (fen, sq, colour) {
    if ( colour === void 0 ) colour = 'w';

    colour = colour.toLowerCase();
    if (!/[wb]/.test(colour)) {
        return null
    }

    sq = sqNumber(sq);

    var army = colour === 'w' ? wArmy(fen) : bArmy(fen);
    // console.log("Army:\n", army)

    return army.filter(function (s) { return attacksFromSq(fen, s).some(function (s2) { return s2 === sq; }); })
};

var checksTo = function (fen, colour) {
    if ( colour === void 0 ) colour = 'w';

    var foe = colour.toLowerCase() === 'w' ? 'b' : 'w';
    return attacksOnSq(fen, kingSq(fen, colour.toLowerCase()), foe)
};

var isCheck = function (fen) { return checksTo(fen, fen2obj(fen).turn).length > 0; };

var isCheckMate = function (fen) { return isCheck(fen) && availableMoves(fen).length === 0; };

var isStaleMate = function (fen) { return !isCheck(fen) && availableMoves(fen).length === 0; };

var canKingMove = function (fen, sqFrom, sqTo, king) {
    if (king === 'k' || king === 'b') {
        king = 'k';
    } else if (king === 'K' || king === 'w') {
        king = 'K';
    }
    
    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    
    var ref = fen2obj(fen);
    var castling = ref.castling;
    var fenArray = ref.fenArray;
    var friend = king === 'k' ? 'b' : 'w';
    var foe = king === 'k' ? 'w' : 'b';

    //console.log(`Castling: ${castling}, turn: ${turn}, friend: ${friend}, foe: ${foe}`)
    if(isKingMove(sqFrom, sqTo)) {
        return attacksOnSq(fen, sqTo, foe).length === 0
    } else if (isCastling(sqFrom, sqTo, friend)) {
        //console.log(`IsCastling: ${sqFrom}, ${sqTo}`)
        if (!isEmptyFigure(fenArray[sqTo])) {
            //console.log('Aledgely square ', sqTo, ' is not empty')
            return false
        }
        var pathToCheck;
        switch (sqTo) {
            case 6:
                if (!/K/.test(castling)) { return false }
                pathToCheck = path(4, 6);
                break
            case 2:
                if (!/Q/.test(castling)) { return false }
                pathToCheck = path(4, 2);
                break
            case 62:
                if (!/k/.test(castling)) { return false }
                pathToCheck = path(60, 62);
                break
            case 58:
                if (!/q/.test(castling)) { return false }
                pathToCheck = path(60, 58);
                break
            default:
                return false
        }
        //console.log("!pathToCheck.map(s => attacksOnSq(fen, s, foe)).some(a => a.length > 0)",
        !pathToCheck.map(function (s) { return attacksOnSq(fen, s, foe); }).some(function (a) { return a.length > 0; });
        return !pathToCheck.map(function (s) { return attacksOnSq(fen, s, foe); }).some(function (a) { return a.length > 0; })
    } else {
        return false
    }
};


var canMove = function (fen, sqFrom, sqTo) {
    if (path(sqFrom, sqTo).length < 2 ) {
        return false
    }
    if (!isClearPath(fen, path(sqFrom, sqTo))) {
        return false
    }

    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    var sanSqTo = sq2san(sqTo);
    var fenObj = fen2obj(fen);
    var fenArray = fenObj.fenArray;
    var enPassant = fenObj.enPassant;
    var figOrigen = fenArray[sqFrom];

    if (figOrigen === '0') {
        return false
    }

    var figDestino = fenArray[sqTo];

    if (isFriend(figOrigen, figDestino)) {
        return false
    }

    switch(figOrigen) {
        case 'p':
            //console.log(`Testing move from ${sqFrom} to ${sqTo} for black pawn`)
            if (isPawnMove(sqFrom, sqTo, 'b') && !isEmptyFigure(figDestino)) { return false }
            if (isPawnAttack(sqFrom, sqTo, 'b') && !isWhiteFigure(figDestino) && sanSqTo !== enPassant) { return false }
            if (!isPawnMove(sqFrom, sqTo, 'b') && !isPawnAttack(sqFrom, sqTo, 'b')) { return false }
            break
        case 'P':
            //console.log(`Testing move from ${sqFrom} to ${sqTo} for white pawn`)
            if (isPawnMove(sqFrom, sqTo, 'w') && !isEmptyFigure(figDestino)) { return false }
            if (isPawnAttack(sqFrom, sqTo, 'w') && !isBlackFigure(figDestino) && sanSqTo !== enPassant) { return false }
            if (!isPawnMove(sqFrom, sqTo, 'w') && !isPawnAttack(sqFrom, sqTo, 'w')) { return false }
            break
        case 'K':
        case 'k':
            return canKingMove(fen, sqFrom, sqTo, figOrigen)
        case 'q':
        case 'Q':
            if (!isQueenMove(sqFrom, sqTo)) { return false }
            break
        case 'r':
        case 'R':
            if (!isRookMove(sqFrom, sqTo)) { return false }
            break
        case 'b':
        case 'B':
            if (!isBishopMove(sqFrom, sqTo)) { return false }
            break
        case 'n':
        case 'N':
            if (!isKnightJump(sqFrom, sqTo)) { return false }
            break
        default:
            return false
    }

    return true
};
 
var candidateMoves = function (fen) {
  var ref = fen2obj(fen);
  var turn = ref.turn;
  var army = turn === 'w' ? wArmy(fen) : bArmy(fen);
  return army.map(function (sq) { return [sq, chessboard.filter(function (n) { return canMove(fen, sq, n); })]; })
};

var availableMoves = function (fen) {
    var retArr = [];
    var candMoves = candidateMoves(fen);
    for (var i$1 = 0, list$1 = candMoves; i$1 < list$1.length; i$1 += 1) {
        var item = list$1[i$1];

      for (var i = 0, list = item[1]; i < list.length; i += 1) {
            var sq = list[i];

          var newFen = tryMove(fen, item[0], sq, 'Q');
            if (newFen && validateFen(newFen).valid) { retArr = retArr.concat( [{from: item[0], to: sq}]); }
        }
    }
    return retArr
};

var validateFen = function (fen) {
    if (!fen) { return {valid: false, code: 4, message: 'Unknown error'} }
    var ref = fen2obj(fen);
    var fenArray = ref.fenArray;
    var turn = ref.turn;
    if (fenArray.filter(function (fig) { return fig === 'k'; }).length !== 1) {
        return {valid: false, code: 2, message: 'There must be one and only one black king'}
    }
    if (fenArray.filter(function (fig) { return fig === 'K'; }).length !== 1) {
        return {valid: false, code: 3, message: 'There must be one and only one white king'}
    }
    if (checksTo(fen, turn === 'w' ? 'b' : 'w').length > 0) {
        return {valid: false, code: 1, message: ("The " + (turn === 'b' ? 'white' : 'black') + " side is in check, while it's not its turn to move")}
    }
    return {valid: true, code: 0, message: 'OK'}
};

var tryMove = function (fen, sqFrom, sqTo, promotion) {
    if ( promotion === void 0 ) promotion = 'Q';

    if (!fen || fen.constructor.name !== 'String') { return false }
    if (!canMove(fen, sqFrom, sqTo)) { return false }
    var ref = fen2obj(fen);
    var fenArray = ref.fenArray;
    var turn = ref.turn;
    var castling = ref.castling;
    var enPassant = ref.enPassant;
    var halfMoveClock = ref.halfMoveClock;
    var fullMoveNumber = ref.fullMoveNumber;
    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    var ref$1 = [fenArray[sqFrom], fenArray[sqTo]];
    var figFrom = ref$1[0];
    var figTo = ref$1[1];
    var newArray = [].concat( fenArray );

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

    if (sqFrom === 4) { castling = castling.replace('K', '').replace('Q', ''); }
    if (sqFrom === 60) { castling = castling.replace('k', '').replace('q', ''); }

    if (sqFrom === 7) { castling = castling.replace('K', ''); }
    if (sqFrom === 0) { castling = castling.replace('Q', ''); }

    if (sqFrom === 63) { castling = castling.replace('k', ''); }
    if (sqFrom === 56) { castling = castling.replace('q', ''); }

    if (castling === '') { castling = '-'; }

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

    return (fenString + " " + turn + " " + castling + " " + enPassant + " " + halfMoveClock + " " + fullMoveNumber)
};

var stripSan = function (san) { return san.replace(/[+#=x\!\?]/g, ''); };

var san2args = function (fen, san) {
    var fenobj = fen2obj(fen);
    
    san = stripSan(san);
    if (san === '0-0' || san === 'O-O') {
        if (fenobj.turn === 'w') {
            return {sqFrom: 4, sqTo: 6, promotion: null}
        } else {
            return {sqFrom: 60, sqTo: 62, promotion: null}
        }
    }

    if (san === '0-0-0' || san === 'O-O-O') {
        if (fenobj.turn === 'w') {
            return {sqFrom: 4, sqTo: 2, promotion: null}
        } else {
            return {sqFrom: 60, sqTo: 58, promotion: null}
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
        sqFrom = army.find(function (n) { return col(n) === colOrig && canMove(fen, n, sqTo); });
        if (typeof sqFrom === 'undefined') { sqFrom = -1; }

        if (/[QNRBqnrb]/.test(san[san.length - 1])) {
            promotion = san[san.length - 1];
        } else {
            promotion = null;
        }
        return {sqFrom: sqFrom, sqTo: sqTo, promotion: promotion}
    } else if (isWhiteFigure(san[0]) && san[0] !== 'P') {
        promotion = null;
        var fig = san[0];
        switch (fig) {
            case 'N':
                army = fenobj.turn === 'w' ? wKnights(fen) : bKnights(fen);
                break
            case 'B':
                army = fenobj.turn === 'w' ? wBishops(fen) : bBishops(fen);
                break
            case 'R':
                army = fenobj.turn === 'w' ? wRooks(fen) : bRooks(fen);
                break
            case 'Q':
                army = fenobj.turn === 'w' ? wQueens(fen) : bQueens(fen);
                break
            case 'K':
                army = fenobj.turn === 'w' ? wKings(fen) : bKings(fen);
                break
            }
        sqTo = san2sq(san.slice(san.length - 2, san.length));
        if (san.length === 5) {
            //console.log('san length 5')
            sqFrom = san2sq(san.slice(1, 3));
        } else if (san.length === 4) {
          // console.log('san length 4')
          var extraInfo = san[1];
          var ref = /[1-8]/.test(extraInfo) ? 
                                          [row, parseInt(extraInfo) - 1] : 
                                          [col, letter2col(extraInfo)];
          var rowOrColFunc = ref[0];
          var geoInfo = ref[1];
          sqFrom = army.find(function (n) { return rowOrColFunc(n) === geoInfo && canMove(fen, n, sqTo); }); 
          if (typeof sqFrom === 'undefined') { sqFrom = -1; }
        } else {
            var candids = army.filter(function (n) { return canMove(fen, n, sqTo); });
            switch (candids.length) {
                case 0:
                    //console.log('0 candidates')
                    sqFrom = -1;
                    break
                case 1:
                    //console.log('1 candidato: ' + candids[0])
                    sqFrom = candids[0];
                    break
                default:
                    var reals = candids.filter(function (sq) {
                        var newfen = tryMove(fen, sq, sqTo, null);
                        return newfen && validateFen(newfen).valid
                    });
                    // console.log("Hay " + reals.length + " jugada/s para elegir")
                    //console.log('Reals: ' + JSON.stringify(reals))
                    sqFrom  = reals.length === 1 ? reals[0] : -1;              
            } 
        }
        return {sqFrom: sqFrom, sqTo: sqTo, promotion: promotion}
    } else {
        //console.log('Llegamos al final sin saber que pasó')
        return {sqFrom: -1, sqTo: -1, promotion: null}
    }
};

var args2san = function (fen, sqFrom, sqTo, promotion) {
    var ref = fen2obj(fen);
    var fenArray = ref.fenArray;
    var turn = ref.turn;
    var enPassant = ref.enPassant;
    sqFrom = sqNumber(sqFrom);
    sqTo = sqNumber(sqTo);
    var ref$1 = [fenArray[sqFrom], fenArray[sqTo]];
    var figFrom = ref$1[0];
    var figTo = ref$1[1];
    if (isEmptyFigure(figFrom)) { return null }

    var figure, extrainfo, capture, destiny, promotionFigure, check;

    var newfen = tryMove(fen, sqFrom, sqTo, promotion);
    if (!(newfen && validateFen(newfen).valid)) { return null }

    if (isCheckMate(newfen)) {
        check = '#';
    } else if (isCheck(newfen)) {
        check = '+';
    } else {
        check = '';
    }

    if (figFrom === 'K' && sqFrom === 4) {
        if (sqTo === 6) { return ("O-O" + check) }
        if (sqTo === 2) { return ("O-O-O" + check) }
    }

    if (figFrom === 'k' && sqFrom === 60) {
        if (sqTo === 62) { return ("O-O" + check) }
        if (sqTo === 58) { return ("O-O-O" + check) }
    }
    
    
    capture = !isEmptyFigure(figTo) ? 'x' : 
              /[Pp]/.test(figFrom) && sqNumber(enPassant) === sqTo ? 'x' : '';
    destiny = sq2san(sqTo);

    if (/[Pp]/.test(figFrom)) {
        figure =  isSameCol(sqFrom, sqTo) ?  '' : col2letter(col(sqFrom));
        extrainfo = '';
        if ((row(sqTo) === 7 && figFrom === 'P') || 
           (row(sqTo) === 0 && figFrom === 'p')) {
            promotionFigure = "=" + (promotion ? promotion.toUpperCase() : 'Q');
        } else {
            promotionFigure = '';
        }
    } else {
        figure = figFrom.toUpperCase();
        promotionFigure = '';
        var attacks = attacksOnSq(fen, sqTo, turn);
        var fig_from_attacks = attacks.filter( function (sq) { return fenArray[sq] === figFrom && sq !== sqFrom; });
        if (fig_from_attacks.length === 0) {
            extrainfo = '';
        } else {
            var valids = fig_from_attacks.filter(function (sq) {
                var otherfen = tryMove(fen, sq, sqTo, null);
                return otherfen && validateFen(otherfen).valid
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
    
    return ("" + figure + extrainfo + capture + destiny + promotionFigure + check)
};

var makeFenComparable = function (fen) { return fen.split(/\s+/).slice(0, 4).join(' '); };

var clear = function (fen) {
    var obj = fen2obj(fen);
    obj.fenArray = range(0, 63).fill('0');
    obj.fenString = array2fenString(obj.fenArray);
    return obj2fen(obj)
};

var insuficientMaterial = function (fen, color) {
    if ( color === void 0 ) color = 'w';

    if (!/^[wb]$/i.test(color)) { return null }
    var ref = color.toLowerCase() === 'w' ? 
               [wPawns(fen), wKnights(fen), wBishopsD(fen), wBishopsL(fen), wRooks(fen),
                wQueens(fen), bPawns(fen), bKnights(fen), bBishopsD(fen), bBishopsL(fen),
                bRooks(fen), bQueens(fen) 
               ] :
               [bPawns(fen), bKnights(fen), bBishopsD(fen), bBishopsL(fen), bRooks(fen),
                bQueens(fen), wPawns(fen), wKnights(fen), wBishopsD(fen), wBishopsL(fen),
                wRooks(fen), wQueens(fen) 
               ];
    var frPawns = ref[0];
    var frKnights = ref[1];
    var frBishopsD = ref[2];
    var frBishopsL = ref[3];
    var frRooks = ref[4];
    var frQueens = ref[5];
    var foePawns = ref[6];
    var foeKnights = ref[7];
    var foeBishopsD = ref[8];
    var foeBishopsL = ref[9];
    var foeRooks = ref[10];
    
    if (frPawns.length || frRooks.length || frQueens.length) { return false } // Mate de torre, dama o pieza coronada

    if (frBishopsD.length && frBishopsL.length) { return false } // Mate de 2 alfiles

    if ((frBishopsD.length || frBishopsL.length)  && frKnights.length) { return false } // Mate de 2 alfil y caballo

    if (frKnights.length > 1) { return false } // Mate de 2 o más caballos

    /* Mates con material que por si mismo es insuficiente, 
       pero es "ayudado" por una pieza enemiga que ahoga */
    if (frBishopsD.length) {
        if (foePawns.length || foeKnights.length || foeBishopsL.length) { return false }
    } else if (frBishopsL.length) {
        if (foePawns.length || foeKnights.length || foeBishopsD.length) { return false }
    } else if (frKnights.length) {
        if (foePawns.length || foeKnights.length || 
            foeBishopsD.length || foeBishopsL.length ||
            foeRooks.length) { return false }
    }
    /* Fin Mates con material que por si mismo es insuficiente, 
       pero es "ayudado" por una pieza enemiga que ahoga */
    
    return true
};

var pgnDate = function (d) { return ((d.getFullYear()) + "." + (lpad(d.getMonth() + 1)) + "." + (lpad(d.getDate()))); };

var Chess = function Chess(fen) {
      if ( fen === void 0 ) fen = defaultFen;

      return this.reset(fen)
  };

var prototypeAccessors = { title: { configurable: true },version: { configurable: true },turn: { configurable: true },castling: { configurable: true },enPassant: { configurable: true },halfMoveClock: { configurable: true },fullMoveNumber: { configurable: true },in_fifty_moves_rule: { configurable: true },in_threefold_repetition: { configurable: true },insufficient_material: { configurable: true },in_draw: { configurable: true },isCheck: { configurable: true },isCheckMate: { configurable: true },isStaleMate: { configurable: true },fen: { configurable: true },position: { configurable: true },positions: { configurable: true },game_over: { configurable: true } };
    
  Chess.version = function version () {return new Chess().version };

  Chess.utils = function utils () {return utility_funcs};

  Chess.defaultFen = function defaultFen$1 () {return defaultFen};

  Chess.sevenTags = function sevenTags () {
      return ['Event', 'Site', 'Date', 'Round', 'White', 'Black', 'Result']
  };

  Chess.results = function results () { return ["*", "1-0", "0-1", "1/2-1/2"]};
  Chess.result_names = function result_names () { return ["undefined", "white", "black", "draw"]};

  Chess.getUndefinedString = function getUndefinedString () {return Chess.results()[Chess.result_names().findIndex(function (v) { return v === 'undefined'; })]};
  Chess.getWhiteWinString = function getWhiteWinString () {return Chess.results()[Chess.result_names().findIndex(function (v) { return v === 'white'; })]};
  Chess.getBlackWinString = function getBlackWinString () {return Chess.results()[Chess.result_names().findIndex(function (v) { return v === 'black'; })]};
  Chess.getDrawString = function getDrawString () {return Chess.results()[Chess.result_names().findIndex(function (v) { return v === 'draw'; })]};

  Chess.getResultString = function getResultString (game) {
      if (!game.game_over) {
          return Chess.getUndefinedString()
      } else if (game.in_draw){
          return Chess.getDrawString()
      } else if (game.isCheckMate) {
          if (game.turn === 'w') {
              return Chess.getBlackWinString()
          } else {
              return Chess.getWhiteWinString()
          }
      } else {
          return Chess.getUndefinedString()
      }
  };

  Chess.prototype.reset = function reset (fen) {
        if ( fen === void 0 ) fen = defaultFen;

      var v = validateFen(fen);
      if (!v.valid) { throw new Error(v.message) }
      this.__fens__ = [fen];
      this.__sans__ = [''];
      this.__headers__ = {
          Event: 'Internet Game',
          Site: 'The Cloud, INTERNET',
          Date: pgnDate(new Date()),
          Round: '?',
          White: 'White Player',
          Black: 'Black Player',
          Result: Chess.getResultString(this)
      };
      if (fen !== defaultFen) {
          this.headers('FEN', fen, 'SetUp', '1');
      }
      return this
  };

  Chess.prototype.load = function load (fen) {
      if (!validateFen(fen).valid) { return null }
      this.__fens__ = [fen];
      this.__sans__ = [''];
      this.headers('Result', Chess.getResultString(this), 'FEN', fen, 'SetUp', '1');
      delete this.__headers__.PlyCount;
      return this
  };

  Chess.prototype.mini_ascii = function mini_ascii (fennum, flipped, sep) {
        if ( flipped === void 0 ) flipped = false;
        if ( sep === void 0 ) sep = '\n';

      fennum = fennum || this.fens().length - 1;
      return partition(fen2obj(this.fens()[fennum]).fenArray
          .map(function (_, i, self) { return self[i ^ (flipped ? 7 : 56)]; })
          .map(function (v) { return v === '0' ? '.' : v; }), 8)
          .map(function (a) { return a.join(' '); })
          .join(sep)
  };

  Chess.prototype.ascii = function ascii (fennum , flipped, sep) {
        if ( flipped === void 0 ) flipped = false;
        if ( sep === void 0 ) sep = '\n';

      var separ = "   +" + ('---+'.repeat(8)) + sep;
      //const empty = ` ${'| '.repeat(8)}|${sep}`
      var empty = '';
      fennum = fennum || this.fens().length - 1;
      var ref = fen2obj(this.fens()[fennum]);
        var fenArray = ref.fenArray;
      var rows = (flipped ? range(0, 7) : range(7, 0, -1)).map(function (n) { return (n + 1).toString(); });
      var cols = (flipped ? range(7, 0, -1) : range(0, 7)).map(function (n) { return String.fromCharCode(n + 97); });
      var bottomLine = cols.reduce(function (base, el) { return base + '  ' + el + ' '; }, '   ') + " " + sep;
      var showArray = fenArray.map(function (_, i, self) { return self[i ^ (flipped ? 7 : 56)]; }).map(function (v) { return v === '0' ? ' ' : v; });
      var partArray = partition(showArray, 8);
      var asciiArray = partArray.map(function (subArr, i) { return subArr.reduce(function (base, el) { return base + '| ' + el + ' '; }, empty + " " + (rows[i]) + " ") + "|" + sep + empty + separ; });

      return ("" + separ + (asciiArray.join('')) + bottomLine)
  };

  Chess.prototype.console_view = function console_view (fennum, flipped) {
        if ( flipped === void 0 ) flipped = false;

      fennum = fennum || this.fens().length - 1;
      console.log(this.ascii(fennum, flipped));
  };

  Chess.prototype.clear = function clear$1 () {
      this.__fens__ = this.__fens__.slice(0, -1).concat( [clear(this.__fens__[this.__fens__.length -1])]);
      return this
  };

  Chess.prototype.san_with_number = function san_with_number (number, all) {
        if ( all === void 0 ) all = false;

      if (number < 1 || number > (this.__sans__.length - 1)) { return '' }
      var ref = fen2obj(this.fens()[number - 1]);
        var turn = ref.turn;
        var fullMoveNumber = ref.fullMoveNumber;
      var prefix;
      if (turn === 'w') {
          prefix = fullMoveNumber + ". ";
      } else {
          prefix = all ? (fullMoveNumber + ". ... ") : '';
      }
      var san = this.history()[number - 1];

      return ("" + prefix + san)
  };

  Chess.prototype.numbered_history = function numbered_history (all) {
        var this$1 = this;
        if ( all === void 0 ) all = false;

      if (this.getTurn(0) === 'w') {
          //console.log('Returning history started with white')
          return this.history().map(function (_, i) { return this$1.san_with_number(i + 1, all); })
      } else {
          //console.log('Returning history started with black')
          return [this.san_with_number(1, true)].concat(this.history().slice(1).map(function (_, i) { return this$1.san_with_number(i + 2, all); }))
      }
  }; 

  Chess.prototype.pgn_moves = function pgn_moves (sep, line_break){
        if ( sep === void 0 ) sep = '\n';
        if ( line_break === void 0 ) line_break = 16;

      return partition(this.numbered_history(), line_break)
      .map(function (a) { return a.join(' '); }).join(sep) +
      ' ' + this.headers('Result') + sep
  };

  Chess.prototype.pgn_headers = function pgn_headers (sep) {
        var this$1 = this;
        if ( sep === void 0 ) sep = '\n';

      var seven_tags = Chess.sevenTags();
      var seven_lines = seven_tags.map( function (tag) { return ("[" + tag + " \"" + (this$1.headers(tag)) + "\"]"); });
      var others = []; 
      var loop = function ( key ) {
          if (typeof seven_tags.find(function (tag) { return tag === key; }) === 'undefined') {
              others = others.concat( [key]);
          }
      };

        for (var key in this$1.headers()) loop( key );
      var other_lines = others.map( function (tag) { return ("[" + tag + " \"" + (this$1.headers(tag)) + "\"]"); }).sort();
      return seven_lines.join(sep) + sep + other_lines.join(sep) + sep + sep
  };

  Chess.prototype.pgn = function pgn (sep, line_break) {
        if ( sep === void 0 ) sep = '\n';
        if ( line_break === void 0 ) line_break = 16;

      return ("" + (this.pgn_headers(sep)) + (this.pgn_moves(sep, line_break)))
  };

  Chess.prototype.load_pgn = function load_pgn (pgn, headers_only) {
        if ( headers_only === void 0 ) headers_only = false;

      if (pgn.length < 5) { return false }
      var strip_nums = function (text) { return text.replace(/\d+\.\s*(\.\.\.)?\s*/g, ''); };
      var is_san = function (text) { return sanRegExp.test(text); };
      var is_result = function (text) { return !!Chess.results().find(function (r) { return r === text; }); };

      var states = [
          'SCANNING',
          'LABEL',
          'VALUE',
          'TOKEN',
          'COMMENT',
          'VARIANT'
      ];

      var state = 'SCANNING';
      var prevState = state;
      var label = '';
      var value = '';
      var token = '';
      var current = '';
      var header_result = null;
      var index = 0;

      pgn = strip_nums(pgn).replace(/\r/g, '\n');
      var game = new Chess();

      do {
          current = pgn[index++];

          switch (state) {
             case states[0]: //'SCANNING' 
               if ('[' === current) {
                   state = 'LABEL';
               } else if ('{' === current) {
                   prevState = state;
                   state = 'COMMENT';
               } else if ('(' === current) {
                  prevState = state;
                  state = 'VARIANT';
               } else if (current.match(/[\s\]]/)) {
                  continue
               } else {
                   if (headers_only) {
                      this.__headers__ = game.__headers__;
                      this.__fens__ = [game.__fens__[0]];
                      this.__sans__ = [''];
                      return true
                   }
                   prevState = state;
                   state = 'TOKEN';
                   token = current;
               }
               continue
             case states[1]: //'LABEL' 
               if ('"' === current) {
                   state = 'VALUE';
               } else {
                  label += current;
               }
               continue
             case states[2]: //'VALUE' 
               if (/[\"\]]/.test(current)) {
                  game.headers(capitalize(label.trim()), value);
                  if (label.trim().toLowerCase() === 'fen') {
                      if (!game.load(value)) {
                          return false
                      }
                      game.headers('SetUp', '1');
                  }
                  if (label.trim().toLowerCase() === 'result') {
                      header_result = value;
                  }
                  label = '';
                  value = '';
                  state = 'SCANNING';
               } else {
                   value += current;
               }
               continue
             case states[3]: //'TOKEN' 
               if ('{' === current) {
                   prevState = state;
                   state = 'COMMENT';
               } else if ('(' === current) {
                   prevState = state;
                   state = 'VARIANT';
               } else if (current.match(/[\s\[]/)) {
                   if (is_result(token)) {
                       game.headers('Result', token);
                   }
                   if (is_result(token) || current === '[') {
                      if (is_result(token)) { 
                          game.headers('Result', token); 
                      } else if (header_result) {
                          game.headers('Result', header_result);
                      }
                      this.__headers__ = game.__headers__;
                      this.__fens__ = game.__fens__;
                      this.__sans__ = game.__sans__;
                      return true
                   }
                   if (is_san(token)) {
                       var result = game.move(token);
                       if (!result) {
                           return false
                       }
                       token = '';
                       prevState = 'TOKEN';
                       state = 'SCANNING';
                   }
               } else {
                   token += current;
               }
               continue
             case states[4]: //'COMMENT' 
               if ('}' === current) {
                  state = prevState;
               }
               continue
             case states[5]: //'VARIANT' 
               if (')' === current) {
                  state = prevState;
               }
               continue
             default:
               continue
          }

      } while (index < pgn.length)

      if (header_result) {
          game.headers('Result', header_result);
      }
      this.__headers__ = game.__headers__;
      this.__fens__ = game.__fens__;
      this.__sans__ = game.__sans__;
      return true
  };

  Chess.prototype.move = function move () {
        var moveArgs = [], len = arguments.length;
        while ( len-- ) moveArgs[ len ] = arguments[ len ];

      var fenObj = fen2obj(this.fen); 
      var sqFrom, sqTo, promotion;
      switch (moveArgs.length) {
          case 0:
              return false
          case 1:
              if (sanRegExp.test(moveArgs[0])) {
                  var result = san2args(this.fen, moveArgs[0]);
                  sqFrom = result.sqFrom;
                  sqTo = result.sqTo;
                  promotion = result.promotion;
              } else if (/[a-h][1-8]-?[a-h][1-8][QRNBqrnb]?/.test(moveArgs[0])) {
                  if (moveArgs[0][moveArgs[0].length - 1].match(/QRNB/i)) {
                      promotion = moveArgs[0][moveArgs[0].length - 1].toUpperCase();
                  } else {
                      promotion = null;
                  }
                  var moveStr = moveArgs[0].replace(/-/g, '');
                  sqFrom = sqNumber(moveStr.slice(0,2));
                  sqTo = sqNumber(moveStr.slice(2,4));
              }
              break
          default:
              sqFrom = sqNumber(moveArgs[0]);
              sqTo = sqNumber(moveArgs[1]);
              promotion = moveArgs[2];
      }

      if ((isWhiteFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'b') || 
         (isBlackFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'w')) { return false }

      var newFen = tryMove(this.fen, sqFrom, sqTo, promotion);
      if (!newFen) { return false }
      if (!validateFen(newFen).valid) { return false }
      var san = args2san(this.fen, sqFrom, sqTo, promotion);
      var fenArray = fenObj.fenArray;
        var turn = fenObj.turn;
        var enPassant = fenObj.enPassant;
      var ref = [fenArray[sqFrom], fenArray[sqTo]];
        var figFrom = ref[0];
        var figTo = ref[1];
      var newSanObj = {san: san, 
                       piece: figFrom, 
                       color: turn, 
                       from: sq2san(sqFrom), 
                       to: sq2san(sqTo)};
//      if (!isEmptyFigure(figTo)) newSanObj = {...newSanObj, captured: figTo}
      if (!isEmptyFigure(figTo)) { newSanObj = Object.assign(newSanObj, {captured: figTo}); }
      var isEnPassant = /[Pp]/.test(figFrom) && sqTo === san2sq(enPassant);
      var isBigPawn = /[Pp]/.test(figFrom) && difRow(sqFrom, sqTo) === 2;
      var isPromotion = (figFrom === 'p' && row(sqTo) === 0) ||
                          (figFrom === 'P' && row(sqTo) === 7);
//      if (isPromotion) newSanObj = {...newSanObj, promotion: promotion ? 
//                                    promotion.toUpperCase() : 'Q'}
      if (isPromotion) { newSanObj = Object.assign(newSanObj, 
          {promotion: promotion ? promotion.toUpperCase() : 'Q'}); }
      var flags = '';
      if ((figFrom === 'K' && sqFrom === 4 && sqTo === 6) || (figFrom === 'k' && sqFrom === 60 && sqTo === 62)) {
          flags += 'k';
      } else if ((figFrom === 'K' && sqFrom === 4 && sqTo === 2) || (figFrom === 'k' && sqFrom === 60 && sqTo === 58)) {
          flags += 'q';
      }
      if (isPromotion) {
          flags += 'p';
      } else if (isBigPawn) {
          flags += 'b';
      }
      flags += isEnPassant ? 'e' : newSanObj.captured ? 'c' : 'n';
        
//      this.__sans__ = [...this.__sans__, {...newSanObj, flags}]
      this.__sans__ = ( this.__sans__ ).concat( [Object.assign(newSanObj, {flags: flags})]);
      this.__fens__ = ( this.__fens__ ).concat( [newFen]);
      this.headers('PlyCount', this.history().length.toString(), 'Result', Chess.getResultString(this));

      // setTimeout(() => {
      // }, 0)

      return this
  };

  Chess.prototype.history = function history (options) {
      return (options && options.verbose) ? 
          this.__sans__.slice(1) :
          this.__sans__.slice(1).map(function (obj) { return obj.san; })
  };

  Chess.prototype.moves = function moves (from) {
        var this$1 = this;
        if ( from === void 0 ) from = null;

      return from ? 
          availableMoves(this.fen).filter(function (it) { return it.from === sqNumber(from); })
          .map(function (it) { return args2san(this$1.fen, it.from, it.to, 'Q'); })
          :
          availableMoves(this.fen).map(function (it) { return args2san(this$1.fen, it.from, it.to, 'Q'); }) 
  };
    
  Chess.prototype.headers = function headers () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      if (!args.length) { return this.__headers__ }
      if (args.length === 1) { return this.__headers__[capitalize(args[0])] || 'Header not set' }
      var evenargs = args.length % 2 === 0 ? args : args.slice(0, -1);
      for (var x = 0; x < evenargs.length; x += 2) {
          this.__headers__[capitalize(evenargs[x])] = evenargs[x + 1];
      }
      return this.__headers__
  };

  Chess.prototype.in_check = function in_check () {return this.isCheck};
    
  Chess.prototype.in_checkmate = function in_checkmate () {return this.isCheckMate};

  Chess.prototype.in_stalemate = function in_stalemate () {return this.isStaleMate};

  prototypeAccessors.title.get = function () {
      return ((this.headers('White')) + " - " + (this.headers('Black')) + "   /   " + (this.headers('Result')))
  };

  prototypeAccessors.version.get = function (){
    return '0.16.0'
  };

  Chess.prototype.__getField = function __getField (fieldName, n) {
        if ( fieldName === void 0 ) fieldName = 'turn';
        if ( n === void 0 ) n = this.history().length;

      var fields = ['turn', 'castling', 'enPassant', 'fullMoveNumber', 'halfMoveClock'];
      if (!fields.find(function (f) { return f === fieldName; })) { return null }
      if (n < 0) { n = 0; }
      if (n > this.history().length) { n = this.history.length; }
      return fen2obj(this.fens()[n])[fieldName]
  };

  Chess.prototype.getTurn = function getTurn (n) {
         if ( n === void 0 ) n = this.history().length;

       return this.__getField('turn', n)
  };
  prototypeAccessors.turn.get = function () {return this.getTurn()};

  Chess.prototype.getCastling = function getCastling (n) {
         if ( n === void 0 ) n = this.history().length;

       return this.__getField('castling', n)
  };
  prototypeAccessors.castling.get = function () {return this.getCastling()};
    
  Chess.prototype.getEnPassant = function getEnPassant (n) {
        if ( n === void 0 ) n = this.history().length;

      return this.__getField('enPassant', n)
 };
 prototypeAccessors.enPassant.get = function () {return this.getEnPassant()};

 Chess.prototype.getHalfMoveClock = function getHalfMoveClock (n) {
    if ( n === void 0 ) n = this.history().length;

  return this.__getField('halfMoveClock', n)
 };
 prototypeAccessors.halfMoveClock.get = function () {return this.getHalfMoveClock()};

  Chess.prototype.getFullMoveNumber = function getFullMoveNumber (n) {
         if ( n === void 0 ) n = this.history().length;

       return this.__getField('fullMoveNumber', n)
  };
  prototypeAccessors.fullMoveNumber.get = function () {return this.getFullMoveNumber()};

  prototypeAccessors.in_fifty_moves_rule.get = function () {
      return parseInt(fen2obj(this.fen).halfMoveClock) >= 100
  };

  prototypeAccessors.in_threefold_repetition.get = function () {
      var current = makeFenComparable(this.fen);
      var groups = groupArray(this.fens().map(makeFenComparable));
      return groups[current] >= 3
  };

  prototypeAccessors.insufficient_material.get = function () {
      return insuficientMaterial(this.fen, 'w') && insuficientMaterial(this.fen, 'b')
  };

  prototypeAccessors.in_draw.get = function () {
      return this.in_fifty_moves_rule || this.in_threefold_repetition ||
             this.insufficient_material || this.isStaleMate
  };

  prototypeAccessors.isCheck.get = function () {
      return isCheck(this.fen)
  };

  prototypeAccessors.isCheckMate.get = function () {
      return isCheckMate(this.fen)
  };
    
  prototypeAccessors.isStaleMate.get = function () {
      return isStaleMate(this.fen)
  };
    
  prototypeAccessors.fen.get = function () {
      return this.__fens__[this.__fens__.length -1]
  };

  prototypeAccessors.fen.set = function (newFen) {
        if ( newFen === void 0 ) newFen =Chess.defaultFen();

      this.__fens__[this.__fens__.length -1] = newFen;
  };

  prototypeAccessors.position.get = function () {
      return fen2obj(this.fen).fenArray
  };
    
  prototypeAccessors.positions.get = function () {
	return this.__fens__.map(function (fen) { return fen2obj(fen).fenArray; })
  };
    
  prototypeAccessors.isCheck.get = function () {
      return isCheck(this.fen)
  };

  prototypeAccessors.isCheckMate.get = function () {
      return isCheckMate(this.fen)
  };

  prototypeAccessors.isStaleMate.get = function () {
      return isStaleMate(this.fen)
  };

  prototypeAccessors.game_over.get = function () {
      return this.in_draw || this.isCheckMate
  };

  Chess.prototype.get = function get (sq) {
      return fen2obj(this.fen).fenArray[sqNumber(sq)]
  };

  Chess.prototype.put = function put (sq, figure) {
      if (!/[0pnbrqkPNBRQK]/.test(figure)) { return null }
      sq = sqNumber(sq);
      var obj = fen2obj(this.fen);
      obj.fenArray[sq] = figure;
      obj.fenString = array2fenString(obj.fenArray);
      var newFen = obj2fen(obj);
      this.__fens__ = this.__fens__.slice(0, -1).concat( [newFen]);
      return this
  };

  Chess.prototype.remove = function remove (sq) {
      var figure = this.get(sq);
      this.put(sq, '0');
      return figure
  };

  Chess.validate_fen = function validate_fen (fen) {
      return validateFen(fen)
  };

  Chess.square_color = function square_color (sq) {
      return isLightSquare(sqNumber(sq)) ? 'light' : 'dark'
  };

  Chess.normalize_pgn = function normalize_pgn (pgn_str) {
      return pgn_str.replace(/\r/g, '')
      //.replace(/\n{3,}/g, '\n\n')
      //.replace(/(\])\s*\n{2,}\s*(\[)/g,"$1\n$2")
      //.replace(/([a-h1-8NBRQK0O\+\#\!\?])\s*\n{2,}\s*([a-h1-8NBRQK0O\+\#\!\?])/g,"$1\n$2")
  };

  Chess.load_pgn_file = function load_pgn_file (file_str, headers_only) {
        if ( headers_only === void 0 ) headers_only = false;

      var halves = Chess.normalize_pgn(file_str).split(/\n{2,}/g).filter(function (l) { return l.length; });
      var retArr = partition(halves, 2).map(function (d) { return d.join('\n\n'); });
      return retArr.map(function (pgn) {
          if (pgn.length < 10) { return null } 
          var g = new Chess;
          g.load_pgn(pgn, headers_only);
          return g
      })
  };

  Chess.chunk_pgn_file = function chunk_pgn_file (file_str, chunk_size) {
        if ( chunk_size === void 0 ) chunk_size = 50;

      var games = Chess.load_pgn_file(file_str)
      .map(function (g) { return g.pgn(); });
      return partition(games, chunk_size)
      .map(function (gs) { return gs.join('\n\n'); })
  };

  Chess.prototype.fens = function fens () { return this.__fens__};

  Chess.prototype.undo = function undo () {
      if (this.__fens__.length < 2) { return false }
      this.__fens__.splice(this.__fens__.length - 1, this.__fens__.length);
      this.__sans__.splice(this.__sans__.length - 1, this.__sans__.length);
      this.headers('PlyCount', this.history().length.toString(), 'Result', Chess.getResultString(this));
      return this
  };

  Chess.prototype.toString = function toString () {
      return this.fen
  };

  Chess.prototype.reload_history = function reload_history () {
        var this$1 = this;

      var history_backup = this.history({verbose: true});
      // const fens_backup = this.__fens__
      // const result_backup = this.headers('Result')

      //this.__sans__ = [this.__sans__[0]]
      this.__fens__ = [this.__fens__[0]];
        
      history_backup.forEach(function (obj) {
          // this.move(obj.san)
          var ref = san2args(this$1.fen, obj.san);
            var sqFrom = ref.sqFrom;
            var sqTo = ref.sqTo;
            var promotion = ref.promotion;
          var newfen = tryMove(this$1.fen, sqFrom, sqTo, promotion);
          if (newfen) {
              this$1.__fens__ = ( this$1.__fens__ ).concat( [newfen]);
          }
      });
        
      //this.headers('Result', result_backup)
      return true
  };

  Chess.prototype.load_json = function load_json (json) {
      this.__sans__ = ['' ].concat( json.moves.map(function (s) { return ({san: s}); }));
      this.__headers__ = json.headers;
      this.__fens__ = [('FEN' in json.headers ? json.headers.FEN : Chess.defaultFen())];
      this.headers('Result', json.result);
      this.reload_history();
      return true
  };

  Chess.prototype.json = function json () {
      return {
          headers: this.__headers__,
          moves: this.history(),
          result: this.headers('Result')
      }
  };

  Chess.load_json_file = function load_json_file (json_arr) {
      return json_arr.map(function (obj) {
          var g = new Chess();
          g.load_json(obj);
          return g
      })
  };

Object.defineProperties( Chess.prototype, prototypeAccessors );

var utility_funcs = {
    lpad: lpad,
    rpad: rpad,
    capitalize: capitalize,
    groupArray: groupArray,
    makeSet: makeSet,
    range: range,
    partition: partition,
    chessboard: chessboard,

    sanRegExp: sanRegExp,
    pgnTagLineRegExp: pgnTagLineRegExp,

    defaultFen: defaultFen, 
    emptyFen: emptyFen,
    sicilianFen: sicilianFen,
    scandinavianFen: scandinavianFen,
    oddFrenchFen: oddFrenchFen,
    mateLocoFen: mateLocoFen,
    mateAyudadoFen: mateAyudadoFen,
    prePastorFen: prePastorFen,
    pastorFen: pastorFen,

    pgnDate: pgnDate,
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
    sqNumber: sqNumber,
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
    isPawnPromotion: isPawnPromotion,
    isCastling: isCastling,
    isKingMove: isKingMove,
    isBishopMove: isBishopMove,
    isRookMove: isRookMove,
    isQueenMove: isQueenMove,
    army: army,
    wBishops: wBishops,
    wBishopsD: wBishopsD,
    wBishopsD: wBishopsD,
    wKings: wKings,
    wKnights: wKnights,
    wPawns: wPawns,
    wQueens: wQueens,
    wRooks: wRooks,
    bBishops: bBishops,
    bBishopsD: bBishopsD,
    bBishopsL: bBishopsL,
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
    isStaleMate: isStaleMate   ,
    canKingMove: canKingMove,
    canMove: canMove,
    candidateMoves: candidateMoves,
    availableMoves: availableMoves,
    validateFen: validateFen,
    tryMove: tryMove,
    stripSan: stripSan, 
    args2san: args2san,
    san2args: san2args,
    clear: clear,
    insuficientMaterial: insuficientMaterial,
    Chess: Chess,
};

export default Chess;
