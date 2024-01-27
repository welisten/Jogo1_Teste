// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'

import characterLeft from '../../public/assets/characters/character-left.png'
import characterRight from '../../public/assets/characters/character-right.png'
import characterUp from '../../public/assets/characters/character-up.png'
import DeerStagNe from '../../public/assets/characters/deer_stag_NE.png'

const GameState = {
    Running: 'running',
    Finished: 'finished',
    paused: false
}

export default class Game extends Phaser.Scene
{
    init() {
        this.gameState = GameState.Running
    }
    create(){
       
        const gameCanvas = this.sys.game.canvas;
        gameCanvas.style.border = "5px solid #8e44ad"; // Adiciona uma borda preta de 2px
        gameCanvas.style.borderRadius = "20px"

        const map1 = this.add.tilemap(MapKeys.Map1Key, {}) // -> mapa
        const tileSetM1 = map1.addTilesetImage(MapKeys.TileSetName, MapKeys.TileSetKey)
        
        const b1 = map1.createLayer( "b1", tileSetM1, 0, 0)
        const b2 = map1.createLayer( 'b2', tileSetM1, 0, 0) 
        const b3 = map1.createLayer( "b3", tileSetM1, 0, 0)

        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels, true) // limites da camera
        this.cameras.main.setScroll( 0, Sizes.DesktopGameHeight) // configurando posicionamento da camera
        
        // criando as animações
        this.createNeededAnimation()

        this.player = this.add.sprite(Sizes.DesktopGameWidth / 2 , Sizes.DesktopGameHeight - 20 , CharactersKey.ManUpKey)
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
        
        this.handleMainCharacterMovements()
    
        this.time.delayedCall(Difficulty.DelayMapScrooling, () => this.handleMapScrolling())
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

    createNeededAnimation() {
        const ManWalkUp = {
            key: Animation.ManWalkUpKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: -1,
        }
        this.anims.create(ManWalkUp)
        
        const ManWalkLeft = {
            key: Animation.ManWalkLeftKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManLeftKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeft)
        
        const ManWalkRight = {
            key: Animation.ManWalkRightKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManRightKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRight)

        const DeerStangNe = {
            key: Animation.DeerKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.DeerStagNeKey, {frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: -1,
        }
        this.anims.create(DeerStangNe)
    }
    
}