import { defineComponent, onMounted, ref } from 'vue'
import { initCanvas, random, randomShade } from '../utils'


interface Point {
  x: number
  y: number
}

type Line = Point[]

type triangle = [Point,Point,Point]

export default defineComponent({
  name: 'Day9',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const ctxRef = ref<CanvasRenderingContext2D>()
    const width = 500
    const height = width
    const color = ref<{hue: number,saturation?: number}>({
      hue: 0,
      saturation: 0,
    })

    const lines = ref<Line[]>([])
    const dotLines = ref<Line[]>([]) // for drawing triangles

    function drawTriangle(ctx: CanvasRenderingContext2D,points:triangle){
        const [a,b,c] = points
        ctx.beginPath()
        ctx.moveTo(a.x,a.y)
        ctx.lineTo(b.x,b.y)
        ctx.lineTo(c.x,c.y)
        ctx.lineTo(a.x,a.y)
        ctx.closePath()
        ctx.fillStyle = randomShade(color.value.hue,color.value.saturation)
        ctx.fill()
        ctx.stroke()
      }

    function draw(ctx: CanvasRenderingContext2D){
      ctx.clearRect(0, 0, width, height)
      for(let i = 0; i < dotLines.value.length;i++) {
        const dotLine = dotLines.value[i]
        for(let j = 0; j < dotLine.length -2;j++) {
          drawTriangle(ctx,[dotLine[j],dotLine[j+1],dotLine[j+2]])
        }
      }
    }

    function generateDot(){
      lines.value = []
      const gap = width / 15
      let odd = false

      // generate dot
      for (let y = gap / 2; y <= height; y += gap) {
        odd = !odd
        const line: Line = []
        for (let x = gap / 4; x <= width; x += gap) {
          const dot = { x:x + (Math.random()*0.8 - 0.4) * gap  +(odd ? gap/2 : 0), y:y+(Math.random() * 0.8 - 0.4) * gap  }
          line.push(dot)

          // remove the comment will see the dot position
          // ctx.beginPath()
          // ctx.arc(dot.x,dot.y, 1, 0, Math.PI * 2, true)
          // ctx.stroke()
        }
        lines.value.push(line)
      }
    }

    function generateDotLines(){
      dotLines.value = []
      let even = true
      for(let y = 0; y < lines.value.length-1;y++){
        even = !even
        const dotLine:Line = []
        for(let x = 0; x < lines.value[y].length;x++){
          if(even) dotLine.push(lines.value[y][x],lines.value[y+1][x]) // current line & next line
          else dotLine.push(lines.value[y+1][x],lines.value[y][x]) // next line & current line
        }
        dotLines.value.push(dotLine)        
      }
    }

    const setRandomHue = ()=> color.value = {
      hue: random(0,360),
    }

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctxRef.value = ctx
      ctx.lineJoin = 'bevel' // details:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
      ctx.strokeStyle = 'rgba(100,100,100)'
      ctx.lineWidth = 0.5

      
      generateDot()

      generateDotLines()

      draw(ctx)
    })

    



    return () => <div class="flex flex-col items-center gap-2" >
      <div class="flex gap-2" >  
        <button class="p-1 " onClick={() => {
          setRandomHue()
          draw(ctxRef.value!)
        }}>Draw Random Color</button>
        <button class="p-1 " onClick={() => {
          generateDot()
          generateDotLines()
          draw(ctxRef.value!)
        }}>Draw Random Shape</button>
      </div>
      
      <canvas ref ={canvasRef} />
    </div>
  },
})

