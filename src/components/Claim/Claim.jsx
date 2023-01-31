import React, { useEffect, useState } from 'react'
import { getTimer, claimToken } from '../../helpers/web3'
import Timer from '../Timer/Timer'
import { Row, Col } from 'react-bootstrap'

const Claim = (props) => {

  const [timerVal, setTimerVal] = useState(0)

  const getTimerValue = async () => {
    const timer = await getTimer()
    console.log({timer})
    const timestamp = Math.round(Date.now() / 1000);
    const currentTime = timestamp - Number(timer)
    console.log("Time remaining is :", timerVal);
    setTimerVal(currentTime)
  }

  const handleClaimToken = async () => {
    await claimToken()
  }

  useEffect(() => {
    getTimerValue()
  },[timerVal]);

  return (
    <div>
    <Row>
        <Col md={6} xs={12}>
          <div className="card bg-dark mb-3"  style={{maxWidth: "20rem"}}>
          <div className="card-header">Claim Token</div>
          <div className="card-body">
            <h4 className="card-title">Balance: {props.balance}</h4>
            <p className="card-text">Connected NetworK /// Add any test here</p>
          <button type="button" className="btn btn-primary" onClick={handleClaimToken} >Claim Token</button>
          </div>
          {timerVal > 0 &&
                  <Timer timeLimit={timerVal}
                  init = {true}
              />
          }
        </div>
      </Col>
    </Row>
    </div>
  )
}

export default Claim