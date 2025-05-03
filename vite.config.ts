import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Unocss() as any],
})
