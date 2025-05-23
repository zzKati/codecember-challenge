import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'TheHeader',
  setup() {
    return () => (
      <div class="w-full flex justify-center items-center gap-4 mt-3">
        <RouterLink to="/1">1</RouterLink>
        <RouterLink to="/2">2</RouterLink>
        <RouterLink to="/3">3</RouterLink>
        <RouterLink to="/4">4</RouterLink>
        <RouterLink to="/5">5</RouterLink>
        <RouterLink to="/6">6</RouterLink>
      </div>
    )
  },
})
