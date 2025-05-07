import P5 from 'p5'
import { defineComponent, onMounted, ref } from 'vue'
import { isDark } from '../composables/dark'

export default defineComponent({
  name: 'Day5',
  setup() {
    const canvasRef = ref<HTMLDivElement>()
    const points =ref<{x:number,y:number}[]>([])
    const P5Ref = ref<P5>()
    const width = 500
    const height = width
    const length = 5
    const scale = 50
    const SPACE = 10
    
    function init(){
      points.value = []
      for (let i = 0; i < height; i+=SPACE) {
        for (let j = 0; j < width; j+=SPACE) {
          points.value.push({
            x: j,
            y: i,
          })
        }
      }
    }
    
    function handleClick(){
      if (P5Ref.value) {
        P5Ref.value.remove()
        
        init()
        
        createP5Instance()
      }
    }

    function createP5Instance() {
      const p5 = new P5((p: P5) => {
        function getRad(x:number,y:number){
          return (p.noise(x/scale,y/scale)-0.5) * p.TWO_PI
        }
        p.setup = () => {
          p.createCanvas(width, height)
          p.stroke(0,0,0,50)
          p.strokeWeight(2)
          p.noiseSeed(+new Date())
          p.background(isDark.value ? '#121212' : '#fff')
        }
        p.draw = () => {
          if(p.frameCount > 60){
            p.noLoop()
          }
          for (let i = 0; i < points.value.length; i++) {
            const { x, y } = points.value[i]
            const rad = getRad(x,y)
            const nx = x+p.cos(rad)*length
            const ny = y+p.sin(rad)*length
            p.line(x,y,nx,ny)
            points.value[i].x = nx
            points.value[i].y = ny
          }
        }
      }, canvasRef.value)
      P5Ref.value = p5
    }

    onMounted(() => {
      init()
      createP5Instance()
      return () => P5Ref.value?.remove()
    })
    return () => <div ref={canvasRef} onClick={handleClick} />
  },
})
