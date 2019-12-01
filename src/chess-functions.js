"use strict";

// const DEBUG = process && process.env && process.env.DEBUG

const DEBUG =  false

const lpad = (stri, padChar = '0', num = 2) => `${padChar.repeat(stri.toString().length >= num ? 0 : num - stri.toString().length)}${stri}`
const rpad = (stri, padChar = '0', num = 2) => `${stri}${padChar.repeat(stri.toString().length >= num ? 0 : num - stri.toString().length)}`

const capitalize = stri => `${stri[0].toUpperCase()}${stri.slice(1)}`

const partition = (arr, len) => arr.reduce((base, el) => 
    base[base.length -1].length < len ? [...base.slice(0, -1), [...base[base.length -1], el]] : 
                                        [...base, [el]] , [[]])

const groupArray = arr => {
    return arr.reduce((base, x) => {
        if (x in base) {
            base[x] += 1
        } else {
            base[x] = 1
        }
        return base
    }, {})
}

const makeSet = arr => arr.reduce((b, el) => b.find(el2 => el2 === el) ? b : [...b, el], [])

const range = (start = 0, end = 9, step = 1) => {
    if (start === end) {
        return [start]
    }

    if (!step) {
        if (start < end) {
            step = 1
        } else {
            step = -1
        }
    }

    if (start > end && step > 0) {
        return []
    }

    if (start < end && step < 0) {
        return []
    }

    return [start, ...range(start + step, end, step)]
}

const chessboard = range(0, 63)

const sanRegExp = /(?:(^0-0-0|^O-O-O)|(^0-0|^O-O)|(?:^([a-h])(?:([1-8])|(?:x([a-h][1-8])))(?:=?([NBRQ]))?)|(?:^([NBRQK])([a-h])?([1-8])?(x)?([a-h][1-8])))(?:(\+)|(#)|(\+\+))?$/
const pgnTagLineRegExp = /^\s*\[\s*(.+?)\s+"(.+?)"\s*\]\s*$/

const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const emptyFen = '8/8/8/8/8/8/8/8 w - - 0 1'
const sicilianFen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1'
const scandinavianFen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2'
const oddFrenchFen = 'rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3'
const mateLocoFen = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3'
const mateAyudadoFen = 'r1bqnNnr/pppkpp1p/7R/3p4/8/8/PPPPPPP1/RNBQKBN1 b Q - 0 6'
const prePastorFen = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4'
const pastorFen = 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4'
const preWCastlingFen = 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
const preBCastlingFen = 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4'
const simpleFen = '7k/7P/7K/8/8/8/8/8 w - - 0 1'
const simpleRookMate = 'R6k/6pp/8/8/3n4/8/8/7K b - - 0 1'
const simpleRookCheck = 'R6k/6pp/8/8/3r4/8/8/7K b - - 0 1'
const complexRookMate = 'R6k/6qp/5B2/8/8/8/8/7K b - - 0 1'
const testFen1 = '8/6B1/6p1/R6k/7p/8/8/K5R1 b KQkq - 0 1'
const testFen2 = '8/5BB1/6p1/R6k/7p/8/8/K5R1 b KQkq - 0 1'

const fen2obj = fen => {
    if (!fen || !(fen.constructor.name === 'String')) return null
    const arr = fen.split(/\s+/)
    return {
        fenString: arr[0],
        turn: arr[1],
        castling: arr[2],
        enPassant: arr[3],
        halfMoveClock: arr[4],
        fullMoveNumber: arr[5],
        fenArray: fen2array(arr[0])
    }
}

const obj2fen = fenObj => {
    delete fenObj.fenArray
    return `${fenObj.fenString} ${fenObj.turn} ${fenObj.castling} ${fenObj.enPassant} ${fenObj.halfMoveClock} ${fenObj.fullMoveNumber}`
}

const expandFen = fen => fen.replace(/\//g, '').replace(/[1-8]/g, d => ('0').repeat(parseInt(d)))

const compressFen = fen => fen.replace(/(.{8})(?!$)/g, "$1/").replace(/0+/g, z => z.length.toString())

const fen2array = fen => {
    if (/^(.+\/){7}.+$/.test(fen)) {
        fen = expandFen(fen)
    } else if (fen.length !== 64) {
        return []
    }
    return fen.split('').map((_, i, self) => self[i ^ 56])
}

const defaultFenArray = fen2array(fen2obj(defaultFen).fenString)

const array2fenString = arr => compressFen(arr.map((v, i) => arr[i ^56]).join(''))

const computedFenString = array2fenString(defaultFenArray)

const sq2san = sq => sq >= 0 && sq < 64 ? 
                     `${String.fromCharCode(97 + col(sq))}${String.fromCharCode(49 + row(sq))}` :
                     '-'

const san2sq = san => /[a-h][1-8]/.test(san) ? 
                      rowcol2sq(san.charCodeAt(1) -49, san.charCodeAt(0) - 97) :
                      -1

const sqNumber = sq => isNaN(sq) ? san2sq(sq) : parseInt(sq)

const row = sq => Math.floor(sqNumber(sq) / 8)

const col = sq => sqNumber(sq) % 8

const col2letter = c => String.fromCharCode(97 + c)

const letter2col = l => l.charCodeAt(0) - 97

const sq2rowcol = sq => ({row: row(sq), col: col(sq)})

const rowcol2sq = (r, c) => r * 8 + c

const isBlackFigure = fig => /[pnbrqk]/.test(fig)

const isWhiteFigure = fig => /[PNBRQK]/.test(fig)

const isEmptyFigure = fig => fig === '0'

const isDarkSquare = sq => {
    if (sq.constructor.name === 'String') {
        sq = san2sq(sq)
    }
    return (row(sq) % 2 === 0 && col(sq) % 2 === 0) || (row(sq) % 2 !== 0 && col(sq) % 2 !== 0)
}

const isLightSquare = sq => !isDarkSquare(sq)

const difRow = (sq1, sq2) => Math.abs(row(sq1) - row(sq2))

const difCol = (sq1, sq2) => Math.abs(col(sq1) - col(sq2))

const isSameRow = (sq1, sq2) => difRow(sq1, sq2) === 0

const isSameCol = (sq1, sq2) => difCol(sq1, sq2) === 0

const isDiagonal = (sq1, sq2) => difCol(sq1, sq2) === difRow(sq1, sq2)

const isAntiDiagonal = (sq1, sq2) => difCol(sq1, sq2) === difRow(sq1, sq2) && 
                                     Math.abs(sqNumber(sq1) - sqNumber(sq2)) % 7 === 0 &&
                                     sqNumber(sq1) !== 63 &&
                                     sqNumber(sq2) !== 63

const isKnightJump = (sq1, sq2) => (difCol(sq1, sq2) === 2  && difRow(sq1, sq2) === 1) ||
                                   (difCol(sq1, sq2) === 1  && difRow(sq1, sq2) === 2) 

const isKingReach = (sq1, sq2) => difCol(sq1, sq2) < 2 && difRow(sq1, sq2) < 2

const rowStep = 1
const colStep = 8
const diagStep = 9
const antiDiagStep = 7

const path = (sq1, sq2) => {
    let step
    if (sq1 === sq2) {
        return [sqNumber(sq1)]
    } else if (isSameCol(sq1, sq2)) {
        if (sqNumber(sq1) < sqNumber(sq2)) {
            step = colStep
        } else {
            step = -colStep
        }
    } else if (isSameRow(sq1, sq2)) {
        if (sqNumber(sq1) < sqNumber(sq2)) {
            step = rowStep
        } else {
            step = -rowStep
        }
    } else if (isAntiDiagonal(sq1, sq2)) {
        if (sqNumber(sq1) < sqNumber(sq2)) {
            step = antiDiagStep
        } else {
            step = -antiDiagStep
        }
    } else if (isDiagonal(sq1, sq2)) {
        if (sqNumber(sq1) < sqNumber(sq2)) {
            step = diagStep
        } else {
            step = -diagStep
        }
    } else if (isKnightJump(sq1, sq2)) {
        return [sqNumber(sq1), sqNumber(sq2)]
    } else {
        return []
    }
    return range(sqNumber(sq1), sqNumber(sq2), step)
}

const innerPath = pth => pth.slice(1, -1)

const isForward = (fig, sqFrom, sqTo) => isBlackFigure(fig) ? 
                  row(sqFrom) > row(sqTo) : 
                  row(sqFrom) < row(sqTo)

const arrayFromFen = fen => {
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
}

const kingSq = (fen, colour) => arrayFromFen(fen).findIndex( x => x === (/[a-z]/.test(colour) && colour !== 'w' ? 'k' : 'K'))

const isClearPath = (fen, pth) => {
    if  (pth.length < 3) {
        return true
    }

    const fenArr = arrayFromFen(fen)
    const iPath = innerPath(pth)

    for (let i in iPath) {
        if (fenArr[iPath[i]] !== '0') {
            return false
        }
    }

    return true
}

const isBishopMove = (sqFrom, sqTo) => isDiagonal(sqFrom, sqTo) && sqFrom !== sqTo

const isRookMove = (sqFrom, sqTo) => (isSameRow(sqFrom, sqTo) || isSameCol(sqFrom, sqTo)) && sqFrom !== sqTo

const isQueenMove = (sqFrom, sqTo) => (isBishopMove(sqFrom, sqTo) || isRookMove(sqFrom, sqTo)) && sqFrom !== sqTo

const isKingMove = (sqFrom, sqTo) => difRow(sqNumber(sqFrom), sqNumber(sqTo)) < 2 &&  
                                     difCol(sqNumber(sqFrom), sqNumber(sqTo)) < 2 &&
                                     sqFrom !== sqTo

const isPawnMove = (sqFrom, sqTo, colour = 'w') => {
    colour = colour.toLowerCase()
    if (!/[wb]/.test(colour)) {
        return false
    }
    const fig = colour === 'w' ? 'P' : 'p'
    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    if (!isForward(fig, sqFrom, sqTo)) {
        return 0
    }

    if (fig === 'P') {
        if (sqTo === (sqFrom + 8)) return 1
        if (sqTo === (sqFrom + 16) && row(sqFrom) === 1) return 2
        return 0
    } else {
        if (sqTo === (sqFrom - 8)) return 1
        if (sqTo === (sqFrom - 16) && row(sqFrom) === 6) return 2
        return 0
    }
}

const isPawnAttack = (sqFrom, sqTo, colour = 'w') => {
    colour = colour.toLowerCase()
    if (!/[wb]/.test(colour)) {
        return false
    }
    const fig = colour === 'w' ? 'P' : 'p'
    if (!isForward(fig, sqFrom, sqTo)) {
        return false
    }
    if (difCol(sqFrom, sqTo) !== 1) return false
    if (difRow(sqFrom, sqTo) !== 1) return false
    return true
}

const isPawnPromotion = (sqFrom, sqTo, colour = 'w') => {

    if (!isPawnAttack(sqFrom, sqTo, colour) && !isPawnMove(sqFrom, sqTo, colour)) {
        return false
    }
    
    colour = colour.toLowerCase()

    if (colour === 'w' && row(sqTo) === 7) return true
    if (colour === 'b' && row(sqTo) === 0) return true

    return false
}

const isCastling = (sqFrom, sqTo, colour = 'w') => {
    colour = colour.toLowerCase()
    if (!/[wb]/.test(colour)) {
        return false
    }
    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    if (colour === 'w') {
        return sqFrom === 4 && (sqTo === 2 || sqTo === 6)
    } else {
        return sqFrom === 60 && (sqTo === 58 || sqTo === 62)
    }
}

const army = (fen, fig) => {
    const fenArr = fen2array(fen)
    let ret = []
    for (let i in chessboard) {
        if (fenArr[chessboard[i]] === fig) {
            ret = [...ret, chessboard[i]]
        }
    }
    return ret
}

const bPawns = fen => army(fen, 'p')
const bKnights = fen => army(fen, 'n')
const bBishops = fen => army(fen, 'b')
const bBishopsL = fen => army(fen, 'b').filter(sq => isLightSquare(sq))
const bBishopsD = fen => army(fen, 'b').filter(sq => isDarkSquare(sq))
const bRooks = fen => army(fen, 'r')
const bQueens = fen => army(fen, 'q')
const bKings = fen => army(fen, 'k')

const wPawns = fen => army(fen, 'P')
const wKnights = fen => army(fen, 'N')
const wBishops = fen => army(fen, 'B')
const wBishopsL = fen => army(fen, 'B').filter(sq => isLightSquare(sq))
const wBishopsD = fen => army(fen, 'B').filter(sq => isDarkSquare(sq))
const wRooks = fen => army(fen, 'R')
const wQueens = fen => army(fen, 'Q')
const wKings = fen => army(fen, 'K')

const wArmy = fen => [
    ...wPawns(fen), 
    ...wKnights(fen), 
    ...wBishops(fen),
    ...wRooks(fen),
    ...wQueens(fen),
    ...wKings(fen),
]

const bArmy = fen => [
    ...bPawns(fen), 
    ...bKnights(fen), 
    ...bBishops(fen),
    ...bRooks(fen),
    ...bQueens(fen),
    ...bKings(fen),
]

const wAttackers = fen => [
    ...wKnights(fen), 
    ...wBishops(fen),
    ...wRooks(fen),
    ...wQueens(fen),
]

const bAttackers = fen => [
    ...bKnights(fen), 
    ...bBishops(fen),
    ...bRooks(fen),
    ...bQueens(fen),
]

const wAttacks = fen => wAttackers(fen).map(a => attacksFromSq(fen, a)).reduce((a1, a2) => a1.concat(a2), [])
const bAttacks = fen => bAttackers(fen).map(a => attacksFromSq(fen, a)).reduce((a1, a2) => a1.concat(a2), [])

const wPMoves = fen => wPawns(fen).map(p => chessboard.filter(n => canMove(fen, p, n)))
                       .reduce((a1, a2) => a1.concat(a2))   

const bPMoves = fen => bPawns(fen).map(p => chessboard.filter(n => canMove(fen, p, n)))
                       .reduce((a1, a2) => a1.concat(a2))   

const isFriend = (fig1, fig2) => (isBlackFigure(fig1) && isBlackFigure(fig2)) || (isWhiteFigure(fig1) && isWhiteFigure(fig2))
const isFoe = (fig1, fig2) => (isBlackFigure(fig1) && isWhiteFigure(fig2)) || (isWhiteFigure(fig1) && isBlackFigure(fig2))

const getFigure = (fen, sq) => arrayFromFen(fen)[sqNumber(sq)]

const getFigures = (fen, path) => path.map( n => {
    const obj = {}
    obj[n] = getFigure(fen, n)
    return obj
//}).reduce((el1, el2) => ({...el1, ...el2}), {})
}).reduce((el1, el2) => Object.assign(el1, el2), {})

const attacksFromSq = (fen, sq) => {
    const fenArr = arrayFromFen(fen)
    sq = sqNumber(sq)
    const fig = fenArr[sq]
    if (isEmptyFigure(fig)) return []
    let filterFunc

    switch (fig.toLowerCase()) {
        case 'n':
            filterFunc = isKnightJump
            break
        case 'b':
            filterFunc = isBishopMove
            break
        case 'r':
            filterFunc = isRookMove
            break
        case 'q':
            filterFunc = isQueenMove
            break
        case 'k':
            filterFunc = isKingMove
            break
        default: 
            // return fig === 'p' ? [sq - 7, sq - 9] : [sq + 7, sq + 9]
            if (fig === 'p') {
                if (col(sq) === 0) return [sq - 7]
                if (col(sq) === 7) return [sq - 9]
                return [sq - 7, sq - 9]
            } else if (fig === 'P') {
                if (col(sq) === 0) return [sq + 9]
                if (col(sq) === 7) return [sq + 7]
                return [sq + 7, sq + 9]
            } else {
                return []
            }
        }

        const candidatesArr = chessboard.filter( n => filterFunc(sq, n))

        return candidatesArr.filter(n => isClearPath(fenArr, path(sq, n)))
}

const attacksOnSq = (fen, sq, colour = 'w') => {
    colour = colour.toLowerCase()
    if (!/[wb]/.test(colour)) {
        return null
    }

    sq = sqNumber(sq)

    const army = colour === 'w' ? wArmy(fen) : bArmy(fen)
    // console.log("Army:\n", army)

    return army.filter(s => attacksFromSq(fen, s).some(s2 => s2 === sq))
}

const checksTo = (fen, colour = 'w') => {
    const foe = colour.toLowerCase() === 'w' ? 'b' : 'w'
    return attacksOnSq(fen, kingSq(fen, colour.toLowerCase()), foe)
}

const isCheck = fen => checksTo(fen, fen2obj(fen).turn).length > 0

const isCheckMate = fen => isCheck(fen) && availableMoves(fen).length === 0

const isStaleMate = fen => !isCheck(fen) && availableMoves(fen).length === 0

const isCheckMateOld = fen => {
    if (!isCheck(fen)) return false
    const { turn } = fen2obj(fen)
    const [friend, foe, kSq] = turn === 'w' ? ['w', 'b', kingSq(fen, 'w')] : ['b', 'w', kingSq(fen, 'b')]
    const cands = candidateMoves(fen)
    //console.log(`Candidates: ${JSON.stringify(cands)}`)
    const kingMoves = cands.find(it => it[0] === kSq)[1]
    if (kingMoves.length > 0) return false
    const checks = checksTo(fen, friend)
    if (checks.length > 1) return true
    const remaining = cands.filter(it => it[0] !== kSq)
    //console.log(`Remaining moves: ${JSON.stringify(remaining)}`)
    const  checkPath = path(checks[0], kSq).filter(n => n !== kSq)
    //console.log(`Check path: ${JSON.stringify(checkPath)}`)
    const filtered = remaining.filter( duo => duo[1].some(n => checkPath.find(pth => pth === n)))
    //console.log(`Filtered: ${JSON.stringify(filtered)}`)
    if (filtered.length > 0) {
        for (let pair of filtered) {
            const newPair = [pair[0], pair[1].filter(v => checkPath.find(n => n === v))]
            //console.log(`New Pair: ${JSON.stringify(newPair)}`)
            for (let i in pair[1]) {
                //console.log(`pair[0]: ${pair[0]} , v: ${v}`)
                const newFen = tryMove(fen, pair[0], pair[1][i], 'Q')
                //console.log(`newFen: ${newFen}`)
                if (newFen && validateFen(newFen).valid) return false
            }
        }
    }

    return true
}

const canKingMove = (fen, sqFrom, sqTo, king) => {
    if (king === 'k' || king === 'b') {
        king = 'k'
    } else if (king === 'K' || king === 'w') {
        king = 'K'
    }
    
    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    
    const {castling, turn, fenArray} = fen2obj(fen)
    const friend = king === 'k' ? 'b' : 'w'
    const foe = king === 'k' ? 'w' : 'b'

    //console.log(`Castling: ${castling}, turn: ${turn}, friend: ${friend}, foe: ${foe}`)
    if(isKingMove(sqFrom, sqTo)) {
        return attacksOnSq(fen, sqTo, foe).length === 0
    } else if (isCastling(sqFrom, sqTo, friend)) {
        //console.log(`IsCastling: ${sqFrom}, ${sqTo}`)
        if (!isEmptyFigure(fenArray[sqTo])) {
            //console.log('Aledgely square ', sqTo, ' is not empty')
            return false
        }
        let pathToCheck
        switch (sqTo) {
            case 6:
                if (!/K/.test(castling)) return false
                pathToCheck = path(4, 6)
                break
            case 2:
                if (!/Q/.test(castling)) return false
                pathToCheck = path(4, 2)
                break
            case 62:
                if (!/k/.test(castling)) return false
                pathToCheck = path(60, 62)
                break
            case 58:
                if (!/q/.test(castling)) return false
                pathToCheck = path(60, 58)
                break
            default:
                return false
        }
        //console.log("!pathToCheck.map(s => attacksOnSq(fen, s, foe)).some(a => a.length > 0)",
        !pathToCheck.map(s => attacksOnSq(fen, s, foe)).some(a => a.length > 0)
        return !pathToCheck.map(s => attacksOnSq(fen, s, foe)).some(a => a.length > 0)
    } else {
        return false
    }
}


const canMove = (fen, sqFrom, sqTo) => {
    if (path(sqFrom, sqTo).length < 2 ) {
        return false
    }
    if (!isClearPath(fen, path(sqFrom, sqTo))) {
        return false
    }

    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    const sanSqTo = sq2san(sqTo)
    const fenObj = fen2obj(fen)
    const {fenArray, enPassant} = fenObj
    const figOrigen = fenArray[sqFrom]

    if (figOrigen === '0') {
        return false
    }

    const figDestino = fenArray[sqTo]

    if (isFriend(figOrigen, figDestino)) {
        return false
    }

    switch(figOrigen) {
        case 'p':
            //console.log(`Testing move from ${sqFrom} to ${sqTo} for black pawn`)
            if (isPawnMove(sqFrom, sqTo, 'b') && !isEmptyFigure(figDestino)) return false
            if (isPawnAttack(sqFrom, sqTo, 'b') && !isWhiteFigure(figDestino) && sanSqTo !== enPassant) return false
            if (!isPawnMove(sqFrom, sqTo, 'b') && !isPawnAttack(sqFrom, sqTo, 'b')) return false
            break
        case 'P':
            //console.log(`Testing move from ${sqFrom} to ${sqTo} for white pawn`)
            if (isPawnMove(sqFrom, sqTo, 'w') && !isEmptyFigure(figDestino)) return false
            if (isPawnAttack(sqFrom, sqTo, 'w') && !isBlackFigure(figDestino) && sanSqTo !== enPassant) return false
            if (!isPawnMove(sqFrom, sqTo, 'w') && !isPawnAttack(sqFrom, sqTo, 'w')) return false
            break
        case 'K':
        case 'k':
            return canKingMove(fen, sqFrom, sqTo, figOrigen)
            break
        case 'q':
        case 'Q':
            if (!isQueenMove(sqFrom, sqTo)) return false
            break
        case 'r':
        case 'R':
            if (!isRookMove(sqFrom, sqTo)) return false
            break
        case 'b':
        case 'B':
            if (!isBishopMove(sqFrom, sqTo)) return false
            break
        case 'n':
        case 'N':
            if (!isKnightJump(sqFrom, sqTo)) return false
            break
        default:
            return false
    }

    return true
}
 
const candidateMoves = fen => {
  const {fenArray, turn, castling, enPassant} = fen2obj(fen)
  const army = turn === 'w' ? wArmy(fen) : bArmy(fen)
  return army.map(sq => [sq, chessboard.filter(n => canMove(fen, sq, n))])
}

const availableMoves = fen => {
    let retArr = []
    const candMoves = candidateMoves(fen)
    for (let item of candMoves) {
        for (let sq of item[1]) {
            const newFen = tryMove(fen, item[0], sq, 'Q')
            if (newFen && validateFen(newFen).valid) retArr = [...retArr, {from: item[0], to: sq}]
        }
    }
    return retArr
}

const validateFen = fen => {
    if (!fen) return {valid: false, code: 4, message: 'Unknown error'}
    const {fenArray, turn} = fen2obj(fen)
    if (fenArray.filter(fig => fig === 'k').length !== 1) {
        return {valid: false, code: 2, message: 'There must be one and only one black king'}
    }
    if (fenArray.filter(fig => fig === 'K').length !== 1) {
        return {valid: false, code: 3, message: 'There must be one and only one white king'}
    }
    if (checksTo(fen, turn === 'w' ? 'b' : 'w').length > 0) {
        return {valid: false, code: 1, message: `The ${turn === 'b' ? 'white' : 'black'} side is in check, while it's not its turn to move`}
    }
    return {valid: true, code: 0, message: 'OK'}
}

const tryMove = (fen, sqFrom, sqTo, promotion = 'Q') => {
    if (!fen || fen.constructor.name !== 'String') return false
    if (!canMove(fen, sqFrom, sqTo)) return false
    let {fenArray, turn, castling, enPassant, halfMoveClock, fullMoveNumber} = fen2obj(fen)
    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    const [figFrom, figTo] = [fenArray[sqFrom], fenArray[sqTo]]
    let newArray = [...fenArray]

    newArray[sqFrom] = '0'
    if (figFrom === 'P' && row(sqTo) === 7) {
        newArray[sqTo] = promotion ? promotion.toUpperCase() : 'Q'
    } else if (figFrom === 'p' && row(sqTo) === 0) {
        newArray[sqTo] = promotion ? promotion.toLowerCase() : 'q'
    } else {
        newArray[sqTo] = figFrom
    }
    if (figFrom === 'P' && sq2san(sqTo) === enPassant) {
        newArray[sqTo - 8] = '0'
    } else if (figFrom === 'p' && sq2san(sqTo) === enPassant) {
        newArray[sqTo + 8] = '0'
    }

    if (figFrom === 'K' && sqFrom === 4 && sqTo === 6) {
        newArray[5] = 'R'
        newArray[7] = '0'
    } else if (figFrom === 'K' && sqFrom === 4 && sqTo === 2) {
        newArray[3] = 'R'
        newArray[0] = '0'
    } else if (figFrom === 'k' && sqFrom === 60 && sqTo === 62) {
        newArray[61] = 'r'
        newArray[63] = '0'
    } else if (figFrom === 'k' && sqFrom === 60 && sqTo === 58) {
        newArray[59] = 'r'
        newArray[56] = '0'
    }   

    if (sqFrom === 4) castling = castling.replace('K', '').replace('Q', '')
    if (sqFrom === 60) castling = castling.replace('k', '').replace('q', '')

    if (sqFrom === 7) castling = castling.replace('K', '')
    if (sqFrom === 0) castling = castling.replace('Q', '')

    if (sqFrom === 63) castling = castling.replace('k', '')
    if (sqFrom === 56) castling = castling.replace('q', '')

    if (castling === '') castling = '-'

    turn = turn === 'w' ? 'b' : 'w'

    if (figFrom === 'P' && isPawnMove(sqFrom, sqTo, 'w') === 2) {
        enPassant = sq2san(sqTo - 8)
    } else if (figFrom === 'p' && isPawnMove(sqFrom, sqTo, 'b') === 2) {
        enPassant = sq2san(sqTo + 8)
    } else {
        enPassant = '-'
    }

    if (figFrom !== 'P' && figFrom !== 'p' && figTo === '0') {
        halfMoveClock = parseInt(halfMoveClock) + 1
    } else {
        halfMoveClock = '0'
    }

    fullMoveNumber = turn === 'w' ? parseInt(fullMoveNumber) + 1 : fullMoveNumber

    const fenString = array2fenString(newArray)

    return `${fenString} ${turn} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}`
}

const stripSan = san => san.replace(/[+#=x\!\?]/g, '')

const san2args = (fen, san) => {
    const fenobj = fen2obj(fen)
    
    san = stripSan(san)
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

    let sqFrom, sqTo, promotion, army

    if (/[a-h]/.test(san[0])) {
        const colOrig = letter2col(san[0])
        if (/[1-8]/.test(san[1])) {
           sqTo = sqNumber(san.slice(0, 2))
        } else {
           sqTo = sqNumber(san.slice(1, 3))
        }
        army = fenobj.turn === 'w' ? wPawns(fen) : bPawns(fen) 
        sqFrom = army.find(n => col(n) === colOrig && canMove(fen, n, sqTo))
        if (typeof sqFrom === 'undefined') sqFrom = -1

        if (/[QNRBqnrb]/.test(san[san.length - 1])) {
            promotion = san[san.length - 1]
        } else {
            promotion = null
        }
        return {sqFrom, sqTo, promotion}
    } else if (isWhiteFigure(san[0]) && san[0] !== 'P') {
        promotion = null
        const fig = san[0]
        switch (fig) {
            case 'N':
                army = fenobj.turn === 'w' ? wKnights(fen) : bKnights(fen)
                break
            case 'B':
                army = fenobj.turn === 'w' ? wBishops(fen) : bBishops(fen)
                break
            case 'R':
                army = fenobj.turn === 'w' ? wRooks(fen) : bRooks(fen)
                break
            case 'Q':
                army = fenobj.turn === 'w' ? wQueens(fen) : bQueens(fen)
                break
            case 'K':
                army = fenobj.turn === 'w' ? wKings(fen) : bKings(fen)
                break
            }
        sqTo = san2sq(san.slice(san.length - 2, san.length))
        if (san.length === 5) {
            //console.log('san length 5')
            sqFrom = san2sq(san.slice(1, 3))
        } else if (san.length === 4) {
          // console.log('san length 4')
          const extraInfo = san[1]
          const [rowOrColFunc, geoInfo] = /[1-8]/.test(extraInfo) ? 
                                          [row, parseInt(extraInfo) - 1] : 
                                          [col, letter2col(extraInfo)]
          sqFrom = army.find(n => rowOrColFunc(n) === geoInfo && canMove(fen, n, sqTo)) 
          if (typeof sqFrom === 'undefined') sqFrom = -1
        } else {
            const candids = army.filter(n => canMove(fen, n, sqTo))
            switch (candids.length) {
                case 0:
                    //console.log('0 candidates')
                    sqFrom = -1
                    break
                case 1:
                    //console.log('1 candidato: ' + candids[0])
                    sqFrom = candids[0]
                    break
                default:
                    const reals = candids.filter(sq => {
                        const newfen = tryMove(fen, sq, sqTo, null)
                        return newfen && validateFen(newfen).valid
                    })
                    // console.log("Hay " + reals.length + " jugada/s para elegir")
                    //console.log('Reals: ' + JSON.stringify(reals))
                    sqFrom  = reals.length === 1 ? reals[0] : -1              
            } 
        }
        return {sqFrom, sqTo, promotion}
    } else {
        //console.log('Llegamos al final sin saber que pasó')
        return {sqFrom: -1, sqTo: -1, promotion: null}
    }
}

const args2san = (fen, sqFrom, sqTo, promotion) => {
    const {fenArray, turn, enPassant, castling} = fen2obj(fen)
    sqFrom = sqNumber(sqFrom)
    sqTo = sqNumber(sqTo)
    const [figFrom, figTo] = [fenArray[sqFrom], fenArray[sqTo]]
    if (isEmptyFigure(figFrom)) return null

    let figure, extrainfo, capture, destiny, promotionFigure, check

    const newfen = tryMove(fen, sqFrom, sqTo, promotion)
    if (!(newfen && validateFen(newfen).valid)) return null

    if (isCheckMate(newfen)) {
        check = '#'
    } else if (isCheck(newfen)) {
        check = '+'
    } else {
        check = ''
    }

    if (figFrom === 'K' && sqFrom === 4) {
        if (sqTo === 6) return `O-O${check}`
        if (sqTo === 2) return `O-O-O${check}`
    }

    if (figFrom === 'k' && sqFrom === 60) {
        if (sqTo === 62) return `O-O${check}`
        if (sqTo === 58) return `O-O-O${check}`
    }
    
    
    capture = !isEmptyFigure(figTo) ? 'x' : 
              /[Pp]/.test(figFrom) && sqNumber(enPassant) === sqTo ? 'x' : ''
    destiny = sq2san(sqTo)

    if (/[Pp]/.test(figFrom)) {
        figure =  isSameCol(sqFrom, sqTo) ?  '' : col2letter(col(sqFrom))
        extrainfo = ''
        if ((row(sqTo) === 7 && figFrom === 'P') || 
           (row(sqTo) === 0 && figFrom === 'p')) {
            promotionFigure = `=${promotion ? promotion.toUpperCase() : 'Q'}`
        } else {
            promotionFigure = ''
        }
    } else {
        figure = figFrom.toUpperCase()
        promotionFigure = ''
        const attacks = attacksOnSq(fen, sqTo, turn)
        const fig_from_attacks = attacks.filter( sq => fenArray[sq] === figFrom && sq !== sqFrom)
        if (fig_from_attacks.length === 0) {
            extrainfo = ''
        } else {
            const valids = fig_from_attacks.filter(sq => {
                const otherfen = tryMove(fen, sq, sqTo, null)
                return otherfen && validateFen(otherfen).valid
            })
            if (valids.length > 1) {
                extrainfo = sq2san(sqFrom)
            } else if (valids.length === 1) {
                if (isSameCol(sqFrom, valids[0])) {
                    extrainfo = (row(sqFrom) + 1).toString()
                } else {
                    extrainfo = col2letter(col(sqFrom))
                }
            } else {
                extrainfo = ''
            }
        }
    }
    
    return `${figure}${extrainfo}${capture}${destiny}${promotionFigure}${check}`
}

const makeFenComparable = fen => fen.split(/\s+/).slice(0, 4).join(' ')

const clear = (fen) => {
    const obj = fen2obj(fen)
    obj.fenArray = range(0, 63).fill('0')
    obj.fenString = array2fenString(obj.fenArray)
    return obj2fen(obj)
}

const insuficientMaterial = (fen, color = 'w') => {
    if (!/^[wb]$/i.test(color)) return null
    const [frPawns, frKnights, frBishopsD, frBishopsL, frRooks, frQueens, 
           foePawns, foeKnights, foeBishopsD, foeBishopsL, 
           foeRooks, foeQueens] = color.toLowerCase() === 'w' ? 
               [wPawns(fen), wKnights(fen), wBishopsD(fen), wBishopsL(fen), wRooks(fen),
                wQueens(fen), bPawns(fen), bKnights(fen), bBishopsD(fen), bBishopsL(fen),
                bRooks(fen), bQueens(fen) 
               ] :
               [bPawns(fen), bKnights(fen), bBishopsD(fen), bBishopsL(fen), bRooks(fen),
                bQueens(fen), wPawns(fen), wKnights(fen), wBishopsD(fen), wBishopsL(fen),
                wRooks(fen), wQueens(fen) 
               ] 
    
    if (frPawns.length || frRooks.length || frQueens.length) return false // Mate de torre, dama o pieza coronada

    if (frBishopsD.length && frBishopsL.length) return false // Mate de 2 alfiles

    if ((frBishopsD.length || frBishopsL.length)  && frKnights.length) return false // Mate de 2 alfil y caballo

    if (frKnights.length > 1) return false // Mate de 2 o más caballos

    /* Mates con material que por si mismo es insuficiente, 
       pero es "ayudado" por una pieza enemiga que ahoga */
    if (frBishopsD.length) {
        if (foePawns.length || foeKnights.length || foeBishopsL.length) return false
    } else if (frBishopsL.length) {
        if (foePawns.length || foeKnights.length || foeBishopsD.length) return false
    } else if (frKnights.length) {
        if (foePawns.length || foeKnights.length || 
            foeBishopsD.length || foeBishopsL.length ||
            foeRooks.length) return false
    }
    /* Fin Mates con material que por si mismo es insuficiente, 
       pero es "ayudado" por una pieza enemiga que ahoga */
    
    return true
}

const pgnDate = d => `${d.getFullYear()}.${lpad(d.getMonth() + 1)}.${lpad(d.getDate())}`

class Chess {
    constructor(fen = defaultFen) {
        return this.reset(fen)
    }
    
    static version() {return new Chess().version }

    static utils() {return utility_funcs}

    static defaultFen() {return defaultFen}

    static sevenTags() {
        return ['Event', 'Site', 'Date', 'Round', 'White', 'Black', 'Result']
    }

    static results() { return ["*", "1-0", "0-1", "1/2-1/2"]}
    static result_names() { return ["undefined", "white", "black", "draw"]}

    static getUndefinedString() {return Chess.results()[Chess.result_names().findIndex(v => v === 'undefined')]}
    static getWhiteWinString() {return Chess.results()[Chess.result_names().findIndex(v => v === 'white')]}
    static getBlackWinString() {return Chess.results()[Chess.result_names().findIndex(v => v === 'black')]}
    static getDrawString() {return Chess.results()[Chess.result_names().findIndex(v => v === 'draw')]}

    static getResultString(game) {
        if (!game.game_over) {
            return Chess.getUndefinedString()
        } else if (game.in_draw)  {
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
    }

    reset(fen = defaultFen) {
        const v = validateFen(fen)
        if (!v.valid) throw new Error(v.message)
        this.__fens__ = [fen]
        this.__sans__ = ['']
        this.__headers__ = {
            Event: 'Internet Game',
            Site: 'The Cloud, INTERNET',
            Date: pgnDate(new Date()),
            Round: '?',
            White: 'White Player',
            Black: 'Black Player',
            Result: Chess.getResultString(this)
        }
        if (fen !== defaultFen) {
            this.headers('FEN', fen, 'SetUp', '1')
        }
        return this
    }

    load(fen) {
        if (!validateFen(fen).valid) return null
        this.__fens__ = [fen]
        this.__sans__ = ['']
        this.headers('Result', Chess.getResultString(this), 'FEN', fen, 'SetUp', '1')
        delete this.__headers__.PlyCount
        DEBUG && console.log('Turno' + this.turn)
        return this
    }

    mini_ascii(fennum, flipped = false, sep = '\n') {
        fennum = fennum || this.fens().length - 1
        return partition(fen2obj(this.fens()[fennum]).fenArray
            .map((_, i, self) => self[i ^ (flipped ? 7 : 56)])
            .map(v => v === '0' ? '.' : v), 8)
            .map(a => a.join(' '))
            .join(sep)
    }

    ascii(fennum , flipped = false, sep = '\n') {
        const separ = `   +${'---+'.repeat(8)}${sep}`
        //const empty = `   ${'|   '.repeat(8)}|${sep}`
        const empty = ''
        fennum = fennum || this.fens().length - 1
        const { fenArray } = fen2obj(this.fens()[fennum])
        const rows = (flipped ? range(0, 7) : range(7, 0, -1)).map(n => (n + 1).toString())
        const cols = (flipped ? range(7, 0, -1) : range(0, 7)).map(n => String.fromCharCode(n + 97))
        const bottomLine = cols.reduce((base, el) => base + '  ' + el + ' ', '   ') + ` ${sep}`
        const showArray = fenArray.map((_, i, self) => self[i ^ (flipped ? 7 : 56)]).map(v => v === '0' ? ' ' : v)
        const partArray = partition(showArray, 8)
        const asciiArray = partArray.map((subArr, i) => subArr.reduce((base, el) => base + '| ' + el + ' ', empty + ` ${rows[i]} `) + `|${sep}` + empty + separ)

        return `${separ}${asciiArray.join('')}${bottomLine}`
    }

    console_view(fennum, flipped = false) {
        fennum = fennum || this.fens().length - 1
        console.log(this.ascii(fennum, flipped))
    }

    clear() {
        this.__fens__ = [...this.__fens__.slice(0, -1), clear(this.__fens__[this.__fens__.length -1])]
        return this
    }

    san_with_number(number, all = false) {
        if (number < 1 || number > (this.__sans__.length - 1)) return ''
        const obj = fen2obj(this.fens()[number - 1])
        if (!obj) return JSON.stringify(null)
        const {turn, fullMoveNumber} = obj
        let prefix
        if (turn === 'w') {
            prefix = `${fullMoveNumber}. `
        } else {
            prefix = all ? `${fullMoveNumber}. ... ` : ''
        }
        const san = this.history()[number - 1]

        return `${prefix}${san}`
    }

    numbered_history(all = false) {
        if (this.getTurn(0) === 'w') {
            //console.log('Returning history started with white')
            return this.history().map((_, i) => this.san_with_number(i + 1, all))
        } else {
            //console.log('Returning history started with black')
            return [this.san_with_number(1, true)].concat(this.history().slice(1).map((_, i) => this.san_with_number(i + 2, all)))
        }
    } 

    pgn_moves(sep = '\n', line_break = 16){
        return partition(this.numbered_history(), line_break)
        .map(a => a.join(' ')).join(sep) +
        ' ' + this.headers('Result') + sep
    }

    pgn_headers(sep = '\n') {
        const seven_tags = Chess.sevenTags()
        const seven_lines = seven_tags.map( tag => `[${tag} "${this.headers(tag)}"]`)
        let others = [] 
        for (let key in this.headers()) {
            if (typeof seven_tags.find(tag => tag === key) === 'undefined') {
                others = [...others, key]
            }
        }
        const other_lines = others.map( tag => `[${tag} "${this.headers(tag)}"]`).sort()
        return seven_lines.join(sep) + sep + other_lines.join(sep) + sep + sep
    }

    pgn(sep = '\n', line_break = 16) {
        return `${this.pgn_headers(sep)}${this.pgn_moves(sep, line_break)}`
    }

    load_pgn(pgn, headers_only = false) {
        if (pgn.length < 5) return false
        const strip_nums = text => text.replace(/\d+\.\s*(\.\.\.)?\s*/g, '')
        const is_san = text => sanRegExp.test(text.replace(/[\?\!]+$/g, ''))
        const is_result = text => !!Chess.results().find(r => r === text)

        const states = [
            'SCANNING',
            'LABEL',
            'VALUE',
            'TOKEN',
            'COMMENT',
            'VARIANT'
        ]

        let state = 'SCANNING'
        let prevState = state
        let label = ''
        let value = ''
        let token = ''
        let current = ''
        let header_result = null
        let index = 0

        pgn = strip_nums(pgn).replace(/\r/g, '\n')
        const game = new Chess()

        do {
            current = pgn[index++]

            switch (state) {
               case states[0]: //'SCANNING' 
                 if ('[' === current) {
                     DEBUG && console.log('Paso a "LABEL"')
                     state = 'LABEL'
                 } else if ('{' === current) {
                     prevState = state
                     state = 'COMMENT'
                 } else if ('(' === current) {
                    prevState = state
                    state = 'VARIANT'
                 } else if (current.match(/[\s\]]/)) {
                    DEBUG && console.log('Match de espacio o ]. Sigue en estado "SCANNING"') 
                    continue
                 } else {
                     if (headers_only) {
                        this.__headers__ = game.__headers__
                        this.__fens__ = [game.__fens__[0]]
                        this.__sans__ = ['']
                        return true
                     }
                     prevState = state
                     state = 'TOKEN'
                     token = current
                     DEBUG && console.log('Paso a "TOKEN"')
                 }
                 continue
               case states[1]: //'LABEL' 
                 if ('"' === current) {
                     DEBUG && console.log('Pasando a "VALUE"')
                     state = 'VALUE'
                 } else {
                    label += current
                    DEBUG && console.log("Label actual: " + label)
                 }
                 continue
               case states[2]: //'VALUE' 
                 if (/[\"\]]/.test(current)) {
                    DEBUG && console.log("Estableciondo header: " + label + " con valor: " + value) 
                    game.headers(capitalize(label.trim()), value)
                    if (label.trim().toLowerCase() === 'fen') {
                        DEBUG && console.log("Estableciendo FEN inicial")
                        if (!game.load(value)) {
                            DEBUG && console.log("No se pudo cargar el FEN: " + value)
                            return false
                        } else {
                            DEBUG && console.log("Se cargó el FEN: " + value)
                        }
                        game.headers('SetUp', '1')
                    }
                    if (label.trim().toLowerCase() === 'result') {
                        DEBUG && console.log("Cargando resultado: " + value)
                        header_result = value
                    }
                    DEBUG && console.log("Limpiando label y value")
                    label = ''
                    value = ''
                    state = 'SCANNING'
                 } else {
                     value += current
                 }
                 continue
               case states[3]: //'TOKEN' 
                 if ('{' === current) {
                     prevState = state
                     state = 'COMMENT'
                 } else if ('(' === current) {
                     prevState = state
                     state = 'VARIANT'
                 } else if (current.match(/[\s\[]/)) {
                     if (is_result(token)) {
                         DEBUG && console.log("Cargando token resultado: " + token)
                         game.headers('Result', token)
                     }
                     if (is_result(token) || current === '[') {
                        if (is_result(token)) { 
                            game.headers('Result', token) 
                        } else if (header_result) {
                            game.headers('Result', header_result)
                        }
                        this.__headers__ = game.__headers__
                        this.__fens__ = game.__fens__
                        this.__sans__ = game.__sans__
                        return true
                     }
                     if (is_san(token)) {
                         const result = game.move(token.replace(/[\!\?]+$/g, ''))
                         if (!result) {
                             DEBUG && console.log(`${token} move failed to load.`)
                             return false
                         }
                         token = ''
                         prevState = 'TOKEN'
                         state = 'SCANNING'
                     }
                 } else {
                     token += current
                     DEBUG && console.log("Creando token: " + token)
                 }
                 continue
               case states[4]: //'COMMENT' 
                 if ('}' === current) {
                    state = prevState
                 }
                 continue
               case states[5]: //'VARIANT' 
                 if (')' === current) {
                    state = prevState
                 }
                 continue
               default:
                 continue
            }

        } while (index < pgn.length)

        if (header_result) {
            game.headers('Result', header_result)
        }
        this.__headers__ = game.__headers__
        this.__fens__ = game.__fens__
        this.__sans__ = game.__sans__
        return true
    }

    move(...moveArgs) {
        const fenObj = fen2obj(this.fen) 
        let sqFrom, sqTo, promotion
        switch (moveArgs.length) {
            case 0:
                return false
            case 1:
                if (sanRegExp.test(moveArgs[0])) {
                    const result = san2args(this.fen, moveArgs[0])
                    sqFrom = result.sqFrom
                    sqTo = result.sqTo
                    promotion = result.promotion
                } else if (/[a-h][1-8]-?[a-h][1-8][QRNBqrnb]?/.test(moveArgs[0])) {
                    if (moveArgs[0][moveArgs[0].length - 1].match(/QRNB/i)) {
                        promotion = moveArgs[0][moveArgs[0].length - 1].toUpperCase()
                    } else {
                        promotion = null
                    }
                    const moveStr = moveArgs[0].replace(/-/g, '')
                    sqFrom = sqNumber(moveStr.slice(0,2))
                    sqTo = sqNumber(moveStr.slice(2,4))
                }
                break
            default:
                sqFrom = sqNumber(moveArgs[0])
                sqTo = sqNumber(moveArgs[1])
                promotion = moveArgs[2]
        }

        if ((isWhiteFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'b') || 
           (isBlackFigure(fenObj.fenArray[sqFrom]) && fenObj.turn === 'w')) return false

        const newFen = tryMove(this.fen, sqFrom, sqTo, promotion)
        if (!newFen) return false
        if (!validateFen(newFen).valid) return false
        const san = args2san(this.fen, sqFrom, sqTo, promotion)
        const { fenArray, turn, enPassant } = fenObj
        const [figFrom, figTo] = [fenArray[sqFrom], fenArray[sqTo]]
        let newSanObj = {san, 
                         piece: figFrom, 
                         color: turn, 
                         from: sq2san(sqFrom), 
                         to: sq2san(sqTo)}
//        if (!isEmptyFigure(figTo)) newSanObj = {...newSanObj, captured: figTo}
        if (!isEmptyFigure(figTo)) newSanObj = Object.assign(newSanObj, {captured: figTo})
        const isEnPassant = /[Pp]/.test(figFrom) && sqTo === san2sq(enPassant)
        const isBigPawn = /[Pp]/.test(figFrom) && difRow(sqFrom, sqTo) === 2
        const isPromotion = (figFrom === 'p' && row(sqTo) === 0) ||
                            (figFrom === 'P' && row(sqTo) === 7)
//        if (isPromotion) newSanObj = {...newSanObj, promotion: promotion ? 
//                                      promotion.toUpperCase() : 'Q'}
        if (isPromotion) newSanObj = Object.assign(newSanObj, 
            {promotion: promotion ? promotion.toUpperCase() : 'Q'})
        let flags = ''
        if ((figFrom === 'K' && sqFrom === 4 && sqTo === 6) || (figFrom === 'k' && sqFrom === 60 && sqTo === 62)) {
            flags += 'k'
        } else if ((figFrom === 'K' && sqFrom === 4 && sqTo === 2) || (figFrom === 'k' && sqFrom === 60 && sqTo === 58)) {
            flags += 'q'
        }
        if (isPromotion) {
            flags += 'p'
        } else if (isBigPawn) {
            flags += 'b'
        }
        flags += isEnPassant ? 'e' : newSanObj.captured ? 'c' : 'n'
        
//        this.__sans__ = [...this.__sans__, {...newSanObj, flags}]
        this.__sans__ = [...this.__sans__, Object.assign(newSanObj, {flags})]
        this.__fens__ = [...this.__fens__, newFen]
        this.headers('PlyCount', this.history().length.toString(), 'Result', Chess.getResultString(this))

        // setTimeout(() => {
        // }, 0)

        return this
    }

    history(options) {
        return (options && options.verbose) ? 
            this.__sans__.slice(1) :
            this.__sans__.slice(1).map(obj => obj.san)
    }

    moves(from = null) {
        return from ? 
            availableMoves(this.fen).filter(it => it.from === sqNumber(from))
            .map(it => args2san(this.fen, it.from, it.to, 'Q'))
            :
            availableMoves(this.fen).map(it => args2san(this.fen, it.from, it.to, 'Q')) 
    }
    
    headers(...args) {
        if (!args.length) return this.__headers__
        if (args.length === 1) return this.__headers__[capitalize(args[0])] || 'Header not set'
        const evenargs = args.length % 2 === 0 ? args : args.slice(0, -1)
        for (let x = 0; x < evenargs.length; x += 2) {
            this.__headers__[capitalize(evenargs[x])] = evenargs[x + 1]
        }
        return this.__headers__
    }

    in_check() {return this.isCheck}
    
    in_checkmate() {return this.isCheckMate}

    in_stalemate() {return this.isStaleMate}

    get title() {
        return `${this.headers('White')} - ${this.headers('Black')}   /   ${this.headers('Result')}`
    }

    get version()  {
      return '0.16.6'
    }

    __getField(fieldName = 'turn', n = this.history().length) {
        const fields = ['turn', 'castling', 'enPassant', 'fullMoveNumber', 'halfMoveClock']
        if (!fields.find(f => f === fieldName)) return null
        if (n < 0) n = 0
        if (n > this.history().length) n = this.history.length
        return fen2obj(this.fens()[n])[fieldName]
    }

    getTurn(n = this.history().length) {
         return this.__getField('turn', n)
    }
    get turn() {return this.getTurn()}

    getCastling(n = this.history().length) {
         return this.__getField('castling', n)
    }
    get castling() {return this.getCastling()}
    
    getEnPassant(n = this.history().length) {
        return this.__getField('enPassant', n)
   }
   get enPassant() {return this.getEnPassant()}

   getHalfMoveClock(n = this.history().length) {
    return this.__getField('halfMoveClock', n)
   }
   get halfMoveClock() {return this.getHalfMoveClock()}

    getFullMoveNumber(n = this.history().length) {
         return this.__getField('fullMoveNumber', n)
    }
    get fullMoveNumber() {return this.getFullMoveNumber()}

    get in_fifty_moves_rule() {
        return parseInt(fen2obj(this.fen).halfMoveClock) >= 100
    }

    get in_threefold_repetition() {
        const current = makeFenComparable(this.fen)
        const groups = groupArray(this.fens().map(makeFenComparable))
        return groups[current] >= 3
    }

    get insufficient_material() {
        return insuficientMaterial(this.fen, 'w') && insuficientMaterial(this.fen, 'b')
    }

    get in_draw() {
        return this.in_fifty_moves_rule || this.in_threefold_repetition ||
               this.insufficient_material || this.isStaleMate
    }

    get isCheck() {
        return isCheck(this.fen)
    }

    get isCheckMate() {
        return isCheckMate(this.fen)
    }
    
    get isStaleMate() {
        return isStaleMate(this.fen)
    }
    
    get fen() {
        return this.__fens__[this.__fens__.length -1]
    }

    set fen(newFen =  Chess.defaultFen()) {
        this.__fens__[this.__fens__.length -1] = newFen
    }

    get position() {
        return fen2obj(this.fen).fenArray
    }
    
    get positions() {
	return this.__fens__.map(fen => fen2obj(fen).fenArray)
    }
    
    get isCheck() {
        return isCheck(this.fen)
    }

    get isCheckMate() {
        return isCheckMate(this.fen)
    }

    get isStaleMate() {
        return isStaleMate(this.fen)
    }

    get game_over() {
        return this.in_draw || this.isCheckMate
    }

    get(sq) {
        return fen2obj(this.fen).fenArray[sqNumber(sq)]
    }

    put(sq, figure) {
        if (!/[0pnbrqkPNBRQK]/.test(figure)) return null
        sq = sqNumber(sq)
        const obj = fen2obj(this.fen)
        obj.fenArray[sq] = figure
        obj.fenString = array2fenString(obj.fenArray)
        const newFen = obj2fen(obj)
        this.__fens__ = [...this.__fens__.slice(0, -1), newFen]
        return this
    }

    remove(sq) {
        const figure = this.get(sq)
        this.put(sq, '0')
        return figure
    }

    static validate_fen(fen) {
        return validateFen(fen)
    }

    static square_color(sq) {
        return isLightSquare(sqNumber(sq)) ? 'light' : 'dark'
    }

    static normalize_pgn(pgn_str) {
        return pgn_str.replace(/\r/g, '')
        //.replace(/\n{3,}/g, '\n\n')
        //.replace(/(\])\s*\n{2,}\s*(\[)/g,"$1\n$2")
        //.replace(/([a-h1-8NBRQK0O\+\#\!\?])\s*\n{2,}\s*([a-h1-8NBRQK0O\+\#\!\?])/g,"$1\n$2")
    }

    static load_pgn_file(file_str, headers_only = false) {
        const halves = Chess.normalize_pgn(file_str).split(/\n{2,}/g).filter(l => l.length)
        const retArr = partition(halves, 2).map(d => d.join('\n\n'))
        return retArr.map(pgn => {
            if (pgn.length < 10) return null 
            let g = new Chess
            g.load_pgn(pgn, headers_only)
            DEBUG && console.log(`Game ${g.title} loaded.`)
            return g
        })
    }

    static chunk_pgn_file(file_str, chunk_size = 50) {
        const games = Chess.load_pgn_file(file_str)
        .map(g => g.pgn())
        return partition(games, chunk_size)
        .map(gs => gs.join('\n\n'))
    }

    fens() { return this.__fens__}

    undo() {
        if (this.__fens__.length < 2) return false
        this.__fens__.splice(this.__fens__.length - 1, this.__fens__.length)
        this.__sans__.splice(this.__sans__.length - 1, this.__sans__.length)
        this.headers('PlyCount', this.history().length.toString(), 'Result', Chess.getResultString(this))
        return this
    }

    toString() {
        return this.fen
    }

    reload_history() {
        const history_backup = this.history({verbose: true})
        // const fens_backup = this.__fens__
        // const result_backup = this.headers('Result')

        //this.__sans__ = [this.__sans__[0]]
        this.__fens__ = [this.__fens__[0]]
        
        history_backup.forEach(obj => {
            // this.move(obj.san)
            let {sqFrom, sqTo, promotion} = san2args(this.fen, obj.san)
            let newfen = tryMove(this.fen, sqFrom, sqTo, promotion)
            if (newfen) {
                this.__fens__ = [...this.__fens__, newfen]
            }
        })
        
        //this.headers('Result', result_backup)
        return true
    }

    load_json(json) {
        this.__sans__ = ['', ...json.moves.map(s => ({san: s}))]
        this.__headers__ = json.headers
        this.__fens__ = [('FEN' in json.headers ? json.headers.FEN : Chess.defaultFen())]
        this.headers('Result', json.result)
        this.reload_history()
        return true
    }

    json() {
        return {
            headers: this.__headers__,
            moves: this.history(),
            result: this.headers('Result')
        }
    }

    static load_json_file(json_arr) {
        return json_arr.map(obj => {
            let g = new Chess()
            g.load_json(obj)
            return g
        })
    }

}

const utility_funcs = {
    lpad,
    rpad,
    capitalize,
    groupArray,
    makeSet,
    range,
    partition,
    chessboard,

    sanRegExp,
    pgnTagLineRegExp,

    defaultFen, 
    emptyFen,
    sicilianFen,
    scandinavianFen,
    oddFrenchFen,
    mateLocoFen,
    mateAyudadoFen,
    prePastorFen,
    pastorFen,

    pgnDate,
    makeFenComparable,
    fen2obj,
    obj2fen,
    expandFen,
    compressFen,
    fen2array,
    defaultFenArray,
    array2fenString,
    computedFenString,
    row,
    col,
    sq2rowcol,
    rowcol2sq,
    col2letter,
    letter2col,
    sq2san,
    san2sq,
    sqNumber,
    isBlackFigure,
    isWhiteFigure,
    isEmptyFigure,
    isDarkSquare,
    isLightSquare,
    difRow,
    difCol,
    isSameRow,
    isSameCol,
    isDiagonal,
    isAntiDiagonal,
    isKingReach,
    path,
    innerPath,
    isForward,
    kingSq,
    isClearPath,
    isPawnMove,
    isPawnAttack,
    isPawnPromotion,
    isCastling,
    isKingMove,
    isBishopMove,
    isRookMove,
    isQueenMove,
    army,
    wBishops,
    wBishopsD,
    wBishopsD,
    wKings,
    wKnights,
    wPawns,
    wQueens,
    wRooks,
    bBishops,
    bBishopsD,
    bBishopsL,
    bKings,
    bKnights,
    bPawns,
    bQueens,
    bRooks,
    wArmy,
    bArmy,
    wAttackers,
    bAttackers,
    wAttacks,
    bAttacks,
    wPMoves,
    bPMoves,
    isFriend,
    isFoe,
    getFigure,
    getFigures,
    attacksFromSq,
    attacksOnSq,
    checksTo,
    isCheck,
    isCheckMate,
    isStaleMate   ,
    canKingMove,
    canMove,
    candidateMoves,
    availableMoves,
    validateFen,
    tryMove,
    stripSan, 
    args2san,
    san2args,
    clear,
    insuficientMaterial,
    Chess,
}


export default Chess
