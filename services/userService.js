const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'supersecret';
const SALT_ROUNDS = 10;


async function register(email, username, password) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken!');
    }

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = await User.create({ email, username, hashedPassword });
    // const user = new User({ email, hashedPassword });
    // await user.save();

    // TODO see assignment if registration creates user session
    const token = createSession(user);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect email, username or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect email, username or password!');
    }

    // token
    return createSession(user);
}

function createSession({ _id, email, username }) {
    const payload = { _id, email, username };
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken
};
