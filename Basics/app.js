// const catMe = require("cat-me");
// console.log(catMe());

const http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.url)

    if(req.url === "/") {
        res.end("Welcome to the homepage")
    }
    else if(req.url === "/about") {
        res.end("This is the about page")
    }
    else if(req.url === "/profile") {
        res.end("This is the profile page")
    }
    else {
        res.statusCode = 404
        res.end("404 Not Found")
    }
})

server.listen(3000)