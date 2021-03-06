import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-loaders'
var x:any = BABYLON;
x.GUI = GUI;
export class Stage {
    canvas:HTMLCanvasElement
    engine:BABYLON.Engine
    scene:BABYLON.Scene
    constructor(){
        // Get rid of margin
        document.documentElement.style["overflow"]="hidden"
        document.documentElement.style.overflow ="hidden"
        document.documentElement.style.width ="100%"
        document.documentElement.style.height ="100%"
        document.documentElement.style.margin ="0"
        document.documentElement.style.padding ="0"
        document.body.style.overflow ="hidden"
        document.body.style.width ="100%"
        document.body.style.height ="100%"
        document.body.style.margin ="0"
        document.body.style.padding ="0"

        // Create canvas html element on webpage
        this.canvas = document.createElement('canvas')
        this.canvas.style.width="100%"
        this.canvas.style.height="100%"

        //this.canvas = document.getElementById("renderCanvas")
        document.body.appendChild(this.canvas)

        // Initialize Babylon scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true, disableWebGL2Support: false, preserveDrawingBuffer: true })
        this.engine.enableOfflineSupport = false
        this.scene = new BABYLON.Scene(this.engine)
        this.engine.runRenderLoop(()=>{
            this.scene.render()
        })

        window.addEventListener("resize", ()=> {
            this.engine.resize()
        })
    }

    public async importMesh(url):Promise<BABYLON.Mesh>{
        var container = await BABYLON.SceneLoader.LoadAssetContainerAsync(url, "", this.scene)
        var root = container.createRootMesh()
        return root
    }
}