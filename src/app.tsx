import { useDidHide, useDidShow } from '@tarojs/taro'

import 'taro-ui/dist/style/index.scss'

import './app.css'

function App(props) {
  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <>
      {props.children}
    </>
  )
}

export default App
