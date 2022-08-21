//SYNC

const {readFileSync, writeFileSync} = require('fs')
//const fs = require('fs')
//fs.readFileSync
console.log('start')
var first = readFileSync('./content/first.txt', 'utf8') //optional second argument for  encoding
var second = readFileSync('./content/second.txt', 'utf8')

//console.log(first, second)

//writes or overwrites
writeFileSync('./content/result-sync.txt', `Here is the result: ${first}, ${second}`)
//to append add 3rd argument {flag: 'a'}
console.log('done')
console.log('next')

//ASYNC
const {readFile, writeFile} = require('fs')
console.log('start')
//these will require a callback function
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err){
        console.log(err)
        return
    }
    var first = result;


readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err){
        console.log(err)
        return
    }
    var second = result


writeFile('./content/result-async.txt',`Here is the result: ${first}, ${second}`, (err, result) =>{
if(err){
    console.log(err)
    return
}
console.log(result, 'done') //the result will be undefined here, but that is fine
})
})
})
console.log('next') //it will do this before finishing the previous task because it is asynchronous
//this allows other user to use the application at the same time