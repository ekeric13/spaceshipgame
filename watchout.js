// start slingin' some d3 here.
var scoreCount = 0;
var highScoreCount = 0;
var collisionCount = 0;
var timerOn = false;
var radius = 1;
var playerText = "";
document.getElementById('powerMusic').muted = true;
// audio.style("display", "none")
// console.log(scoreCount)

// build board
var board = d3.select(".board")
                .append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .on({"mousemove": scoreIncrease})
                .style("border", "3px solid black")


// build player
// make player move
// build enemies



var Enemy = function(numEnemies1, numEnemies2){
  console.log(this);
  this.datum = [];
  this.datum2 = [];
  this.numEnemies1 = numEnemies1;
  this.numEnemies2 = numEnemies2;
  this.shield = 1;

}

Enemy.prototype.createEnemy = function(){

  for (var i = 0; i < this.numEnemies1; i++){
    var x = Math.random() * 600;
    var y = Math.random() * 600;
    this.datum[i] = {"x": x, "y":  y };
  };

  var enemy = board.selectAll("circle")
                    .data(this.datum)
                    .enter()
                    .append("circle")
                    .attr("class", "enemy")
                    .attr("cx", function(d){ return d.x})//Math.random() * 500)
                    .attr("cy", function(d){ return d.y})//Math.random() * 500)
                    .attr("r", "15px")
                    .attr("fill", "red")
                    .on({"mouseover": increaseCollionCount})

  for (var j = 0; j < this.numEnemies2; j++){
    var x = Math.random() * 500;
    var y = Math.random() * 500;
    this.datum2[j] = {"x": x, "y":  y };
  };

  var enemy2 = board.selectAll(".enemy2")
                    .data(this.datum2)
                    .enter()
                    .append("circle")
                    .attr("class", function(d, i){return 'enemy2'+ i})
                    .attr("cx", function(d){ return d.x})//Math.random() * 500)
                    .attr("cy", function(d){ return d.y})//Math.random() * 500)
                    .attr("r", "15px")
                    .attr("fill", "black")
                    .on({"mouseover": increaseCollionCount})


    var shield = board.selectAll(".shield")
                      .data([{"x": Math.random() * 500, "y" : Math.random() * 500, "value" : "shield"}])
                      .enter();

    shield.append("circle")
      .attr("class", "shield")
      .attr("cx", function(d){return d.x} )
      .attr("cy", function(d){return d.y} )
      .attr("r", "15px")
      .attr("fill", "green")
      .on({"click" : powerUp});


   shield.append("text")
      .attr("class", "shield-text")
     .attr("x", function(d){ return d.x})
     .attr("y", function(d){ return d.y})
     .attr("dx", "-1.25em")
     .attr("dy", "-1.25em")
     .text(function(d) { return d.value })
     .style("font-size", 10)
     .style("color", "black")



}

Enemy.prototype.moveEnemy = function(){

  var changePosition = d3.selectAll(".enemy")
                          .data(this.datum)
                          .transition().duration(1500)
                          .attr("cx", function(d){return Math.random() * 600})
                          .attr("cy", function(d){return Math.random() * 600});

  var changePosition2 = d3.select(".enemy20")
                          .data(this.datum2)
                          .transition().duration(500)
                          .attr("cx", function(d){return d3.select(".player").attr("cx")})
                          .attr("cy", function(d){return d3.select(".player").attr("cy")})



// give each enemy2 different transition
}

Enemy.prototype.moveEnemy2 = function(){

  var changePosition3 = d3.select(".enemy21")
                          .data(this.datum2)
                          .transition().duration(1000)
                          .attr("cx", function(d){return d3.select(".player").attr("cx")})
                          .attr("cy", function(d){return d3.select(".player").attr("cy")})

  var changePosition3 = d3.select(".enemy22")
                          .data(this.datum2)
                          .transition().duration(1250)
                          .attr("r", "40px")
                          .attr("cx", function(d){return d3.select(".player").attr("cx")})
                          .attr("cy", function(d){return d3.select(".player").attr("cy")})

}




function scoreIncrease(){
  d3.select(".player").remove();
  d3.select(".player-text").remove();

  var xMouse = d3.mouse(this)[0];
  var yMouse = d3.mouse(this)[1];
  // console.log(xMouse, yMouse)


  var player = board.append("circle")
        .attr("class", "player")
        .attr("cx", xMouse)
        .attr("cy", yMouse - 7)
        .attr("fill", "blue")
        .attr("r", radius)

var text = board.append("text")
      .attr("class", "player-text")
      .attr("x", xMouse)
      .attr("y", yMouse)
      .attr("dx", "-1em")
      .attr("dy", "-1.25em")
      .style("font-size", 10)
      .style("color", "black")
      .text(playerText)


  scoreCount++;
  highScoreCount = highScoreCount > scoreCount ? highScoreCount : scoreCount
  var currentScore = d3.select(".current").select("span").text(scoreCount);//select("span").attr("span", 5);
  var highScore = d3.select(".high").select("span").text(highScoreCount);
  window.clearInterval(clearScoreTimer)
  initiateClearScore();

}

function increaseCollionCount(){
  scoreCount = 0;
  collisionCount++;
  var collision = d3.select(".collisions").select("span").text(collisionCount)
  //debugger
  var xMouse = d3.mouse(this)[0];


  var shield = board.selectAll(".shield")
                      .data([{"x": Math.random() * 500, "y" : Math.random() * 500, "value" : "shield"}])
                      .enter();

    shield.append("circle")
      .attr("class", "shield")
      .attr("cx", function(d){return d.x} )
      .attr("cy", function(d){return d.y} )
      .attr("r", "15px")
      .attr("fill", "green")
      .on({"click" : powerUp});


   shield.append("text")
      .attr("class", "shield-text")
     .attr("x", function(d){ return d.x})
     .attr("y", function(d){ return d.y})
     .attr("dx", "-1.25em")
     .attr("dy", "-1.25em")
     .text(function(d) { return d.value })
     .style("font-size", 10)
     .style("color", "black")

}

function powerUp() {
  radius = 40;
  setPlayerText();
  setTimeout(setRadius, 5000);
  d3.select(".shield").remove()
  d3.select(".shield-text").remove()
  // d3.select(".mainMusic").remove()
  document.getElementById('gameMusic').muted = true;
  document.getElementById('powerMusic').muted = false;
  // d3.select("#gameMusic").pause();
  // d3.select(".power-music")
  //     .append("embed id="gameMusic" src="gameMusic.mp3" loop="true" autostart="false">")


}
var clearPlayerText;
var setPlayerText = function(){
  playerText = 5;
  clearPlayerText = setInterval(function(){playerText--}, 1000)
}

var setRadius = function(){
  radius = 1;
  window.clearInterval(clearPlayerText);
  playerText = "";
  document.getElementById('gameMusic').muted = false;
  document.getElementById('powerMusic').muted = true;

  // pauseVid()

  // d3.select(".game-music")
  //       .append("embed")
  //       .attr("class", ".game-music")
  //       .attr("src", "gameMusic.mp3")
  //       .attr("loop", "true")
  //       .attr("autostart", "false")
}
// var audio = document.getElementById("gameMusic")
// function pauseVid() {
//     audio.pause();
// }


var newEnemies = new Enemy(20, 5)
newEnemies.createEnemy();

// setInterval(console.log(newEnemies.datum[0].x), 10)



// setTimeout(, 2000)
//console.log(d3.mouse(board))

setInterval(Enemy.prototype.moveEnemy.bind(newEnemies), 1500)
setInterval(Enemy.prototype.moveEnemy2.bind(newEnemies), 500)




var clearScore = function(){
  scoreCount = 0
}
// var clearScoreTimer = function(){

// }
var clearScoreTimer;
var initiateClearScore = function(){
  clearScoreTimer = setInterval(clearScore, 1500)
}
initiateClearScore();


 // setTimeout(clearScore, 2000);
// setInterval(clearScoreTimer, 3000)
// setInterval(checkCollision, 20)


// make enemies move
// detect collision
