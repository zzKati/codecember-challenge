import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <>
        <div>Home</div>
        <router-link to="/1">
          Day1
        </router-link>
      </>
    )
  },
})
