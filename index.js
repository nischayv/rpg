(function() {
  const game = new Phaser.Game(650, 350, Phaser.CANVAS, "game");
  game.state.add("Menu", menu)
  game.state.add("TheGame", theGame)
  game.state.start("Menu")
})()