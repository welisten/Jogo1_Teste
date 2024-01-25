 import Phaser from 'phaser'
 
 import { createDeerAnimations } from '../Functions/LoadAnimations'
 import { deerKey } from '../Consts/Animations'

 class Deer extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, deerKey_char, animationDeerKey){
        super(scene, x, y, deerKey_char)

        this.deerKey = deerKey
        this.animationDeerKey = animationDeerKey 

        scene.add.existing(this)

        createDeerAnimations(scene)
        this.play(deerKey, true)
        
    }


 }