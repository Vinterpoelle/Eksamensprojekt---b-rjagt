let rectX = 2;
let rectY = 4;
let sizeX = 71;
let sizeY = 40;

let strawberries = [];
let particles = [];
let enemies = [];
let player;
let strawberryImage;

let gameState = "startGame"; //VIGTIG, styrer hvilket stadie man er i
let strawberriesToWin = 100;

let restartButton;

function preload() {
  strawberryImage = loadImage('Images/Strawberry.png');
}

function setup() {
  createCanvas(500, 500);
  
  player = new Player(width/2, height/2);
  
  for(let i = 0; i < 1; i++) {
    enemies.push(new Enemy());
  }
  
  //Laver 10 strawberries
  for(let i = 0; i < 10; i++) {
    strawberries.push(new Strawberry());
  }
  
  //Lav color i stedet for fill her, så det bliver css og virker til p5.Element.style
  let c = color(250, 64, 79);
  
  startGameButton = createButton('Start Game');
  startGameButton.position(200, 300);
  startGameButton.size(100, 40);
  startGameButton.style('color', c);
  startGameButton.mousePressed(resetGame);
  startGameButton.hide();
  
  //Her laves gameOver knappen for at restarte
  gameOverButton = createButton('Restart Game');
  gameOverButton.position(200, 300);
  gameOverButton.size(100, 40);
  gameOverButton.mousePressed(resetGame);
  gameOverButton.hide();
  
  //Her laves gameWon knappen for at restarte
  gameWonButton = createButton('Restart Game');
  gameWonButton.position(200, 300);
  gameWonButton.size(100, 40);
  gameWonButton.style('color', c);
  gameWonButton.mousePressed(resetGame);
  gameWonButton.hide();
}

function draw() {
  background(173,255,47);
  
  if(gameState === "startGame") {
    startGameScreen();
  }
  
  if(gameState === "gamePlay") {
    gamePlay(); //Kører funktionen med alle funktionerne, når man spiller
    
    //Lose-condition
    if(player.hp <= 0) {
      gameState = "gameOver";
    }
    
    //Win-condition
    if(player.score >= strawberriesToWin) {
      gameState = "gameWon";
    }
  }
  
  if(gameState === "gameOver") {
    gameOverScreen();
  }
  
  if(gameState === "gameWon") {
    gameWonScreen();
  }
}

function values() { 
  let textX = 4;
  let scoreTextY = 20;
  let hpTextY = 40;
  
  let lineY = 23;
  let lineX2 = 73;
  
  
  if(player.score >= 0) {
    fill(255);
    rect(rectX, rectY, sizeX, sizeY);
    line(rectX, lineY, lineX2, lineY);
    }
  if(player.score >= 10) {
    fill(255);
    rect(rectX, rectY, sizeX + 10, sizeY);
    line(rectX, lineY, lineX2 + 10, lineY);
    }
  if(player.score >= 100) {
    fill(255);
    rect(rectX, rectY, sizeX + 10 * 2, sizeY);
    line(rectX, lineY, lineX2 + 10 * 2, lineY);
    }
  
  textAlign(LEFT);
  textSize(18);
  fill(0);
  text('Score: ' + player.score, textX, scoreTextY);
  
  textAlign(LEFT);
  textSize(18);
  fill(0);
  text('HP: ' + player.hp, textX, hpTextY);
}

function gamePlay() {
  player.Update();
  player.Move();
  player.Show();
  player.Collision();
  
  values();
  
  for(let enemy of enemies) {
    enemy.Seek(player);
    enemy.Seperate(enemies);
    enemy.Update();
    enemy.Move();
    enemy.Show();
    enemy.Collision();
  }
  
  //Sørger for at alle funktioner gælder for hvert strawberry
  for(let strawberry of strawberries) {
    strawberry.Show();
  }
  
  //Baglæns for-løkke for at kunne lave partiklernes funktioner i draw og fjerne dem
  for(let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    
    particle.Update();
    particle.Show();
    
    if(particle.Burnedout()) {
      particles.splice(i, 1);
    }
  }

  if(enemies.length === 1 && player.score >= 50) {
      enemies.push(new Enemy());
  }
}

function startGameScreen() {
  
  fill(255);
  rect(30, 20, 440, 210);
  
  //Overskrift
  textAlign(CENTER);
  textFont('Times New Roman');
  textSize(80);
  fill(250, 64, 79);
  text(' Welcome \n to Berryhunt', 240, 100);
  
  startGameButton.show();
}

function gameOverScreen() {
  background(0);
  
  //Overskrift
  textAlign(CENTER);
  textFont('Times New Roman');
  textSize(100);
  fill(255);
  text('Game Over', 240, 200);
  
  gameOverButton.show();
}

function gameWonScreen() {
  background(173,255,47);
  
  //Overskrift
  textAlign(CENTER);
  textFont('Times New Roman');
  textSize(100);
  fill(250, 64, 79);
  text('Game Won', 240, 200);
  
  gameWonButton.show();
}

function resetGame() {
  gameState = "gamePlay"; //Giv adgang til spilfunktionerne
  
  
  //Reset klasserne til deres start postion
  player = new Player(width/2, height/2);
  
  //Reset particles og strawberries arraysne, ved at erklære dem igen
  strawberries = [];
  particles = [];
  enemies = [];
  
  //Definer strawberries til at have 10 nye tilfældige positioner igen
  for(let i = 0; i < 10; i++) {
    strawberries.push(new Strawberry());
  }
  
  for(let i = 0; i < 1; i++) {
    enemies.push(new Enemy());
  }
  
  startGameButton.hide();
  gameOverButton.hide();
  gameWonButton.hide();
}
