import { useContext, useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { Context } from '../context'
import { useRouter } from 'next/router'
import { Select, Button, Avatar, Badge } from "antd";
import axios from "axios";
import { BASEURL } from "../constants";
import PieChart from "../components/PieChart";

export default function Home() {
  const router = useRouter()
  const { state: { user }, dispatch } = useContext(Context)

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user])
  const [amount, setAmount] = useState()
  const [returnRate, setReturnRate] = useState()
  const [compoundRate, setCompundRate] = useState()
  const [duration, setDuration] = useState()
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
      }
      const { data } = await axios.post(`${BASEURL}/api/sip`, {
        amount, compoundRate, duration, returnRate
      }, config)
      setResult(data)
      setLoading(false)
      // router.push('/result')
      console.log("data", result);
      alert(data)
    } catch (error) {
      setLoading(false)
      toast(error.response.data)
    }
  }
  const logOut = async () => {
    dispatch({ type: "LOGOUT" })
    window.localStorage.removeItem('user')
    const { data } = await axios.get(`${BASEURL}/api/user/logout`)
    router.push("/login")
  }

  return (
    <>
      <div className='jumbotron bg-primary square text-center'>
        <h1 style={{ color: "white" }}>HOME</h1>
        {
          user && <Button onClick={logOut}>Logout</Button>
        }
      </div>
      {!result ? <div className={styles.container}>
        <div className="container pt-3">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Compound Rate</label>
            <input
              disabled
              type="number"
              name="compoundRate"
              className="form-control"
              placeholder="Compund Rate"
              value={compoundRate}
            // onChange={(e)=>setCompundRate(Number())}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              type="number"
              name="duration"
              className="form-control"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Expected Rate of Return</label>
            <input
              type="number"
              name="returnRate"
              className="form-control"
              placeholder="Rate of Return"
              value={returnRate}
              onChange={(e) => {
                setReturnRate(Number(e.target.value))
                setCompundRate(Number(e.target.value) / 100 / 12)
              }}
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
        :
        <div className='container col-md-4 text-center pb-4'>
          <PieChart
            expected={result.total_value}
            returns={result.return}
            invested={result.invested_amount}
            setResult={setResult} />
        </div>
      }
    </>
  )
}
