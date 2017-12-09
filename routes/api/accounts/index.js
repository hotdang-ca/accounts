var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1'); // account IDs, as well as owner cookies

const ACCOUNTS = {};

router.get('*', function (req, res, next) {
  // middleware for all routes
  if (req.session.owner) {
    console.log('Welcome back', req.session.owner);
  } else {
    req.session.owner = uuidv1();
    console.log('New owner', req.session.owner);
    ACCOUNTS[req.session.owner] = [];
  }

  next();
});

router.get('/', function (req, res, next) {
  res.status(200).json(ACCOUNTS[req.session.owner]);
});

router.post('/', function (req, res, next) {
  // post new account
  const { name } = req.body;
  const id = uuidv1();

  console.log('owners objects', ACCOUNTS[req.session.owner]);

  ACCOUNTS[req.session.owner].push({
    id,
    name,
    balance: 0,
  });

  res.status(200).json({ id });
});

router.get('/:accountId', function (req, res, next) {
  // show account by Id
  let requestedAccount = {};

  requestedAccount = ACCOUNTS[req.session.owner].find(function (account) {
    return account.id === req.params.accountId;
  });

  res.status(requestedAccount ? 200 : 404).json(requestedAccount);
});

router.post('/:accountId/:action/', function (req, res, next) {
  const { accountId, action } = req.params;
  const { amount } = req.body;


  const requestedAccount = ACCOUNTS[req.session.owner].find(function (account) {
    return account.id === accountId;
  });

  if (!requestedAccount) {
    return res.status(404).json({ message: 'not found' });
  }

  if (! ['debit', 'credit'].includes(action)) {
    return res.status(403).json({ message: 'invalid request' });
  }

  ACCOUNTS[req.session.owner].forEach((account) => {
    if (account.id === accountId) {
      // this is the one!
      if (action === 'debit') {
        account.balance -= parseFloat(amount);
      } else if (action === 'credit') {
        account.balance += parseFloat(amount);
      }

      return res.status(200).json(account);
    }
  });
});

module.exports = router;

