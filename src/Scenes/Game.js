// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'

import * as CharactersKey from '../Consts/CharacterKeys'
import characterLeft from '../assets/characters/character-left.png'
import characterRight from '../assets/characters/character-right.png'
import characterUp from '../assets/characters/character-up.png'
import DeerStagNe from '../assets/characters/deer_stag_NE.png'

const GameState = {
    Running: 'running',
    Finished: 'finished',
    paused: false
}

export default class Game extends Phaser.Scene
{
    preload(){
        this.load.image(MapKeys.TileSetKey, '../assets/tilesets/overworld.png')
        this.load.tilemapTiledJSON(MapKeys.MapKey, '../assets/map/teste.json')
        

        this.load.spritesheet(CharactersKey.ManUpKey, characterUp,
            {
                frameWidth: 16,
                frameHeight: 32
            }, 4)

        this.load.spritesheet(CharactersKey.ManRightKey, characterRight,
            {
                frameWidth: 16,
                frameHeight: 32
            }, 4)

        this.load.spritesheet(CharactersKey.ManLeftKey, characterLeft,
            {
                frameWidth: 16,
                frameHeight: 32
            }, 4)

        this.load.spritesheet(CharactersKey.DeerStagNeKey, DeerStagNe,
            {
                frameWidth: 32,
                frameHeight: 41
            }, 24)
    }
    
    init() {
        this.gameState = GameState.Running
    }
    create(){
        const map = this.add.tilemap(MapKeys.MapKey) // -> mapa
        const tiles = map.addTilesetImage(MapKeys.TileSetName, MapKeys.TileSetKey) // assets para criação do mapa
        
        map.createLayer('base1', tiles, 0, 0) // camadas do mapa feita no TILED e referenciadas no JSON(Mapa)
        map.createLayer('base2', tiles, 0, 0)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true) // limites da camera
        this.cameras.main.setScroll( 0, Sizes.GameHeight) // configurando posicionamento da camera
        
        createNeededAnimation() // criando as animações

        this.player = this.add.sprite(Sizes.GameWidth / 2 , Sizes.GameHeight - 20 , CharactersKey.ManUpKey)
        this.player.play(Animation.ManWalkUpKey, true)
        
        this.deer = this.add.sprite( 23 , 37, CharactersKey.DeerStagNeKey)
        this.deer.play(Animation.DeerKey, true)


        this.cursor = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(this.gameState != GameState.Running)
        {
            return
        }
        
        handleMainCharacterMovements()
    
        this.time.delayedCall(Difficulty.DelayMap, () => this.handleMapScrolling())
    }

    handleMainCharacterMovements(){
        if( !this.cursor.left.isDown && !this.cursor.right.isDown )
        {
            this.player.key = CharactersKey.ManUpKey
            this.player.play(Animation.ManWalkUpKey, true)
        }
        else if( this.cursor.left.isDown )
        {   
            this.player.key =  CharactersKey.ManLeftKey
            this.player.play(Animation.ManWalkLeftKey, true)
            this.player.x -= Difficulty.CharacterSpeed
        }
        else if (this.cursor.right.isDown)
        {
            this.player.key = CharactersKey.ManRightKey
            this.player.play(Animation.ManWalkRightKey, true)
            this.player.x += Difficulty.CharacterSpeed
        }
    }

    handleMapScrolling(){
        this.cameras.main.scrollY -= Difficulty.SpeedMapScrolling
    }

    createNeededAnimation(){
        const ManWalkUp = {
            key: Animation.ManWalkUpKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.FrameRate, 
            repeat: -1,
        }
        this.anims.create(ManWalkUp)
        
        const ManWalkLeft = {
            key: Animation.ManWalkLeftKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManLeftKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.FrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeft)
        
        const ManWalkRight = {
            key: Animation.ManWalkRightKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManRightKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.FrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRight)

        const DeerStangNe = {
            key: Animation.DeerKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.DeerStagNeKey, {frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}),
            frameRate: Difficulty.FrameRate,
            repeat: -1,
        }
        this.anims.create(DeerStangNe)
    }
    
}