import React from 'react';
import { Link } from 'react-router-dom';

export class Welcome extends React.Component {
  render () {
    return (
      <div className="container container_bg">
        <div className="content">
          <h1 className="title"><strong>Welcome to </strong> CoinDrop</h1>
          <p className="description">
            Desc youtube video how to use coindrop
          </p>
          <p>
            Already have JSON or CSV prepared?
          </p>
          <Link className="button button_next" to='/1'>Proceed for JSON/CSV</Link>

          <p>
            Transaction Wizard. Build a list of addresses and balances using UI.
          </p>
          <Link className="button button_next" to='/1'>Proceed for Transaction Wizard</Link>
        </div>
      </div>
    );
  }
}