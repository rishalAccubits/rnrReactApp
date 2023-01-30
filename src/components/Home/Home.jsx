import React, { useEffect, useState } from 'react'
import Landing from '../Landing/Landing'
import Navbar from '../Navbar/Navbar'
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import Claim from '../Claim/Claim';
import Play from '../Play/Play';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { getAccount, getCoinBalance, metamaskStatus } from '../../heplers/web3';
import detectEthereumProvider from '@metamask/detect-provider'
import swal from 'sweetalert';


const Home = () => {

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState("0x0000000000000000000000000000000000000000")
    const [balance, setBalance] = useState("0")

    const getNetworkStatus = async () => {
        const provider = await detectEthereumProvider()
        if (provider) {
            const chainId = await provider.request({
              method: 'eth_chainId'
            })
            if(!chainId || chainId !== '0x5')
            {
                setConnected(false)
                swal("Wrong Network", "Please Switch to Goerli Network", "error");
            }
            else if(chainId === '0x5')
                getAccount().then((val) => setAccount(val))
                getCoinBalance().then((val) => setBalance(val))
                setConnected(true)
        } else {
            setConnected(false)
            swal("Wallet Not Found", "Please Install Metamask", "error");
          }
    }

    useEffect(() => {
        getNetworkStatus()
    },[]);
    
  return (
    <div>
     <Navbar/>
     <div>{
        connected &&
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
        
      </Routes>
     }
     </div>
     
    </div>
  )
}

export default Home