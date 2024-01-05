const authHelper = {};

authHelper.auth = async function (req, res, next) {
    const token = req.query.token;
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    try {
        userResponse = await fetch('http://pysect-backend-web:8000/api/me', { headers: headers });
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