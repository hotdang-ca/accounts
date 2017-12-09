import React, { Component } from 'react';
import './AccountHome.css';

class AccountDetails extends Component {
  state = {
    account: {},
    found: true,
    action: 'debit',
    amount: undefined,
  };

  componentDidMount() {
    const { match: { params: { accountId }} } = this.props;

    if (accountId) {
      fetch(`/api/accounts/${accountId}`, {credentials: 'same-origin' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        this.setState({ found: false });
        return;
      })
      .then(account => this.setState({ account }));
    } else {
      this.setState({ found: false });
    }
  }

  handleTransaction = (e) => {
    const { action, amount, account } = this.state;

    e.preventDefault();

    const payload = {
      amount,
    };

    fetch(`/api/accounts/${account.id}/${action}`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
    .then((res) => {
      return res.json();
    })
    .then((account) => {
      this.setState({ account });
      this.valueInput.value = '';
      // this.valueInput.target.value = '';
    });
  }

  render() {
    const { account, found } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {
            found
            ?
            <div>
              <h1 className="App-title">{ account && account.name }</h1>
            </div>
            :
            <div>
              Account not found
            </div>
          }
        </header>

        {
          found
          ?
            <div>
              <p className="App-intro">
                <b>Balance:</b> $<span>{ account && account.balance && account.balance.toFixed(2) }</span>
              </p>

              <div>
                <form method="POST" action="/api/accounts" onSubmit={this.submitTransation}>
                  <input ref={(el) => this.valueInput = el } onChange={(input) => this.setState({ amount: parseFloat(input.target.value) })} style={{ fontSize: 16, height: 20, padding: 8}} type="number" placeholder="0.00" />
                  <br />
                  <label htmlFor="debit">DEBIT</label>
                  <input onChange={(input) => this.setState({ action: input.target.checked ? 'debit' : 'credit' })} type="radio" name="type" id="debit" value="debit" defaultChecked />
                  <br />
                  <label htmlFor="credit">CREDIT</label>
                  <input onChange={(input) => this.setState({ action: !input.target.checked ? 'debit' : 'credit' })} type="radio" name="type" id="credit" value="credit" />
                  <br />
                  <input style={{ fontSize: 30, margin: 16 }} type="submit" value="Transact" onClick={this.handleTransaction} />
                </form>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default AccountDetails;
