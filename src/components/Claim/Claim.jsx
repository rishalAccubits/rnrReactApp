import React, { useEffect, useState } from 'react'
import { getTimer } from '../../heplers/web3'
import Timer from '../Timer/Timer'

const Claim = (props) => {

  const [timerVal, setTimerVal] = useState(0)

  const getTimerValue = async () => {
    const timer = await getTimer()
    console.log({timer})
    const timestamp = Math.round(Date.now() / 1000);
    const currentTime = timestamp - Number(timer)
    console.log({timestamp});
    setTimerVal(currentTime)
  }

  useEffect(() => {
    getTimerValue()
},[]);

  return (
    <div>
    <div className="card bg-dark mb-3"  style={{maxWidth: "20rem"}}>
        <div className="card-header">Claim Token</div>
        <div className="card-body">
          <h4 className="card-title">Balance: {props.balance}</h4>
          <p className="card-text">Connected Networt /// Add any test here</p>
         <button type="button" className="btn btn-primary"  onClick={console.log('here')} >Claim Token</button>
        </div>
        {timerVal > 0 &&
                <Timer timeLimit={timerVal}
                init = {true}
            />
        }
      </div>
    </div>
  )
}

export default Claim