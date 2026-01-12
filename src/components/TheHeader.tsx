import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

const days = Array.from({ length: Object.keys(import.meta.glob('../page/*.tsx')).length }).fill(0).map((_, index) => index + 1)

export default defineComponent({
  name: 'TheHeader',
  setup() {
    return () => (
      <div class="w-full flex justify-center items-center gap-4 mt-3">
        {
          days.map(i => <RouterLink to={`/${i}`}>{i}</RouterLink>)
        }
      </div>
    )
  },
})
