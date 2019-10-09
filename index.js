const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const sicilianFen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1'

const fen2obj = fen => {
    const arr = fen.split(/\s+/)
    return {
        fenString: arr[0],
        turn: arr[1],
        castling: arr[2],
        enPassant: arr[3],
        halfMoveClock: arr[4],
        fullMoveNumber: arr[5]
    }
}

const expandFen = fen => fen.replace(/\//g, '').replace(/[1-8]/g, d => ('0').repeat(parseInt(d)))

const compressFen = fen => fen.replace(/(.{8})(?!$)/g, "$1/").replace(/0+/g, z => z.length.toString())

const fen2array = fen => {
    if (/^(.+\/){7}.+$/.test(fen)) {
        fen = expandFen(fen)
    } else if (fen.length !== 64) {
        return []
    }
    const arr = fen.split('')
    return arr.map((v, i) => arr[i ^ 56])
}

const defaultFenArray = fen2array(fen2obj(defaultFen).fenString)

const array2fen = arr => compressFen(arr.map((v, i) => arr[i ^56]).join(''))

const computedFenString = array2fen(defaultFenArray)

const thisExports = {
    defaultFen, 
    sicilianFen,
    fen2obj,
    expandFen,
    compressFen,
    fen2array,
    defaultFenArray,
    array2fen,
    computedFenString
}

try {
    eval('export default thisExports')
}
catch(e) {
    console.log(`EXPORT ERROR: ${e.message}`)
}

if (module) {
    module.exports = thisExports
} else {
    exports = thisExports
}