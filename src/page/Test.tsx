import { defineComponent, onMounted, ref } from 'vue'
import { isDark } from '../composables/dark'

export default defineComponent({
  name: 'Test',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 300
    const height = width

    onMounted(() => {
      if (canvasRef.value) {
        const canvas = canvasRef.value
        const ctx = canvas.getContext('2d')!
        ctx.lineWidth = 2

        const step = 10
        const lines = []

        for (let i = step; i <= width; i += step) {
          const line = []
          for (let j = 0; j <= height; j += step) {
            const distanceToCenter = Math.abs(j - width / 2)
            const variance = Math.max(width / 2 - 50 - distanceToCenter, 0)
            const random = Math.random() * variance / 2 * -1

            line.push({
              x: j,
              y: i + random,
              // TODO: 随机生成一个颜色
            })
          }
          lines.push(line)
        }

        for (let i = 5; i < lines.length; i++) {
          const line = lines[i]

          ctx.beginPath()
          ctx.moveTo(line[0].x, line[0].y)
          let j = 0
          for (j = 0; j < line.length - 2; j++) {
            const xc = (line[j].x + line[j + 1].x) / 2
            const yc = (line[j].y + line[j + 1].y) / 2
            ctx.quadraticCurveTo(line[j].x, line[j].y, xc, yc)
          }
          ctx.quadraticCurveTo(
            line[j].x,
            line[j].y,
            line[j + 1].x,
            line[j + 1].y,
          )
          ctx.strokeStyle = isDark.value ? `rgba(255,255,255,0.5)` : `rgba(0,0,0,0.5)`
          ctx.save()
          ctx.globalCompositeOperation = 'destination-out'
          ctx.fillStyle = ctx.strokeStyle
          ctx.fill()
          ctx.restore()
          ctx.stroke()
        }
      }
    })

    return () => (
      <div class="flex-1 flex items-center justify-center">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    )
  },
})
