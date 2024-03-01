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
    isPaused: false
}

export default class Game extends Phaser.Scene
{
    preload(){
        this.load.audio(SongsKey.WaterfallKey, SongsKey.WaterfallURL)
        this.load.audio(SongsKey.KeyFootstepsOnWater, SongsKey.URLFootstepsOnWater)
    }

    init() 
    {
        this.gameState = GameState.Running

        // styles
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"
    }

    create()
    { 
        this.sound.play(SongsKey.WaterfallKey, SongsKey.Config_footstepOnWater)//         RETIRAR CONFIGURAÇÃO DEPOIS
        this.sound.play(SongsKey.KeyFootstepsOnWater, SongsKey.Config_footstepOnWater) //         RETIRAR CONFIGURAÇÃO DEPOIS
       
        const map1 = this.add.tilemap(MapKeys.Map1Key) // -> mapa
        const tileSetM1 = map1.addTilesetImage(MapKeys.TileSetName, MapKeys.TileSetKey)
        const layer1 = map1.createLayer( MapKeys.LayerID.layer1, tileSetM1, 0, 0)
        const layer2 = map1.createLayer( MapKeys.LayerID.layer2, tileSetM1, 0, 0) 
        const layer3 = map1.createLayer( MapKeys.LayerID.layer3, tileSetM1, 0, 0)

        
        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels, true) // limites da camera
        this.cameras.main.setScroll( 0, Sizes.DesktopGameHeight) // configurando posicionamento da camera
        this.physics.world.setBounds(0, 0, Sizes.DesktopGameWidth, Sizes.DesktopGameHeight)

        // criando as animações
        this.createNeededAnimation()
        
        this.player = this.physics.add.sprite(Sizes.DesktopGameWidth / 2 , Sizes.DesktopGameHeight - 40 , CharactersKey.ManUpKey)
        this.player.setBounce(0, 0).setCollideWorldBounds(true);
       
        
        this.collisionObjects = map1.getObjectLayer(MapKeys.ObjectsKeys.WallKey)["objects"] 
        console.log(this.collisionObjects)
        
        this.collisionObjects.forEach(object => {
            this.objRec = this.add.rectangle(object.x, object.y, object.width, object.height).setDisplayOrigin(0)
            this.physics.add.existing(this.objRec, true)
            this.physics.add.collider(this.player, this.objRec)
            console.log(this.collisionObjects, object)

        }) 


        this.sound.play(SongsKey.KeyFootstepsOnWater,  SongsKey.Config_footstepOnWater )
        
        
        this.deer = this.add.sprite( 23 , 37, CharactersKey.DeerStagNeKey)
        this.deer.play(Animation.DeerKey, true)


        this.cursor = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(this.gameState != GameState.Running && !GameState.isPaused)
        {
            return
        }
        
        this.handleMainCharacterMovements()
        this.physics.world.collide(this.player, this.collisionObjects);
        
        this.time.delayedCall(Difficulty.DelayMapScrooling, () => {
            this.handleMapScrolling()
        })

    }

    handleMainCharacterMovements(){

        
        if(this.isScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
        {
            this.player.key = CharactersKey.ManUpKey
            this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
        }
        else if( this.cursor.left.isDown )
        {   
            this.player.key =  CharactersKey.ManLeftKey
            this.player.play(Animation.ManWalkLeftKey, true)
            this.player.setVelocityX(-100)        
        }
        else if (this.cursor.right.isDown)
        {
            this.player.key = CharactersKey.ManRightKey
            this.player.play(Animation.ManWalkRightKey, true)
            this.player.setVelocityX(100)        
        }

        
        if(!this.isScrolling && this.cursor.up.isDown)
        {
            this.player.key = CharactersKey.ManUpKey
            this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
            this.player.setVelocityY(-100)        
        } 
        else if(!this.isScrolling && this.cursor.down.isDown)
        {
            this.player.key = CharactersKey.ManDownKey
            this.player.play(Animation.ManWalkDownKey, true)
            this.player.setVelocityY(100)        
        }
    }

    handleMapScrolling(){
        this.isScrolling = false

        if(this.cameras.main.scrollY > 0){
            
            this.cameras.main.scrollY -= Difficulty.SpeedMapScrolling
            this.isScrolling = true

            this.player.y -= Difficulty.CharacterSpeed
        } else {
            
            this.isScrolling = false
            this.sound.stopByKey(SongsKey.KeyFootstepsOnWater)
        }

    }

    createNeededAnimation() {
        const ManWalkUpConfig = {
            key: Animation.ManWalkUpKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: 0,
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

        const ManWalkDownConfig = {
            key: Animation.ManWalkDownKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManDownKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkDownConfig)

        const DeerStangNeConfig = {
            key: Animation.DeerKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.DeerStagNeKey, {frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: -1,
        }
        this.anims.create(DeerStangNeConfig)

    }
    
}