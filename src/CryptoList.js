import React from 'react';
import './CryptoList.css';

function CryptoList (props){

    let cryptoList=props.cryptoList;
    let liElemets=cryptoList.map((cryptoObj)=>{
        return(
            <li key={cryptoObj.currency} >
                    <span className="crypto-label">Last rate: </span>
                    <span className={`crypto-rate ${cryptoObj.cssClass}`}>{cryptoObj.last} </span>
                    <span className="crypto-ticker">{cryptoObj.currency}</span>
                    <span className="crypto-symbol">{cryptoObj.symbol}</span>
            </li>
        );
    })
    return(
        <div className="crypto-list">
            <ul className="main-crypto-list">
                {liElemets}
            </ul>
        </div>
        
    );
};

export default CryptoList;