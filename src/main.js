// Ponto de entrada ()

import Phaser from 'phaser'

//  Scenes
import Game from './Scenes/Game.js'
import Preload from './Scenes/Preload'

//  Consts
import * as Sizes from './Consts/Sizes'
import * as SceneKeys from './Consts/SceneKeys'

const config = {
     width: Sizes.DesktopGameWidth,
     height: Sizes.ScreenHeight * 0.7,
     type: Phaser.AUTO,
     backgroundColor: 0x000000,
     parent: 'gameContainer',
     physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
     },
     render:  {
        clearBeforeRender: true
     }
 
}

const game =  new Phaser.Game(config)

// Todas a cenas devem ser adicionadas ao jogo aqui
game.sgcene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.Game, Game)


// Iniciar a primeira cena(Spondo qe todas elas estão encadeadas)
game.scene.start(SceneKeys.Preload, Preload)
