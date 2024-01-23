import Phaser from "phaser";

// consts
import { Game } from "../Consts/SceneKeys";
import * as MapKeys from '../Consts/MapKeys'

export default class Preload extends Phaser.Scene{
    preload(){
        this.load.image("main-tile", "../../public/assets/tilesets/overworld.png")
    }

    create(){
        this.scene.start(Game)
    }
}