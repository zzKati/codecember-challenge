import { defineComponent } from 'vue'
import { isDark, toggleDark } from '../composables/dark'

export default defineComponent({
  name: 'TheFooter',
  setup() {
    const handleClick = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x, Math.max(y, window.innerHeight - y)),
      )
      const transition = document.startViewTransition(() => {
        toggleDark()
      })
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    }
    return () => (
      <div class="flex w-screen h-50px justify-center items-center ">
        {
          isDark.value ? <div class="i-carbon-sun" onClick={handleClick} /> : <div class="i-carbon-moon" onClick={handleClick} />
        }

      </div>
    )
  },
})
