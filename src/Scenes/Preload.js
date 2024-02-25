// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { Game } from "../Consts/SceneKeys";
import { Title } from "../Consts/SceneKeys";

import * as MapKeys from '../Consts/MapKeys'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SongsKey from '../Consts/SongsKey'
export default class Preload extends Phaser.Scene{
    preload(){
        // MAP
        this.load.image(MapKeys.TileSetKey, MapKeys.TilesSetURL)
        this.load.tilemapTiledJSON(MapKeys.Map1Key, MapKeys.Map1URL)
        
        // CHARACTERS
        this.load.spritesheet(
            CharactersKey.ManUpKey, 
            CharactersKey.ManUpURL, 
            CharactersKey.ManUp_FrameSettings,
            CharactersKey.ManUp_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManDownKey, 
            CharactersKey.ManDownURL, 
            CharactersKey.ManDown_FrameSettings,
            CharactersKey.ManDown_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManRightKey,
            CharactersKey.ManRightURL,
            CharactersKey.ManRight_FrameSettings,
            CharactersKey.ManRight_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManLeftKey,
            CharactersKey.ManLeftURL,
            CharactersKey.ManLeft_FrameSettings,
            CharactersKey.ManLeft_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.DeerStagNeKey,
            CharactersKey.DeerStagNeURL,
            CharactersKey.DeerStagNe_FrameSettings,
            CharactersKey.DeerStagNe_FrameAmount
        )
    }
    

    create(){

        // const map = this.add.tilemap(MapKeys.Map1Key) // -> mapa
        // const overworldSet = map.addTilesetImage(MapKeys.OverworldSetName, MapKeys.OverworldSetKey) // assets para criação do mapa
        // const atlasSet = map.addTilesetImage(MapKeys.AtlasSetName, MapKeys.AtlasSetKey) 
        // const tiled_packedSet = map.addTilesetImage(MapKeys.Tiles_PackedSetName, MapKeys.Tiles_PackedSetKey) 
        
        // const base1 = map.createLayer('ground', overworldSet, 0, 0) // camadas do mapa feita no TILED e referenciadas no JSON(Mapa)
        // const base2 = map.createLayer('objects', [overworldSet, atlasSet, tiled_packedSet], 0, 0)
        // const base3 = map.createLayer('details', [overworldSet, atlasSet, tiled_packedSet], 0, 0)

        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true) // limites da camera
        // this.cameras.main.setScroll( 0, Sizes.DesktopGameHeight) 
        this.scene.start(Game)
    }
}