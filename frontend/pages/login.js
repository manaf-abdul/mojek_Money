import { useState, useContext,useEffect } from "react"
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'
import Link from "next/link"
import { Context } from '../context'
import {useRouter} from 'next/router'
import { BASEURL } from "../constants"
import { toast } from "react-toastify"

const Login = () => {

    const router=useRouter()
  
    //sate
    const { state:{user}, dispatch } = useContext(Context)
    // const {user}=state
    console.log("user",user);
  
    useEffect(()=>{
      if(user!==null) router.push('/')
    },[user])
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        console.table({ email, password });
        const { data } = await axios.post(`${BASEURL}/api/user/signin`, { email, password })
        dispatch({type:"LOGIN",payload:data})
        window.localStorage.setItem('user',JSON.stringify(data))
        router.push('/')
        toast.success('Login Successfull')
        setLoading(false)
      } catch (error) {
        console.log("error",error.response.data.messsage);
        toast.error(error.response.data.messsage)
        setLoading(false)
      }
    }
  
    return (
      <>
        <h1 className='jumbotron bg-primary square text-center' style={{color:"white"}}>Login</h1>
  
        <div className='container col-md-4 offset-md-4 pb-5'>
          <form onSubmit={handleSubmit}>
            <input type="email"
              placeholder="Enter Email"
              className="form-control mb-4 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="password"
              placeholder="Enter password"
              className="form-control mb-4 p-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary btn-block"
              disabled={!email || !password || loading}
              type="submit">
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p className="text-center p-3">
            Don't habe an account ?
            <Link legacyBehavior href="/register">
              <a>Register</a>
            </Link>
  
          </p>
  
        </div>
      </>
    )
  }
  
  export default Login