//nowa gra //

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// wybór gracza //

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock'); });
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });

// -- logika gry -- //

// wartości początkowe //

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// -- elementy gry -- //

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    gameWinner = document.getElementById('js-gameWinner');


// statusy gry //

// statusy gry //

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        gameWinner.style.display = 'none';
      break;
    case 'ended':
        newGameElem.style.display = 'block';
        newGameBtn.innerText = 'Jeszcze raz';
        gameWinner.style.display = 'block';
        resultsElem.style.display = 'none';
        pickElem.style.display = 'none';
      break;
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        gameWinner.style.display = 'none';

  }
}

setGameElements();

// rozpoczęcie gry //

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

    setGameElements();

function newGame() {
  player.name = prompt('Wprowadź imię', 'imię gracza');
  clear();

  if (player.name) {
    player.score = computer.score = 0;

    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    }

}



// wybór komputera //

function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random()*3)];
}

// -- dodajemy na stronę -- //

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner (playerPick, computerPick);

  setGamePoints();
}

// logika gry

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
    checkGameWinner ();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner (){

    if (player.score == 10) {
      gameState = 'ended';
      setGameElements();
      gameWinner.innerHTML = "Gratulacje! " + player.name + " wygrywa!";

    } else if (computer.score == 10) {
      gameState = 'ended';
      setGameElements();
      gameWinner.innerHTML = "Niestety, tym razem wygrywa maszyna" ;
    }
}


function clear() {
  playerPointsElem.innerHTML = 0;
  computerPointsElem.innerHTML = 0;
  playerPickElem.innerHTML = "Player selection";
  computerPickElem.innerHTML = "Computer selection";
  playerResultElem.innerHTML = "Player score";
  computerResultElem.innerHTML = "Computer score";
}
