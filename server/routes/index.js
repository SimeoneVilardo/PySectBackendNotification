var express = require('express');
var router = express.Router();
require('express-async-errors');
const queueHelper = require("../helpers/queue-helper");
const authHelper = require("../helpers/auth-helper");

router.get('/', function (req, res, next) {
  res.json({ message: 'Hello World' });
});

router.get('/api/notification/challenge-submission-update', authHelper.auth, async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const subscriber = await queueHelper.subscribe(req.user, (message) => {
    res.write(message);
  });

  req.on('close', async function () {
    await queueHelper.unsubscribe(subscriber);
  });
});


module.exports = router;
