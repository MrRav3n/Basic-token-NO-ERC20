import React, { Component } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Web3 from 'web3'
import Main from './Main'
import Token from '../abis/Token.json'
class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadContract();
        await this.loadAccount();
        window.ethereum.on('accountsChanged', async (accounts)  => {
          await this.loadAccount();
        })
    }
    async loadWeb3() {

        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    async loadAccount() {
        const account = await window.web3.eth.getAccounts();
        this.setState({account: account[0]});
        let balance = await this.state.token.methods.balances(this.state.account).call();
        let tokensLeft = await this.state.token.methods.tokenLimit().call()
        tokensLeft = tokensLeft.toString()
        balance = balance.toString()
        this.setState({balance, tokensLeft});
    }
    async loadContract() {
        const networkId = await window.web3.eth.net.getId();
        const networkData = Token.networks[networkId];
        if(networkData) {
            const token = window.web3.eth.Contract(Token.abi, networkData.address)
            this.setState({token});
        } else {
            alert('Cannot connect to blockchain network (Connect to kovan)')
        }
    }
    async sendTokens(_ammount, _address) {
        await this.state.token.methods.sendTokens(_ammount, _address).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        })
    }
    async buyTokens(price) {
        await this.state.token.methods.buyTokens().send({from: this.state.account, value: price}, async(e) => {
            await this.checkBlockNumber();
        })
    }
    async checkBlockNumber() {
       const sleep = (milliseconds) => {
           return new Promise(resolve => setTimeout(resolve, milliseconds))
       };
       const blockNumber = await window.web3.eth.getBlockNumber()
       let blockNumberNew = await window.web3.eth.getBlockNumber()
       while(blockNumber === blockNumberNew) {
           blockNumberNew = await window.web3.eth.getBlockNumber()
           await sleep(100);
       }
       await this.loadAccount();

   }

    constructor(props) {
        super(props);
        this.state = {
            account: null,
        }
    }

  render() {
    return (
      <div>
      <Navbar account={this.state.account} />
      <Main buyTokens={this.buyTokens.bind(this)}  sendTokens={this.sendTokens.bind(this)} balance={this.state.balance} tokensLeft={this.state.tokensLeft}/>
      </div>
    );
  }
}

export default App;
