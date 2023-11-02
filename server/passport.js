import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);
