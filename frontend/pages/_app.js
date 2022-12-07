import '../styles/globals.css'
import {Provider} from '../context'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
  <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
