import { defineComponent, onMounted, ref } from 'vue'
import { initCanvas, random, randomShade } from '../utils'

interface drawSquareParams {
  x: number
  y: number
  width: number
  height: number
  xMovement: number
  yMovement: number
  steps: number
}

export default defineComponent({
  name: 'Day12',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width
    const count = 8
    const ctxRef = ref<CanvasRenderingContext2D>()

    const finalSize = 4
    const offset = 2
    const xStep = (width - offset * 2) / count
    const yStep = (height - offset * 2) / count
    let startSteps = 5

    const directions = [0,-1,1] 

    function draw(ctx:CanvasRenderingContext2D){
      ctx.clearRect(0,0,width,height)
      
      function drawSquare({ x, y, width, height, xMovement, yMovement, steps }: drawSquareParams) {
          ctx.beginPath()
          ctx.rect(x, y, width, height)
          ctx.stroke()

          if (steps >= 0) {
            const newWidth = steps > 0 ? steps / startSteps * xStep : finalSize
            const newHeight = steps > 0 ? steps / startSteps * yStep : finalSize
            let newX = (width - newWidth) / 2 + x
            let newY = (height - newHeight) / 2 + y
            newX = newX + ((newX - x) / (steps + 2) * xMovement)
            newY = newY + ((newY - y) / (steps + 2) * xMovement)
            drawSquare({
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight,
              xMovement,
              yMovement,
              steps: steps - 1,
            })
          }
        }

        for (let x = offset; x < width - offset; x += xStep) {
          for (let y = offset; y < height - offset; y += yStep) {
            startSteps = 2 + Math.ceil(random(0,3))
            const xDirection = directions[Math.floor(random(0,2))]
            const yDirection = directions[Math.floor(random(0,2))]

            const hue = random(0,12) * 30
            const style = randomShade(hue)
            const randomOpacity = random(0.2,1).toString()
            ctx.strokeStyle = style.replace("1.0",randomOpacity)

            drawSquare({
              x,
              y,
              width:xStep,
              height:yStep,
              xMovement:xDirection,
              yMovement:yDirection,
              steps:startSteps
            })
          }
        }
    }

    onMounted(() => {
      const canvas = canvasRef.value!
      const ctx = initCanvas(canvas, width, height)
      ctxRef.value = ctx
      ctx.lineWidth = 1.5
      draw(ctx)
    })

    return () => <canvas class="cursor-pointer"  ref={canvasRef}  onClick={()=>draw(ctxRef.value!)} />
  },
})
