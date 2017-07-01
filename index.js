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

function preload() {
  game.load.image('background', './assets/background/grass_680x382.jpg')
  game.load.atlas('human', './assets/human/human.png', './assets/human/human.json')
}

function create() {
  game.world.setBounds(0, 0, 650, 350)
  game.add.sprite(0, 0, 'background')

  //game.physics.startSystem(Phaser.Physics.ARCADE)

  human = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'human')
  human.animations.add('walk_right', Phaser.Animation.generateFrameNames('frame', 87, 95), 9, true)
  human.animations.add('walk_left', Phaser.Animation.generateFrameNames('frame', 69, 77), 9, true)
  human.animations.add('walk_up', Phaser.Animation.generateFrameNames('frame', 60, 68), 9, true)
  human.animations.add('walk_down', Phaser.Animation.generateFrameNames('frame', 78, 86), 9, true)
  //human.animations.play('walk_left', 10, true);
}

function update() {
  game.world.wrap(human, 0, true)

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
  game.debug.spriteInfo(human, 20, 32);
}

//function collectCoin(player, coin) {
//  coin.kill();
//}

