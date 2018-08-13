const {Transform} = require("stream")

module.exports = function lineStream() {
  return new Transform({
    buffer: "",
    transform(chunk, encoding, callback) {
      this.buffer += chunk
      if (chunk.indexOf("\n") >= 0) {
        const lines = this.buffer.split("\n")
        const L = lines.length
        for (let i = 0; i < L - 1; ++i) {
          callback(null, lines[i])
        }
        this.buffer = lines[L - 1]
      }
    },
    flush(callback) {
      callback(this.buffer)
    }
  })
}