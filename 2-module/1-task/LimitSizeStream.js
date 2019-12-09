const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {

  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.counter = 0;
  }

  _transform(chunk, encoding, callback) {
    if (this.counter < this.limit) {
      this.push(chunk);
      this.counter = this.counter + chunk.length;
      callback();
    } else {
      callback(new LimitExceededError());
    }
  }
}

module.exports = LimitSizeStream;
