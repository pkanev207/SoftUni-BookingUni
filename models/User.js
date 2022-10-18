const { Schema, model, Types: { ObjectId } } = require('mongoose');
// const NAME_PATTERN = /^[a-zA-Z-]+$/;
// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

// TODO add User properties and validation according to assignment
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long!'] },
    hashedPassword: { type: String, required: true },
    // trips: { type: [ObjectId], ref: 'Trip', default: [] },
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: { locale: 'en', strength: 2 },
});
// strength 2 -> case insensitive

const User = model('User', userSchema);

module.exports = User;





// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         validate: {
//             validator(value) {
//                 return EMAIL_PATTERN.test(value);
//             },
//             message: 'Email must be valid!'
//         }
//     },
//     hashedPassword: { type: String, required: true },
//     gender: { type: String, required: true, enum: ['male', 'female'] },
//     trips: { type: [ObjectId], ref: 'Trip', default: [] },
// });

// userSchema.index({ email: 1 }, {
//     unique: true,
//     collation: { locale: 'en', strength: 2 },
// });





// Papazov

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const { SALT_ROUNDS } = require('../config/env');

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true, },
//     address: { type: String, required: true },
//     publications: [{ type: mongoose.Types.ObjectId, ref: 'Publication' }],
//     shares: [{ type: mongoose.Types.ObjectId, ref: 'Publication' }]
// });

// userSchema.pre('save', function (next) {
//     bcrypt.hash(this.password, SALT_ROUNDS)
//         .then(hashedPassword => {
//             this.password = hashedPassword;
//             next();
//         });
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;



// env.js
// exports.PORT = 3000;
// exports.DB_QUERYSTRING = `mongodb://127.0.0.1:27017/artGallery`;
// exports.SALT_ROUNDS = 10;
// exports.SECRET = 'c0784fba71e420ed4e18d2822b569660';



// const mongoose = require('mongoose');

// const publicationSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     paintingTechnique: { type: String, required: true },
//     artPicture: { type: String, required: true },
//     certificate: { type: String, enum: ['Yes', 'No'], required: true },
//     author: { type: mongoose.Types.ObjectId, ref: 'User' },
//     usersShared: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
// });

// const Publication = mongoose.model('Publication', publicationSchema);

// module.exports = Publication;
