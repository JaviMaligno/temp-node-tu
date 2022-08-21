const path = require('path')

// platform separator,  a slash in this case
console.log(path.sep)

// joins bits of path with the above separator
const filePath = path.join('/content', 'subfolder', 'test.txt')
// if you add more slashes they are removed
// const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt")
console.log(absolute)