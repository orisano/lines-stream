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
          const line = lines[i]
          if (line && line[line.length - 1] === "\r") {
            callback(null, line.substring(0, line.length - 1))
          } else {
            callback(null, line)
          }
        }
        this.buffer = lines[L - 1]
      }
    },
    flush(callback) {
      callback(this.buffer)
    }
  })
}