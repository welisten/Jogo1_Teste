// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'

const GameState = {
    Running: 'running',
    Finished: 'finished',
    paused: false
}

export default class Game extends Phaser.Scene
{
    preload(){
        this.load.image(MapKeys.TileSetKey, './assets/tilesets/overworld.png')

        this.load.tilemapTiledJSON(MapKeys.MapKey, './assets/map/teste.json')
    }

    init() {
        this.gameState = GameState.Running
    }
    create(){

        const map = this.add.tilemap(MapKeys.MapKey)
        const tiles = map.addTilesetImage(MapKeys.TileSetName, MapKeys.TileSetKey)
        const base1Layer = map.createLayer('base1', tiles, 0, 0)
        const base2Layer = map.createLayer('base2', tiles, 0, 0)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true)
        this.cameras.main.setScroll( 0, Sizes.GameHeight)

   

        this.cursor = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(this.gameState != GameState.Running)
        {
            return
        }

        const delayMap = 1000
        this.time.delayedCall(delayMap, () => this.handleMapScrolling())
    }

    handleMapScrolling(){
        const speed = Difficulty.SpeedMapScrolling

        this.cameras.main.scrollY -= speed

    }
}