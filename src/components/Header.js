import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject("UiStore")
@observer
export class Header extends React.Component {
  render() {
    const explorerUrl = this.props.UiStore.web3Store.explorerUrl || 'https://www.oklink.com/okexchain-test';
    
    return (
    <header className="header">
        <div className="container">
          <a href="#" className="header-logo">
            
          </a>
          <form className="form form_header">
            <label htmlFor="network" 
                className="label">CoinDrop Address: <a target="_blank" 
                href={`${explorerUrl}/address/${'0x8C79710A3D6FBE92dE7B51BB09C3DeA61837F83E'}`}
                > 0x8C79710A3D6FBE92dE7B51BB09C3DeA61837F83E </a>
            </label>
            <div className="socials">
          </div>
          </form>
        </div>
    </header>
    )
  }
}