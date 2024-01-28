// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
                                                // ATENCION
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SongsKey from '../Consts/SongsKey'



const GameState = {
    Running: 'running',
    Finished: 'finished',
    paused: false
}

export default class Game extends Phaser.Scene
{
    init() 
    {
        this.gameState = GameState.Running

        // styles
        const gameCanvas = this.sys.game.canvas;
        gameCanvas.style.border = "5px solid #8e44ad";
        gameCanvas.style.borderRadius = "20px"
    }

    create()
    {
       
        const map1 = this.add.tilemap(MapKeys.Map1Key) // -> mapa
        const tileSetM1 = map1.addTilesetImage(MapKeys.TileSetName, MapKeys.TileSetKey)
        
        const b1 = map1.createLayer( MapKeys.LayerID.layer1, tileSetM1, 0, 0)
        const b2 = map1.createLayer( MapKeys.LayerID.layer2, tileSetM1, 0, 0) 
        const b3 = map1.createLayer( MapKeys.LayerID.layer3, tileSetM1, 0, 0)

        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels, true) // limites da camera
        this.cameras.main.setScroll( 0, Sizes.DesktopGameHeight) // configurando posicionamento da camera
        
        this.physics.world.setBounds(256, 0, Sizes.DesktopGameWidth - 256, Sizes.DesktopGameHeight)

        this.sound.play(SongsKey.WaterfallKey, SongsKey.WaterfallConfig)
        
        // criando as animações
        this.createNeededAnimation()

        this.player = this.add.sprite(Sizes.DesktopGameWidth / 2 , Sizes.DesktopGameHeight - 40 , CharactersKey.ManUpKey)
        this.player.play(Animation.ManWalkUpKey, true)
        this.sound.play(SongsKey.KeyFootstepsOnWater, SongsKey.Config_footstepOnWater)
        
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
        
    
        // this.time.delayedCall(Difficulty.DelayMapScrooling, () => this.handleMapScrolling())
    }

    handleMainCharacterMovements(){
        if( !this.cursor.left.isDown && !this.cursor.right.isDown)
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
        // console.log(this.cameras.main.scrollY)
        if(this.cameras.main.scrollY > 0){
            
            this.player.y -= Difficulty.CharacterSpeed
        } else {
            this.player.anims.stop()
            this.sound.stopByKey(SongsKey.KeyFootstepsOnWater)
        }

    }

    createNeededAnimation() {
        const ManWalkUpConfig = {
            key: Animation.ManWalkUpKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: Animation.manUp_repeatConfig,
        }
        this.anims.create(ManWalkUpConfig)
        
        const ManWalkLeftConfig = {
            key: Animation.ManWalkLeftKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManLeftKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeftConfig)
        
        const ManWalkRightConfig = {
            key: Animation.ManWalkRightKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManRightKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRightConfig)

        const DeerStangNeConfig = {
            key: Animation.DeerKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.DeerStagNeKey, {frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: -1,
        }
        this.anims.create(DeerStangNeConfig)
    }
    
}