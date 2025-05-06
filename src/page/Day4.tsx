import { defineComponent, onMounted, reactive, ref } from 'vue'
import { initCanvas, random } from '../utils'

export default defineComponent({
  name: 'Day4',
  setup() {
    const fill = 0.15
    const canvasRef = ref<HTMLCanvasElement>()
    const ctxRef = ref<CanvasRenderingContext2D>()
    const width = 500
    const height = width

    const coefficient = reactive({
      a: random(-5, 5).toFixed(2),
      b: random(-5, 5).toFixed(2),
      c: random(-5, 5).toFixed(2),
      d: random(-5, 5).toFixed(2),
    })

    onMounted(() => {
      if (canvasRef.value) {
        const ctx = initCanvas(canvasRef.value, width, height)
        ctxRef.value = ctx
        draw(ctx)
      }
    })

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, width, height)
      let x = 0
      let y = 0
      let time = 300
      const s = width / 5
      const center = width / 2
      ctx.fillStyle = 'rgba(100,100,100)'
      while (time--) {
        for (let i = 1e3; i--;) {
          ctx.fillRect(center + x * s, center + y * s, fill, fill)
          const xn = Math.sin(Number(coefficient.a) * y) - Math.cos(Number(coefficient.b) * x)
          const yn = Math.sin(Number(coefficient.c) * x) - Math.cos(Number(coefficient.d) * y)
          x = xn
          y = yn
        }
      }
    }

    return () => (
      <div class=" h-full flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={() => {
            coefficient.a = random(-5, 5).toFixed(2)
            coefficient.b = random(-5, 5).toFixed(2)
            coefficient.c = random(-5, 5).toFixed(2)
            coefficient.d = random(-5, 5).toFixed(2)
            if (ctxRef.value) {
              draw(ctxRef.value)
            }
          }}
        />
        <div class=" flex items-center justify-center gap-5">
          <div>
            a:
            {coefficient.a}
          </div>
          <div>
            b:
            {coefficient.b}
          </div>
          <div>
            c:
            {coefficient.c}
          </div>
          <div>
            d:
            {coefficient.d}
          </div>
        </div>
      </div>
    )
  },
})
