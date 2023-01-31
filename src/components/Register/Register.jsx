import React, { useEffect, useState } from 'react'
import { getAccount } from '../../helpers/web3';
import { registerUser } from '../../helpers/api'
import swal from 'sweetalert';

const Register = (props) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [walletAddress, setWalletAddress] = useState(props.account ? props.account : "")
  const [emailError, setEmailError] = useState("")


  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    if(emailRegex.test(email)){
        if(email.endsWith("gmail.com") || email.endsWith("accubits.com")){
        return true
    } else {
        return true
    }
    } else {
        return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateEmail(email)){
        setEmailError("")
        registerUser(name, email, walletAddress).then(res => {
            if(res.status == "error") {
                swal("Failed", `${res.message}`, "error");
            } else {
                swal("Registered", `${res.message}`, "success");
            }
        })      
        .catch((error) => {
            swal("Not Registered", "Registration Failed", "error");
        });
    } else {
        setEmailError("Invalid email format. Only gmail.com and outlook.com allowed.")
        swal("Invalid Email", "Provide email with accubits.com or gmail.com domain", "error");

    }
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value ? e.target.value : props.account);
  }



  return (
    <div>
        <form>
            <fieldset>
                <legend>Registration For Cryptopathi</legend>
                <div className="form-group">
                  <label htmlFor="exampleInputName1" className="form-label mt-4">Name</label>
                  <input type="text" className="form-control" id="exampleInputName1" placeholder="Name" onChange={handleNameChange} value={name} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailChange} value={email}></input>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleWalletAddress" className="form-label mt-4">Wallet Address</label>
                  <input type="text" className="form-control" id="exampleWalletAddress" placeholder="Wallet Address" onChange={handleWalletAddressChange} value={walletAddress} />
                </div>                
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </fieldset>
        </form>
    </div>
  )
}

export default Register
