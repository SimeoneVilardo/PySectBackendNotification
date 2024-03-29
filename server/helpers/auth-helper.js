const authHelper = {};
const cookie = require('cookie');

authHelper.auth = async function (req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const headers = {
        'Cookie': `token=${token}`
    }
    try {
        userResponse = await fetch(`http://${process.env.SSO_HOST}:${process.env.SSO_PORT}/api/me`, { headers: headers });
    }
    catch (e) {
        throw { status: 401, message: 'Cannot contact auth server', managed: true };
    }
    if (!userResponse.ok)
        throw { status: 401, message: 'Unauthorized', managed: true };
    user = await userResponse.json();
    req.user = user;
    next();
}

module.exports = authHelper;