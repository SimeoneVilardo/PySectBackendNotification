const queueHelper = {};
const redis = require('redis');

queueHelper.subscribe = async (user, callback) => {
    try {
        var subscriber = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
        subscriber.user = user;
        await subscriber.connect();
        await subscriber.subscribe(user.username, (message) => {
            try {
                callback(`data: ${message}\n\n`);
            }
            catch (e) {
                console.error(e);
            }
        });
        return subscriber;
    }
    catch (e) {
        console.error(e);
    }
};

queueHelper.unsubscribe = async (subscriber) => {
    try {
        await subscriber.unsubscribe(subscriber.user.username);
        subscriber.quit();
    }
    catch (e) {
        console.error(e);
    }
}

module.exports = queueHelper;