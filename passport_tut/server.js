// https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

const GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
		clientID: '4eccec7a29011216e9b3',
		clientSecret: 'ca9242f76f24baced259ab78306ee1d52bd8c68d',
		callbackURL: 'http://localhost:30000/auth/github/callback',
	},
	function(accessToken, refreshToken, profile, done) {
		return done(null, profile);
	}
));

app.use(session({ secret: 'thisismysecret' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	// placeholder for custom user serialization
	// null is for errors
	done(null, user);
});

passport.deserializeUser((user, done) => {
	// placeholder for custom user deserialization.
	// maybe you are goint to get the user from mongy by id?
	// null is for errors
	done(null, user);
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
	}
);
	

// main menu route
app.get('/', function(req, res) {
	let html = `<ul>
		<li><a href="/auth/github">Github</a></li>
		<li><a href="/logout">logout</a></li>
		<li><a href="/protected">secure page</a></li>
	</ul>`;

	if (req.isAuthenticated()) {
		html += `<p>authenticated as user:</p>
		<pre>${JSON.stringify(req.user, null, 4)}</pre>`;
	}

	res.send(html);
});

app.get('/logout', (req, res) => {
	console.log('logging out');
	req.logout();
	res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

app.get('/protected', ensureAuthenticated, (req, res) => {
	res.send('access granted. secure stuff happens here');
});

const server = app.listen(30000, function() {
	console.log('Example app listening on port: %s', server.address().port);
});
