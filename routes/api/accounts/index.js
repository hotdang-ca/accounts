var express = require('express');
var router = express.Router();
var uuidv1 = require('uuid/v1'); // account IDs, as well as owner cookies
var Account = require('../../../model/Account');

router.get('*', function (req, res, next) {
  // middleware for all routes
  if (req.session.owner) {
    console.log('Welcome back', req.session.owner);
  } else {
    req.session.owner = uuidv1();
    console.log('New owner', req.session.owner);
  }

  next();
});

router.get('/', function (req, res, next) {
  Account.find({ owner: req.session.owner }, function(err, account) {
    if (err) {
      return res.status(200).json([]);
    }

    res.status(200).json(account);
  });
});

router.post('/', function (req, res, next) {
  // post new account
  const { name } = req.body;
  const id = uuidv1();

  var account = new Account({
    id,
    name,
    balance: 0,
    owner: req.session.owner,
  });

  account.save(function (err, newAccount) {
    if (err) {
      return res.status(err.status).json({ err });
    }

    res.status(200).json({ id });
  });
});

router.get('/:accountId', function (req, res, next) {
  // show account by Id
  const { accountId } = req.params;
  Account.find({id: accountId}, function(err, account) {
    if (err) {
      return res.status(404).json({ err });
    }

    return res.status(200).json(account[0]);
  });
});

router.post('/:accountId/:action/', function (req, res, next) {
  const { accountId, action } = req.params;
  const { amount } = req.body;

  Account.find({id: accountId}, function(err, account) {
    if (err) {
      return res.status(404).json({});
    }

    if (!['debit', 'credit'].includes(action)) {
      return res.status(403).json({ message: 'invalid request' });
    }

    try {
      var newAmount = parseFloat(amount);

      if (action === 'debit') {
        account[0].balance -= newAmount;
      } else if (action === 'credit') {
        account[0].balance += newAmount;
      }

      account[0].save(function(err, savedAccount) {
        if (err) {
          return res.status(400).json({ err });
        }

        return res.status(200).json(savedAccount);
      });
    } catch (e) {
      return res.status(400).json({ err: 'invalid balance amount' });
    }
  });
});

module.exports = router;

