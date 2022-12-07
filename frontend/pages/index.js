import { useContext, useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { Context } from '../context'
import { useRouter } from 'next/router'
import { Select, Button, Avatar, Badge } from "antd";

export default function Home() {
  const router = useRouter()
  const { state: { user }, dispatch } = useContext(Context)

  // useEffect(()=>{
  //   if(user===null) router.push('/login')
  // },[user])
  const [values, setValues] = useState({
    amount: '',
    compundRate: '',
    duration: '',
    returnRate: ''
  })
  const [result,setResult]=useState()
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
   try {
    setLoading(true)
    const {data}=await axios.post('/api/sip',{
      ...values})
      setResult(data)
      setLoading(false)
    router.push('/result')
   } catch (error) {
    setLoading(false)
    alert(err.response.data)
   }
  }

  return (
    <div className={styles.container}>
      <h1>HAAAAI</h1>
      <div className="container pt-3">
          <div className="form-group">
            <input
              type="text"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              name="compundRate"
              className="form-control"
              placeholder="Name"
              value={values.compundRate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              name="duration"
              className="form-control"
              placeholder="Duration"
              value={values.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              name="return"
              className="form-control"
              placeholder="Rate of Return"
              value={values.returnRate}
              onChange={handleChange}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="col mt-3"
            size="large"
            type="primary"
            loading={loading}
            shape="round"
          >
            Calculate Future Value
          </Button>
      </div>
    </div>
  )
}
