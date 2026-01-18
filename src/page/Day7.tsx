import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { initCanvas } from '../utils'

interface Point {
  x: number
  y: number
}

export default defineComponent({
  name: 'Day7',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width
    let timer: number | null = null
    const step = 10
    const ctxRef = ref<CanvasRenderingContext2D>()

    function draw(ctx: CanvasRenderingContext2D) {
      if (timer) {
        cancelAnimationFrame(timer)
        timer = null
      }
      ctx.clearRect(0, 0, width, height)
      function drawLine(x: number, y: number, offsetX: number, offsetY: number) {
        ctx.beginPath()
        const leftToRight = Math.random() > 0.5
        if (leftToRight) {
          ctx.moveTo(x, y)
          ctx.lineTo(x + offsetX, y + offsetY)
        }
        else {
          ctx.moveTo(x + offsetX, y)
          ctx.lineTo(x, y + offsetY)
        }
        ctx.stroke()
      }

      const points: Point[] = []

      // select all points
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          points.push({ x, y })
        }
      }

      // sort by the nearest corner
      // calculate the euclidean distance to the nearest corner
      points.sort((a, b) => {
        const getMinDistToCorner = (p: { x: number, y: number }) => {
          const dTL = p.x ** 2 + p.y ** 2
          const dTR = (width - step - p.x) ** 2 + p.y ** 2
          const dBL = p.x ** 2 + (height - step - p.y) ** 2
          const dBR = (width - step - p.x) ** 2 + (height - step - p.y) ** 2

          return Math.min(dTL, dTR, dBL, dBR)
        }
        return getMinDistToCorner(a) - getMinDistToCorner(b)
      })

      // 3. 动画执行
      let currentIdx = 0
      const speed = 5 // 每帧绘制的点数，调整这个数字改变速度

      function animate() {
        if (currentIdx >= points.length) {
          return
        }

        // 每次绘制一批，避免动画太慢
        for (let i = 0; i < speed && currentIdx < points.length; i++) {
          const p = points[currentIdx]
          drawLine(p.x, p.y, step, step)
          currentIdx++
        }

        timer = requestAnimationFrame(animate)
      }

      animate()
    }

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctxRef.value = ctx
      ctx.lineCap = 'square'
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(100,100,100)'
      draw(ctx)
    })

    onUnmounted(() => {
      if (timer) {
        cancelAnimationFrame(timer)
      }
    })

    return () => (
      <canvas class="cursor-pointer" onClick={() => draw(ctxRef.value!)} ref={canvasRef} />
    )
  },
})
