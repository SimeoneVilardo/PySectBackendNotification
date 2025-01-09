var express = require('express');
var router = express.Router();
require('express-async-errors');
const queueHelper = require("../helpers/queue-helper");
const authHelper = require("../helpers/auth-helper");
const {APP_CONFIG} = require("../config/conf")


router.get('/api/notification/health', function (req, res, next) {
  res.json({ message: 'OK' });
});

router.get('/api/notification/version', function (req, res, next) {
  res.json({ message: APP_CONFIG.VERSION });
});

router.get('/api/notification/challenge-submission-update', authHelper.auth, async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const subscriber = await queueHelper.subscribe(req.user, (message) => {
      try {
        res.write("event: submission\n");
        res.write(message);
        res.write("\n");
      }
      catch (e) {
        console.error(e);
      }
    });

    req.on('close', async function () {
      try {
        await queueHelper.unsubscribe(subscriber);
      }
      catch (e) {
        console.error(e);
      }
    });

    res.write("event: connection\n");
    res.write("data: OK\n");
    res.write("\n");
  }
  catch (e) {
    console.error(e);
  }
});


module.exports = router;
