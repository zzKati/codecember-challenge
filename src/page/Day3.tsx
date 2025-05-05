import P5 from 'p5'
import { defineComponent, onMounted, ref } from 'vue'
import { isDark } from '../composables/dark'

export default defineComponent({
  name: 'Day3',
  setup() {
    const canvasRef = ref<HTMLDivElement>()
    const width = 500
    const height = width

    onMounted(() => {
      if (canvasRef.value) {
        const sketch = new P5((p: P5) => {
          p.setup = () => {
            p.createCanvas(width, height)
          }

          p.draw = () => {
            p.background(isDark.value ? '#121212' : '#fff')
          }
        }, canvasRef.value)

        return () => sketch.remove()
      }
    })
    return () => (
      <div class="flex-1">
        <div ref={canvasRef}></div>
      </div>
    )
  },
})
