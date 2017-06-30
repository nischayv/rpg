/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/DmTpUFgP
 *
 * This source requires Phaser 2.6.2
 */
const game = new Phaser.Game(400, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

let human
let currentAnimation

function preload() {

  game.load.atlas('human', './assets/human/human.png', './assets/human/human.json')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  human = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'human')
  human.animations.add('walk_right', Phaser.Animation.generateFrameNames('frame', 87, 95), 9, true)
  human.animations.add('walk_left', Phaser.Animation.generateFrameNames('frame', 69, 77), 9, true)
  human.animations.add('walk_up', Phaser.Animation.generateFrameNames('frame', 60, 68), 9, true)
  human.animations.add('walk_down', Phaser.Animation.generateFrameNames('frame', 78, 86), 9, true)
  //human.animations.play('walk_left', 10, true);

}

function update() {
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
  }
}

function render() {
  game.debug.spriteInfo(human, 20, 32);
}
