const {Transform} = require("stream")

module.exports = function linesStream() {
  let buffer = ""
  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk
      if (chunk.indexOf("\n") < 0) {
        callback()
        return
      }

      const lines = buffer.split("\n")
      const L = lines.length
      for (let i = 0; i < L - 1; ++i) {
        const line = lines[i]
        if (line && line[line.length - 1] === "\r") {
          this.push(line.substring(0, line.length - 1))
        } else {
          this.push(line)
        }
      }
      buffer = lines[L - 1]
      callback()
    },
    flush(callback) {
      this.push(buffer)
      callback()
    }
  })
}
