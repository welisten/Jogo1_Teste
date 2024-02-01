import Phaser from "phaser";

import { Game } from "../Consts/SceneKeys";
import * as ImagesKeys from '../Consts/ImagesKeys'
import * as Sizes from '../Consts/Sizes'

export default class Title extends Phaser.Scene{
    preload(){
        this.load.image(ImagesKeys.Background, ImagesKeys.Background_URL)
        this.load.image(ImagesKeys.Rocks_2, ImagesKeys.Rocks2_URL)
        this.load.image(ImagesKeys.Rocks_1, ImagesKeys.Rocks1_URL)
        this.load.image(ImagesKeys.Clouds_1, ImagesKeys.Clouds1_URL)
        this.load.image(ImagesKeys.Clouds_2, ImagesKeys.Clouds2_URL)
        this.load.image(ImagesKeys.Clouds_3, ImagesKeys.Clouds3_URL)
        this.load.image(ImagesKeys.Clouds_4, ImagesKeys.Clouds4_URL)
    }

    create(){
        // const width = this.game.config.width
        // const height = this.game.config.height
        
        const {width, height} = this.scale
        this.bg = this.add.tileSprite(0, 0, width, height, ImagesKeys.Background).setTileScale(1000, 500)
        console.log(width, height, this.bg.width, this.bg.displayOriginX)
        
        // this.rock1 = this.add.tileSprite(0, 200, width * 4, height * 3.4, ImagesKeys.Rocks_1).setScale(0.5)
        // this.rock2 = this.add.tileSprite(0, 0, width * 4, width * 3.4, ImagesKeys.Rocks_2).setScale(0.5)
        // this.clouds1 = this.add.tileSprite(0, 0, width * 4, height * 3.4, ImagesKeys.Clouds_1).setScale(0.5)
        // this.clouds2 = this.add.tileSprite(0, 0, width, height, ImagesKeys.Clouds_2).setOrigin(0, 0).setScale(1.01)
        // this.clouds3 = this.add.tileSprite(0, 0, width, height, ImagesKeys.Clouds_3).setOrigin(0, 0).setScale(1.01)
        // this.clouds4 = this.add.tileSprite(0, 0, width, height, ImagesKeys.Clouds_4).setOrigin(0, 0).setScale(1.01)
        

    }

    update(){
        // this.bg.tilePositionX += 0.1
        // this.rock1.tilePositionX += 0.9
        // this.rock2.tilePositionX += 0.5
        // this.clouds1.tilePositionX += 1.5
        // this.clouds2.tilePositionX += 0.4
        // this.clouds3.tilePositionX += 2
        // this.clouds4.tilePositionX += 0.4
    }
}