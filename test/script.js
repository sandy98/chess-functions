const g = new Chess();
showValues();

function showAscii() {
  alert(g.mini_ascii());
};

function showPgn() {
  alert(g.pgn());
}

function doMove(e) {
  const result = g.move(e.target.value);
  if (result) {
    showValues();
  } else {
    alert('Wrong move: ' + e.target.value);
  }
  e.target.value = '';
}

function undoMove() {
  if (g.undo()) {
    showValues();
  } else {
    alert('No moves to be undone!');
  }
}

function resetGame() {
  g.reset();
  showValues();
}

function showValues() {
  document.querySelector('#version').innerText = 'Version: ' + (g.versioo || '1.0.0');
  document.querySelector('#fen').innerText = g.fen;
  document.querySelector('#moves').innerText = g.pgn_moves('\n', 30);
  document.querySelector('#chk-check').checked = g.isCheck;
  document.querySelector('#chk-checkmate').checked = g.isCheckMate;
  document.querySelector('#avail-moves').innerText = g.moves().join(' - ');
  document.querySelector('#btn-undo').disabled = g.history().length < 1;
}

document.querySelector('#ascii').addEventListener('click', showAscii);
document.querySelector('#pgn').addEventListener('click', showPgn);
document.querySelector('#txt-san').addEventListener('change', doMove);
document.querySelector('#btn-undo').addEventListener('click', undoMove);
document.querySelector('#btn-reset').addEventListener('click', resetGame);