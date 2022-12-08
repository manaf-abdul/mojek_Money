import '../styles/globals.css'
import { Provider } from '../context'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position='top-center' />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
