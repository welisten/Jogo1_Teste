import Phaser from "phaser";

import { Game } from "../Consts/SceneKeys";
import * as ImagesKeys from '../Consts/ImagesKeys'
import * as SongsKey from '../Consts/SongsKey'

export default class Title extends Phaser.Scene{
    preload(){
        this.load.audio(SongsKey.MusicG1Key, SongsKey.MusicG1URL, SongsKey.MusicG1Config)
        this.load.image(ImagesKeys.Background, ImagesKeys.Background_URL)
        this.load.image(ImagesKeys.Rocks_2, ImagesKeys.Rocks2_URL)
        this.load.image(ImagesKeys.Rocks_1, ImagesKeys.Rocks1_URL)
        this.load.image(ImagesKeys.Clouds_1, ImagesKeys.Clouds1_URL)
        this.load.image(ImagesKeys.Clouds_2, ImagesKeys.Clouds2_URL)
        this.load.image(ImagesKeys.Clouds_3, ImagesKeys.Clouds3_URL)
        this.load.image(ImagesKeys.Clouds_4, ImagesKeys.Clouds4_URL)

        this.load.image(ImagesKeys.Logo2, ImagesKeys.Logo2_URL)
        this.load.image(ImagesKeys.RecStart, ImagesKeys.RecStart_URL)
    }
    init(){
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #C4E538";
        gameCanvas.style.borderRadius = "20px"
    }

    create(){

        this.sound.play(SongsKey.MusicG1Key)

        const {width, height} = this.scale

        this.bg = this.add.tileSprite(0, 0, 1920, 1080, ImagesKeys.Background).setTileScale(0.42, 0.56).setOrigin(0)
        this.rock1 = this.add.tileSprite(0, -100, 1920, 1080, ImagesKeys.Rocks_1).setTileScale(0.42, 0.56).setOrigin(0)
        this.rock2 = this.add.tileSprite(0, -100, 1920, 1080, ImagesKeys.Rocks_2).setTileScale(0.42, 0.56).setOrigin(0)
        this.clouds1 = this.add.tileSprite(0, 0, 1920, 1080, ImagesKeys.Clouds_1).setTileScale(0.42, 0.56).setOrigin(0)
        this.clouds2 = this.add.tileSprite(0, 0, 1920, 1080, ImagesKeys.Clouds_2).setTileScale(0.42, 0.56).setOrigin(0)
        this.clouds3 = this.add.tileSprite(0, 0, 1920, 1080, ImagesKeys.Clouds_3).setTileScale(0.42, 0.56).setOrigin(0)
        this.clouds4 = this.add.tileSprite(0, 0, 1920, 1080, ImagesKeys.Clouds_4).setTileScale(0.42, 0.56).setOrigin(0)
        
        this.logo = this.add.image(width * 0.5, height * 0.4, ImagesKeys.Logo2)
                            .setOrigin(0.5)
                            .setAlpha(0)
                            .setScale(.69)

        this.text = this.add.image(width * 0.5, height * 0.85, ImagesKeys.RecStart)
                            .setOrigin(.5)
                            .setScale(0.6)
                            .setAlpha(0)

        this.time.delayedCall(3000, () =>  {
            this.tweens.add({
                targets: this.logo,
                alpha: 1,
                duration: 3000,
                ease: 'Linear',
                yoyo: false,
                repeat: 0
            })
            this.time.delayedCall(1500, () => {
                
                this.tweens.add({
                    targets: this.text,
                    alpha: 1,
                    duration: 3000,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                })
                this.tweens.add({
                    targets: this.text,
                    scale: 0.65,
                    repeat: -1,
                    yoyo: true,
                    ease: 'Linear'
                })
            })
        })
        
    }

    update(){
        this.bg.tilePositionX += 0.1
        this.rock1.tilePositionX += 1.9
        this.rock2.tilePositionX += 1
        this.clouds1.tilePositionX += 0.3
        this.clouds2.tilePositionX += 1.5
        this.clouds3.tilePositionX += 0.5
        this.clouds4.tilePositionX += 2.5

        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.stopAll( )
            this.scene.start(Game)
        })
    }
}