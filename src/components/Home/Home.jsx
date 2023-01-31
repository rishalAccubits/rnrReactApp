import React, { useEffect, useState } from 'react'
import { getAccount, getCoinBalance } from '../../helpers/web3';
import detectEthereumProvider from '@metamask/detect-provider'
import swal from 'sweetalert';
import web3 from 'web3';
import {chainIdentifier, events} from '../../config/config'
import { getRegistrationStatus } from '../../helpers/api';
import Cryptopati from './Cryptopati';
import Auction from './Auction';
import Card from '../Card/Card';
import { Row, Col } from 'react-bootstrap'

const Home = () => {

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState("0")
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const [eventSelected, setEventSelected] = useState(0);


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
    },[account,connected]);
    
    console.log('Registration Status', registrationStatus)

  return (
    <div>
        {eventSelected === 0 &&
            <div>
                <Row>
                <Col md={6}>
                <Card onClick = {setEventSelected} data = {events.cryptopati}/> 
                </Col>
                <Col md={6}>
                <Card onClick = {setEventSelected} data = {events.auction}/>
                </Col>

                </Row>
             </div>
            }
        {
         eventSelected === 1 &&
            <Cryptopati 
                registrationStatus = {registrationStatus}
                connected = {connected}
                account = {account}
                balance = {balance}
            />
        }
       {
        eventSelected === 2 &&
            <Auction 
                registrationStatus = {registrationStatus}
                connected = {connected}
                account = {account}
                balance = {balance}
            />
       }
    </div>
  )
}

export default Home