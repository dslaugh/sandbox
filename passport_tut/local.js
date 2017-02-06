const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const port = process.env.PORT || 30000;

const loginPage = `<form action="/authenticate" method="post" id="loginForm">
	<table>
		<tr>
			<td><label>Username</label></td>
			<td><input type="text" name="username" id="username" /></td>
		</tr>
		<tr>
			<td><label>Password</label></td>
			<td><input type="password" name="password" id="password" /></td>
		</tr>
		<tr>
			<td><button type="submit" id="submitBtn">Submit</button></td>
		</tr>
	</table>
</form>`;

passport.use(new LocalStrategy((username, password, done) => {
	if (!username) {
		return done(null, false);
	}
	if (!password) {
		return done(null, false);
	}

	if (username === 'david' && password === 'slaugh') {
		return done(null, username);
	} else {
		return done(null, false);
	}
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'mysupersecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.get('/', (req, res) => {
	res.send(loginPage);
});

app.post('/authenticate', passport.authenticate('local', { failureRedirect: '/authfailed' }), (req, res) => {
	res.redirect('/secure');
});

app.get('/secure', (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}, (req, res) => {
	res.send('You are on a secure page');
});

app.get('/authfailed', (req, res) => {
	res.send('Authentication failed');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
