const queueHelper = {};
const redis = require('redis');

queueHelper.subscribe = async (user, callback) => {
    var subscriber = redis.createClient({ url: 'redis://pysect-backend-redis:6379' });
    subscriber.user = user;
    await subscriber.connect();
    await subscriber.subscribe(user.username, (message) => {
        callback(`data: ${message}\n\n`);
    });
    return subscriber;
};

queueHelper.unsubscribe = async (subscriber) => {
    await subscriber.unsubscribe(subscriber.user.username);
    subscriber.quit();
}

module.exports = queueHelper;