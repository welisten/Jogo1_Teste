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
     },
     input: {
      touch: false,
      keyboard: true
     }
}

const game =  new Phaser.Game(config)

// Todas a cenas devem ser adicionadas ao jogo aqui
game.scene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.Game, Game)


// Iniciar a primeira cena(Spondo qe todas elas estão encadeadas)
game.scene.start(SceneKeys.Game)
