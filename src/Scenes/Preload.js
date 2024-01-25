// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { Game } from "../Consts/SceneKeys";
import * as MapKeys from '../Consts/MapKeys'
import * as CharactersKey from '../Consts/CharacterKeys'

import characterLeft from '../assets/characters/character-left.png'
import characterRight from '../assets/characters/character-right.png'
import characterUp from '../assets/characters/character-up.png'
import DeerStagNe from '../assets/characters/deer_stag_NE.png'

export default class Preload extends Phaser.Scene{
    preload(){

    }

    create(){

        // const map = this.add.tilemap(MapKeys.MapKey) // -> mapa
        // const overworldSet = map.addTilesetImage(MapKeys.OverworldSetName, MapKeys.OverworldSetKey) // assets para criação do mapa
        // const atlasSet = map.addTilesetImage(MapKeys.AtlasSetName, MapKeys.AtlasSetKey) 
        // const tiled_packedSet = map.addTilesetImage(MapKeys.Tiles_PackedSetName, MapKeys.Tiles_PackedSetKey) 
        
        // const base1 = map.createLayer('ground', overworldSet, 0, 0) // camadas do mapa feita no TILED e referenciadas no JSON(Mapa)
        // const base2 = map.createLayer('objects', [overworldSet, atlasSet, tiled_packedSet], 0, 0)
        // const base3 = map.createLayer('details', [overworldSet, atlasSet, tiled_packedSet], 0, 0)

        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true) // limites da camera
        // this.cameras.main.setScroll( 0, Sizes.DesktopGameHeight) 
        // this.scene.start(Game)
    }
}