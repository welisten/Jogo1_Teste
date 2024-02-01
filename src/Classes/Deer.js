// A Sprite Game Object.

// A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.

// The main difference between a Sprite and an Image Game Object is that you cannot animate Images. As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.

// tweened -> "tweened" refere-se à técnica de interpolação suave entre dois valores ao longo do tempo. Os tweens são usados para criar animações fluidas e transições entre diferentes estados de um objeto no jogo

// tited - No Phaser, o método tint é usado em um Phaser.GameObjects.Sprite para aplicar uma cor de tintagem ao sprite. Essa cor de tintagem é multiplicada pelos pixels do sprite, resultando em uma mudança de cor na aparência do objeto. A cor de tintagem pode ser um valor hexadecimal (como 0xFFFFFF para branco) ou um número decimal representando uma cor.

 
 import Phaser from 'phaser'
 
 import { createDeerAnimations } from '../Functions/LoadAnimations'
 import { deerKey } from '../Consts/Animations'

 class Deer extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, animationDeerKey){
        super(scene, x, y, texture, frame) 

        this.deerKey = deerKey
        this.animationDeerKey = animationDeerKey 

        scene.add.existing(this)

        createDeerAnimations(scene)
        this.play(deerKey, true)
        
    }

 }