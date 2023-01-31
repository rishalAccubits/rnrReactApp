import React, { useCallback, useEffect, useState } from 'react'
import Landing from '../Landing/Landing'
import Register from '../Register/Register';
import Navbar from '../Navbar/Navbar'
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import Claim from '../Claim/Claim';
import Play from '../Play/Play';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { getAccount, getCoinBalance, metamaskStatus } from '../../helpers/web3';
import detectEthereumProvider from '@metamask/detect-provider'
import swal from 'sweetalert';
import web3 from 'web3';
import {chainIdentifier} from '../../config/config'
import { getRegistrationStatus } from '../../helpers/api';

const Home = () => {

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState("0")
    const [registrationStatus, setRegistrationStatus] = useState(false);

    const changeNetwork = async () => {
      const chainId = chainIdentifier // Polygon Mainnet
      if (window.ethereum.networkVersion !== chainId) {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }]
              });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Polygon Mumbai',
                      chainId: web3.utils.toHex(chainId),
                      nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                      rpcUrls: ['https://matic-mumbai.chainstacklabs.com']
                    }
                  ]
                });
              }
            }
          }
    };


    const getNetworkStatus = async () => {
        const provider = await detectEthereumProvider()
        if (provider) {
            const chainId = await provider.request({
              method: 'eth_chainId'
            })
            console.log("ChainId", chainId)
            if(!chainId || chainId !== web3.utils.toHex(chainIdentifier))
            {
                setConnected(false)
                swal({              
                  title: "Wrong Network!",
                  text: "Please Change Network to Polygon ",
                  type: "error",
                  timer: 3000
                });
                // await changeNetwork()
            }
            else if(chainId === web3.utils.toHex(chainIdentifier))
                getAccount().then((val) => setAccount(val))
                getCoinBalance().then((val) => setBalance(val))
                setConnected(true)
        } else {
            setConnected(false)
            swal({              
              title: "Wallet Not Found",
              text: "Please Install Metamask",
              type: "error",
              timer: 3000
            });
            // swal("Wallet Not Found", "Please Install Metamask", "error");
            // await changeNetwork()
          }
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      console.log("accountsChanged", accounts[0])
      getNetworkStatus()
      getRegistrationStatus()
    })
    
    window.ethereum.on('networkChanged', function (networkId) {
      console.log("networkChanged", networkId)
      getNetworkStatus()
      getRegistrationStatus()
    })


    useEffect(() => {
        getNetworkStatus()
        console.log("Is Connected @@@@", connected)
        if(connected && account) {
          console.log("Account Address", account)
          getRegistrationStatus(account).then((item) => {
            console.log("Registration Status", item)
            setRegistrationStatus(item.data.userRegistered)
          })
        }
    },[account]);
    
    console.log('Registration Status', registrationStatus)
  return (
    <div>
     <Navbar registrationStatus={registrationStatus} connected={connected} />
     <div>
        { (connected && registrationStatus )&&
        <Routes>
        <Route
          path="/"
          element={
              <Landing 
                account={account}
                balance={balance}
              />
          }
        />
        <Route
          path="/claim"
          element={
              <Claim 
                account={account}
                balance={balance}
                setBalance={setBalance}
             />
          }
        />
        <Route
          path="/play"
          element={
              <Play 
                account={account}
                balance={balance}/>
          }
        />
        <Route
          path="/leaderboard"
          element={
              <LeaderBoard />
          }
        />
        
      </Routes>}
      {!registrationStatus &&
        <Routes>
        <Route
            path="/register"
            element={
                <Register 
                  account={account}
                  balance={balance}
                />
            }
          />
          <Route
            path="/tutorial"
            element={
                <Claim 
                  account={account}
                  balance={balance}
                  setBalance={setBalance}
              />
            }
          />    
      </Routes>
      }
     </div>
     
    </div>
  )
}

export default Home