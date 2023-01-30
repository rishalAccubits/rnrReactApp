import swal from 'sweetalert';
import Web3 from 'web3';

import AccuCoin from '../abis/AccuCoin.json'
import Cryptopati from '../abis/Cryptopati.json'

export const metamaskStatus = async () => {
    if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {
        console.log("Metamask is connected");
        swal("Good job!", "You have connected to Metamask", "success");

      } else {
        console.log("Oops", "Could not connect to Metamask", "error");
      }
}

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

export const getCoinBalance = async () => {
    loadWeb3()
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const accuCoinData = AccuCoin.networks[networkId];
    const accuCoin = new web3.eth.Contract(AccuCoin.abi, accuCoinData.address);
    let accuCoinBalance = await accuCoin.methods.balanceOf(accounts[0]).call();
    return accuCoinBalance
}

export const getAccount = async () => {
    loadWeb3()
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    return accounts[0]
}

export const getTimer = async () => {
    loadWeb3()
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const cryptopatiData = Cryptopati.networks[networkId];
    const cryptopati = new web3.eth.Contract(Cryptopati.abi, cryptopatiData.address);
    const timerValue = await cryptopati.methods.userLastClaim(accounts[0]).call()
    return timerValue
}
