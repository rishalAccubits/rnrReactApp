import React from 'react'


const Landing = (props) => {

  return (
    <div>
        <h2>Tutorial</h2>
        <p>You are connected and address is  {props.account}</p>
        <p><small>Available Accucoin Balance is {props.balance}</small></p>
    </div>
  )
}

export default Landing