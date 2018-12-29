const http = require('http')
const path = require('path')
const fs = require('fs')

let todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'))).todos
// const getTodos = () => {
//   let todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'))).todos
//   return todos
// }

http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Header", "Content-Type")

  switch(req.method){
    case "GET":
    // let todos = getTodos()
    res.write(JSON.stringify(todos))
    res.end()
    break;

    case "POST":
    let todo = []
    req.on('data', (chunk) => {
      todo += chunk
    })
    req.on('end', () => {
      console.log(todo)
      todos.push(todo)
      fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify({todos: todos}))
      // res.write(JSON.stringify(todos))
      // res.write('success')
      // res.end()
      res.end(JSON.stringify({
        result: 1
      }))
    })
    break;
  }
  
}).listen('9000', () => {
  console.log('server is running')
})
