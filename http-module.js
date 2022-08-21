const http = require('http')
const { ServerClosedEvent } = require('mongodb')
const server = http.createServer((req, res)=>{
if (req.url === '/'){
    res.end('Welcome to our homepage')
}
//res.write()
if (req.ulr === '/about'){
    res.end('Here is our short history')
}
res.end(`<h1>Oops!</h1>
<p> I can't find the page you are looking for </p>

<a href = "/"> Back home</a>`)
})

server.listen(5000)