import express from 'express';
import {
  register,
  login,
  goLoginSuccess,
  goLoginFail,
  goLogOut,
  goJwtLogin,
} from '../controllers/auth.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// google
router.get('/login/success', goJwtLogin);
router.get('/login/failed', goLoginFail);

router.get('/google', passport.authenticate('google', ['profile', 'email']));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/login/failed',
  })
);

router.get('/logout', goLogOut);
export default router;
