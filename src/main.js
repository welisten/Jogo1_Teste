// Ponto de entrada ()

import Phaser from 'phaser'

//  Scenes
import Game from './Scenes/Game.js'
import Preload from './Scenes/Preload'

//  Consts
import * as Sizes from './Consts/Sizes'
import * as SceneKeys from './Consts/SceneKeys'

const config = {
     width: Sizes.GameWidth,
     height: Sizes.ScreenHeight * 0.8,
     type: Phaser.AUTO,
     backgroundColor: 0x000000,
     parent: 'gameContainer',
     physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
     },
     render:  {
        clearBeforeRender: true
     }
}

const game =  new Phaser.Game(config)

// All the scenes must to be added here
game.scene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.Game, Game)


// start the first scene(supposing all of them are chained)
game.scene.start(SceneKeys.Game)
