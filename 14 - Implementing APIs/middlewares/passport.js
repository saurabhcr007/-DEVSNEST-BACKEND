const { ExtractJwt, Strategy } = require('passport-jwt');
const { SECRET } = require('../config');
const User = require('../models/mongo');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            await User.findById(payload.user_id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(null, user);
                })
        })
    )
}