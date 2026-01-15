import { defineComponent, onMounted, ref } from 'vue'
import { initCanvas } from '../utils'

export default defineComponent({
  name: 'Day8',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctx.strokeStyle = 'rgba(100,100,100)'
      ctx.lineWidth = 1.5
      const squareSize = 30

      // draw a border
      ctx.beginPath()
      ctx.rect(0, 0, width, height)
      ctx.stroke()

      function draw(width: number, height: number) {
        ctx.beginPath()
        ctx.rect(-width / 2, -height / 2, width, height)
        ctx.stroke()
      }

      ctx.beginPath()
      const randomDisplacement = 15
      const rotateMultiplier = 20
      const offset = 10

      for (let i = squareSize; i <= width - squareSize; i += squareSize) {
        for (let j = squareSize; j <= width - squareSize; j += squareSize) {
          ctx.save()
          let plusOrMinus = Math.random() < 0.5 ? -1 : 1
          const rotateAmt = j / width * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier
          plusOrMinus = Math.random() < 0.5 ? -1 : 1
          const translateAmt = j / width * randomDisplacement * plusOrMinus * Math.random()
          ctx.translate(i + translateAmt, j + offset)
          ctx.rotate(rotateAmt)
          draw(squareSize, squareSize)
          ctx.restore()
        }
      }

      ctx.stroke()
    })

    return () =>

      <canvas ref={canvasRef} />
  },
})
