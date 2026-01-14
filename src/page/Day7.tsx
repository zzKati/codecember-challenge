import type P5 from 'p5'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { isDark } from '../composables/dark'
import { initCanvas } from '../utils'

export default defineComponent({
  name: 'Day7',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width
    const P5Ref = ref<P5>()

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctx.lineCap = 'square'
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(100,100,100)'

      ctx.beginPath()

      function draw(x: number, y: number, offsetX: number, offsetY: number) {
        const leftToRight = Math.random() > 0.5
        if (leftToRight) {
          ctx.moveTo(x, y) // go to start point
          ctx.lineTo(x + offsetX, y + offsetY)
        }
        else {
          ctx.moveTo(x + offsetX, y)
          ctx.lineTo(x, y + offsetY)
        }
      }

      const step = 20

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          draw(x, y, step, step)
        }
      }

      ctx.stroke()
    })

    onUnmounted(() => {
      P5Ref.value?.remove()
    })
    return () => (
      <canvas ref={canvasRef} />
    )
  },
})
