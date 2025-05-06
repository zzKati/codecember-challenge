import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div class=" flex-1 flex w-full justify-center items-start">
        学习canvas，每天做一个小demo
      </div>
    )
  },
})
