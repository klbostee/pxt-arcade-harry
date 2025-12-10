controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sound = 1 - sound
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sound == 1) {
        music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
    }
    projectile = sprites.createProjectileFromSprite(assets.image`Projectile`, Harry_Potter, 74, 0)
})
info.onScore(7, function () {
    effects.blizzard.endScreenEffect()
    effects.confetti.startScreenEffect()
    kermis.playFirstPartOfKermisChorus()
    music.rest(music.beat(BeatFraction.Half))
    kermis.playSecondPartOfKermisChorus()
    effects.confetti.endScreenEffect()
    effects.blizzard.startScreenEffect()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sound == 1) {
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    }
    info.changeScoreBy(1)
    otherSprite.destroy(effects.fire, 500)
    pause(500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sound == 1) {
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    }
    info.changeLifeBy(-1)
    sprite.startEffect(effects.ashes)
    scene.cameraShake(4, 500)
    pause(500)
})
let Voldemort: Sprite = null
let projectile: Sprite = null
let Harry_Potter: Sprite = null
let sound = 0
sound = 0
effects.blizzard.startScreenEffect()
scene.setBackgroundImage(assets.image`Background`)
Harry_Potter = sprites.create(assets.image`Harry Potter`, SpriteKind.Player)
controller.moveSprite(Harry_Potter)
Harry_Potter.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(1000, function () {
    Voldemort = sprites.create(assets.image`Voldemort`, SpriteKind.Enemy)
    Voldemort.setPosition(160, randint(0, 120))
    Voldemort.setVelocity(-1 * info.score() + -90, 0)
})
