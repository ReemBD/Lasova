const jwt = require('jsonwebtoken');
const { jwtAccessToken } = require('../../env/index.config');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = { name: username };
        const accessToken = jwt.sign(user, jwtAccessToken);
        res.json({ accessToken });
    } catch (err) {

    }
}

module.exports = {
    login,
}