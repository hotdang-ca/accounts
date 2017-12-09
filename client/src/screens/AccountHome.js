import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './AccountHome.css';

class AccountHome extends Component {
  state = {
    accounts: [],
    name: undefined,
  };

  componentDidMount() {
    fetch('/api/accounts', {credentials: 'same-origin' })
      .then(res => res.json())
      .then(accounts => this.setState({ accounts }));
  }

  handleNewAccount = (e) => {
    e.preventDefault();
    const { name } = this.state;

    const payload = {
      name,
    };

    fetch('/api/accounts', {
      credentials: 'same-origin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
    .then((res) => {
      res.json();
    })
    .then((id) => {
      fetch('/api/accounts', {credentials: 'same-origin' })
        .then(res => res.json())
        .then(accounts => this.setState({ accounts }));
    });
  }

  render() {
    const { accounts } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Accounts</h1>
          <p className="App-body">
            <strong>Accounts</strong> allows you to list your accounts and their balances. An account can be anything: your phone bill, some money you owe to a friend, or even money your friend owes you.
          </p>
          <p className="App-body">
            <strong>Bookmark this page!</strong> No one else will have access to this page, and you'll never have to sign up.
          </p>
          <p className="App-body">
            This is a Work in Progress; use at your own risk.
          </p>
        </header>
        <div className="App-intro">
          {
            accounts && accounts.map((account) => (
              <p key={account.id}>
                <Link to={`/accounts/${account.id}`}>{account.name}</Link>
                &nbsp; (<em>${ account.balance && account.balance.toFixed(2) }</em>)
              </p>
            ))
          }
        </div>
        <div className="App-intro">
          <h3>New account:</h3>
          <form method="POST" action="/api/accounts" onSubmit={this.handleNewAccount}>
            <input
              type="text"
              onChange={(text) => this.setState({ name: text.target.value })}
              placeholder="Account name" />
            <input type="submit" name="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountHome);
