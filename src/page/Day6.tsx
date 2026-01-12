import P5 from 'p5'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { isDark } from '../composables/dark'
import { random } from '../utils'

interface data {
  x: number
  y: number
  r: number
  start: number
  end: number
}

export default defineComponent({
  name: 'Day6',
  setup() {
    const canvasRef = ref<HTMLDivElement>()
    const P5Ref = ref<P5>()
    onMounted(() => {
      const width = 500
      const height = width
      // const data = ref<data[]>([])
      P5Ref.value = new P5((p: P5) => {
        function generateData() {
          const xCenter = width / 2
          const yCenter = height / 2
          const margin = 10
          const radius = 10
          const data: data[] = []

          for (let i = 0; i < 25; i++) {
            const curRad = (i + 1) * radius + i * margin
            let start = random(p.PI / 4,p.TWO_PI)
            let end = start + random(p.PI / 4,p.TWO_PI)
            if(start > end){
              [start,end] = [end,start]
            }

            data.push({
              x: xCenter,
              y: yCenter,
              r: curRad,
              start,
              end,
            })
          }
          
          return data
        }

        const data = generateData()
        p.setup = () => {
          p.createCanvas(width, height)
        }

        p.draw = () => {
          p.background(isDark.value ? '#121212' : '#fff')
          p.stroke(100)
          p.strokeWeight(6)
          p.noFill()
          data.forEach((d) => {
            p.arc(d.x, d.y, d.r, d.r, d.start, d.end)
            const randomCount = random(150,900)
            let nextStart = d.start + p.PI / randomCount
            let nextEnd = d.end + p.PI / randomCount
            if(nextStart > nextEnd){
              [nextStart,nextEnd] = [nextEnd,nextStart]
            }

            d.start = nextStart
            d.end = nextEnd
          })
          
        }
      }, canvasRef.value)      
    })

    onUnmounted(()=>{
      P5Ref.value?.remove()
    })

    return () => <div ref={canvasRef} />
  },
})
