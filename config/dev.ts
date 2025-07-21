import type { UserConfigExport } from '@tarojs/cli'

export default {
  plugins: ['@tarojs/plugin-react-devtools'],
  mini: {
    // debugReact: true,
  },
  h5: {},
} satisfies UserConfigExport<'vite'>
