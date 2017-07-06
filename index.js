/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/DmTpUFgP
 *
 * This source requires Phaser 2.6.2
 */
const game = new Phaser.Game(650, 350, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

let human
let currentAnimation
let coins
let coinCount = 0

function preload() {
  game.load.image('background', './assets/background/grass_680x382.jpg')
  game.load.atlas('human', './assets/human/human.png', './assets/human/human.json')
  game.load.spritesheet('coin', './assets/misc/coin.png', 32, 32)
}

function create() {
  game.world.setBounds(0, 0, 650, 350)
  game.add.sprite(0, 0, 'background')
  game.physics.startSystem(Phaser.Physics.ARCADE)

  human = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'human')
  human.animations.add('walk_right', Phaser.Animation.generateFrameNames('frame', 87, 95), 9, true)
  human.animations.add('walk_left', Phaser.Animation.generateFrameNames('frame', 69, 77), 9, true)
  human.animations.add('walk_up', Phaser.Animation.generateFrameNames('frame', 60, 68), 9, true)
  human.animations.add('walk_down', Phaser.Animation.generateFrameNames('frame', 78, 86), 9, true)
  game.physics.arcade.enable(human)
  human.count = 0

  human.health = 50
  human.maxHealth = 100

  const playerHealthMeter = game.add.plugin(Phaser.Plugin.HealthMeter)
  playerHealthMeter.bar(
    human,
    {x: 20, y: 100, width: 100, height: 20}
  )

  coins = game.add.group()
  coins.enableBody = true
  //  Add animations to all of the coin sprites
  coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  //coins.callAll('animations.play', 'animations', 'spin');
  for(let i = 0; i < 5; i++) {
    // Create each coin and add it to the group.
    const coin = game.add.sprite(0, 0, 'coin')
    coins.add(coin)
    coin.anchor.setTo(0.5, 0.5)
    game.physics.enable(coin, Phaser.Physics.ARCADE)
    coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true)
    coin.kill();
  }
}

function update() {
  game.world.wrap(human, 0, true)
  game.physics.arcade.overlap(human, coins, collectCoin, null, this)
  generateCoins()

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    human.x -= 4;
    human.animations.play('walk_left', 10, true)
    currentAnimation = 'walk_left'
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    human.x += 4;
    human.animations.play('walk_right', 10, true)
    currentAnimation = 'walk_right'
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    human.y -= 4;
    human.animations.play('walk_up', 10, true)
    currentAnimation = 'walk_up'
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    human.y += 4;
    human.animations.play('walk_down', 10, true)
    currentAnimation = 'walk_down'
  } else {
    human.animations.stop(currentAnimation)
    switch (currentAnimation) {
      case 'walk_left':
        human.frame = 69
        break
      case 'walk_right':
        human.frame = 87
        break
      case 'walk_up':
        human.frame = 60
        break
      case 'walk_down':
        human.frame = 78
        break
      default:
        human.frame = 78
    }
  }
}

function render() {
  //game.debug.spriteInfo(human, 20, 32)
  game.debug.text('Coins: '+ human.count, 32, 32);
}

// Should keep generating coins randomly to maintain a certain number of coins
function generateCoins() {
  if (coinCount < 5) {
    const coin = coins.getFirstDead()
    if (coin === null || typeof coin === 'undefined') return
    coin.revive()
    coin.reset(getRandomInt(630), getRandomInt(330))
    ++coinCount
    coin.animations.play('spin', 10, true)
  }
}

function getRandomInt(max) {
  const num = Math.floor(Math.random() * (max - 20 + 1)) + 20
  return num
}

function collectCoin(player, coin) {
  coin.kill()
  if (player.count) {
    player.count += 1
  } else {
    player.count = 1
  }
  setTimeout(() => {
    --coinCount
  }, 5000)
}
