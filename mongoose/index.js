// http://mongoosejs.com/docs/index.html

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const kittySchema = mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function() {
    const greeting = this.name ? 'Meow my name is ' + this.name : 'I don\'t have a name';
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);

  const fluffy = new Kitten( {name: 'Fluffy' });

  // fluffy.save((err, fluffy) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   fluffy.speak();
  // });

  Kitten.find((err, kittens) => {
    if (err) {
      return console.log(err);
    }

    console.log(kittens);
  });
});
