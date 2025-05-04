import p5 from "p5";
import { defineComponent, onMounted, ref } from "vue";
import { isDark } from "../composables/dark";

export default defineComponent({
  name: 'Day2',
  setup() {
    const canvasRef = ref<HTMLDivElement>()
    const width = 500
    const height = width

    onMounted(()=>{
      new p5((p:p5)=>{
        p.setup = ()=>{
          p.createCanvas(width,height)
        }
        p.draw = ()=>{
          p.background(isDark.value ? "#121212" : "#fff")
          p.stroke(100)
          p.noFill()
          p.strokeWeight(width * 0.01)

          const time = p.millis() / 1000
          
          const pinpong = p.sin(time * 0.75 - 0.5 * p.PI) * 0.5 + 0.5 // 创建一个从0到1的值
          
          const points = p.lerp(2,100,p.pow(pinpong,2.5)) // 使用 ping + pow 去生成一个非线形的生成过程
          
          const radius = width / 2.1
          const angle = pinpong * p.PI * 2;
          polygon(width/2,height/2,radius,points,angle)
        }

        function polygon(x:number,y:number,radius:number,points = 3,angle = 0){
          p.beginShape()
          for(let i = 0; i < points;i++){
            const a = p.TWO_PI * i / points
            const lx = x + p.cos(a + angle) * radius
            const ly = y + p.sin(a + angle) * radius
            p.vertex(lx,ly)
          }
          p.endShape(p.CLOSE)
        }
        
      },canvasRef.value)
    })
    return () => <div class="flex-1 flex justify-center items-center " >
      <div ref={canvasRef}></div>
    </div>
  }
})
