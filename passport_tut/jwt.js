const express = require('express');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const port = process.env.PORT || 30000;

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: 'hansolo'
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
	console.log('payload received', jwt_payload);
	// This would normally check username/password but I'm not doing that for this test
	done(null, 'hello');
});


const app = express();
app.use(passport.initialize());
passport.use(strategy);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/token', (req, res) => {
	const payload = { id: 1, name: 'David Slaugh' };
	const token = jwt.sign(payload, jwtOptions.secretOrKey);
	res.json({ message: 'ok', token: token });
});

app.get('/secure', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send('This is a secure route');
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
