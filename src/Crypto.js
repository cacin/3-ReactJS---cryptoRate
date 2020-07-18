import React, { Component } from 'react';
import './Crypto.css';
import CryptoList from './CryptoList';
import axios from 'axios';

class Crypto extends Component {

    constructor(props){
        super(props);

        this.state = {
            cryptoList: [],
            filterCryptoList: [],
        };
    }


    getCryotoDate = () => {

        axios.get('https://blockchain.info/pl/ticker')
        .then(res => {
            const tickers = res.data;

            this.setState((state) => {
                let newCryptoList = [];

                for (const [ticker, cryptoRate] of Object.entries(tickers)) {

                    let lastCryptoObj = state.cryptoList.find((cryptoObj)=>{
                        return(cryptoObj.currency===ticker);
                    });

                    let newCryptoObj = {
                        currency: ticker,
                        symbol: cryptoRate.symbol,
                        buy: cryptoRate.buy,
                        sell: cryptoRate.sell,
                        last: cryptoRate.last,
                    }

                    if (lastCryptoObj !== undefined){
                       if(newCryptoObj.last>lastCryptoObj.last){
                           newCryptoObj.cssClass='green';
                       }
                       else if(newCryptoObj.last<lastCryptoObj.last){
                        newCryptoObj.cssClass='red';
                        }
                        else {
                            newCryptoObj.cssClass='blue';
                        }

                    } else{
                        newCryptoObj.cssClass = 'blue';
                    }

                    newCryptoList.push(newCryptoObj);
                }
                return({
                    cryptoList: newCryptoList
                })
             
            });
            this.filterList();
           
        });
    }

    componentDidMount() {
        this.getCryotoDate();
        this.timerId = setInterval(()=>
        this.getCryotoDate(),5000
        ); 
    }

    
   
    componentWillUnmount(){
        clearInterval(this.timerId);
    } 
    
    filterList =() => {
        this._inputFilter.value=this._inputFilter.value.trim().toUpperCase();

        this.setState((state)=>{let newFilterArray = this.state.cryptoList.filter((cryptoObj)=>{
            return(cryptoObj.currency.includes(this._inputFilter.value)); 
        });

        return({
            filterCryptoList: newFilterArray
        });

       

    });
        
       
    } 

    render(){
    return(
        <div className="wrapper-bitcoin">        
        <input ref={element=>this._inputFilter=element} id="filtr" type='text' placeholder="Filter"
                onChange={this.filterList}
        ></input>
        <CryptoList cryptoList={this.state.filterCryptoList}/>
        </div>
    );}
};

export default Crypto;