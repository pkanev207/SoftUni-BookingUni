const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'supersecret';
const SALT_ROUNDS = 10;


async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ username, hashedPassword });
    // const user = new User({ email, hashedPassword });
    // await user.save();

    // TODO see assignment if registration creates user session
    const token = createSession(user);

    return token;
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect username or password!');
    }

    // token
    return createSession(user);
}

function createSession({ _id, username }) {
    const payload = { _id, username };
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

function verifyToken() {

}

module.exports = {
    register,
    login,
    verifyToken
};
