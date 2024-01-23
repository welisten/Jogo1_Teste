// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { Game } from "../Consts/SceneKeys";
import * as MapKeys from '../Consts/MapKeys'
import * as CharactersKey from '../Consts/CharacterKeys'

export default class Preload extends Phaser.Scene{
    preload(){
        this.load.image(MapKeys.TileSetKey, './assets/tilesets/overworld.png')
        this.load.tilemapTiledJSON(MapKeys.MapKey, './assets/map/teste.json')

       
    }

    create(){
        this.scene.start(Game)
    }
}