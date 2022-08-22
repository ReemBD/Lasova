const { Readable } = require('stream');

/**
 * Transforms buffer to stream for uploading/file manipulation purposes.
 */
function bufferToStream (buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

module.exports = bufferToStream;
