import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'
import Link from "next/link"
import { Context } from '../context'
import {useRouter} from 'next/router'
import { toast } from "react-toastify"
import { BASEURL } from "../constants"

const Register = () => {
    const router=useRouter()
    const { state:{user}, dispatch } = useContext(Context)
  
    useEffect(()=>{
      if(user!==null) router.push('/')
    },[user])
  
  
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        console.table({ name, email, password });
        const { data } = await axios.post(`${BASEURL}/api/user/signup`, { name, email, password })
        toast.success('Registration successfull. Please Login')
        setLoading(false)
        router.push('/login')
      } catch (error) {
        toast.error(error.response.data)
        setLoading(false)
      }
    }
  
    return (
      <>
        <h1 className='jumbotron bg-primary square text-center' style={{color:"white"}}>Register</h1>
  
        <div className='container col-md-4 offset-md-4 pb-5'>
          <form onSubmit={handleSubmit}>
            <input type="text"
              placeholder="Enter NAme"
              className="form-control mb-4 p-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button className="btn btn-block btn-primary"
              disabled={!name || !email || !password || loading}
              type="submit">
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p className="text-center p-3">
            Already registered ?
          <Link legacyBehavior href="/login">
            <a>Login</a>
          </Link>
          
          </p>
  
        </div>
      </>
    )
  }
  
  export default Register