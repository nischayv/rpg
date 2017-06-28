/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/DmTpUFgP
 *
 * This source requires Phaser 2.6.2
 */

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

  this.game.load.atlas('human', './assets/human/human.png', './assets/human/human.json');
}

function create() {

  //var human_walk_right = game.add.sprite(300, 300, 'walk_right');
  //var walk = human_walk_right.animations.add('walk');
  //human_walk_right.animations.play('walk', 10, true);
  this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'human');
  this.sprite.animations.add('dying', Phaser.Animation.generateFrameNames('frame', 87, 95), 9, true);
  this.sprite.animations.play('dying', 10, true);

}

function update() {

}

function render() {

}
