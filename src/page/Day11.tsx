import { defineComponent, onMounted, ref } from 'vue'
import { initCanvas, random } from '../utils'

export default defineComponent({
  name: 'Day11',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width
    const step = 20
    const thirdHeight = height / 3
    const ctxRef = ref<CanvasRenderingContext2D>()

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, width, height)
      function drawLine(x: number, y: number, width: number, height: number, positions: number[]) {
        ctx.save()
        ctx.translate(x + width / 2, y + height / 2)
        ctx.rotate(random(0, 5))
        ctx.translate(-width / 2, -height / 2)

        for (const p of positions) {
          ctx.beginPath()
          ctx.moveTo(p * width, 0)
          ctx.lineTo(p * width, height)
          ctx.stroke()
        }
        ctx.restore()
      }

      for (let x = step; x < width - step; x += step) {
        for (let y = step; y < height - step; y += step) {
          if (y < thirdHeight) {
            drawLine(x, y, step, step, [0.5])
          }
          else if (y < thirdHeight * 2) {
            drawLine(x, y, step, step, [0.2, 0.8])
          }
          else {
            drawLine(x, y, step, step, [0.1, 0.5, 0.9])
          }
        }
      }
    }

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctx.strokeStyle = 'rgb(100,100,100)'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctxRef.value = ctx
      draw(ctx)
    })
    return () => <canvas class="cursor-pointer" onClick={() => draw(ctxRef.value!)} ref={canvasRef} />
  },
})
