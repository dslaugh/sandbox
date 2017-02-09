// https://www.codementor.io/knownasilya/testing-express-apis-with-supertest-du107mcv2
const server = require('./server');

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});