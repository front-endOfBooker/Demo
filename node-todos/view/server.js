const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

let extNameList = fs.readFileSync(path.join(__dirname, 'mime.json')) // 保存mime类型的JSON数据

http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname
  let extName = path.extname(pathName)
  if (pathName != 'favicon.ico') {
    if (pathName == '/') {
      pathName = 'index.html'
    }

    fs.readFile(path.join(__dirname, pathName), (err, data) => {
      if (err) {
        fs.readFile(path.join(__dirname, '404NotFound.html'), (errorNotFound, dataNotFound) => {
          if (errorNotFound) {
            throw errorNotFound
          } else {
            res.writeHead(200, {
              "Content-Type": "text/html; charset='utf-8'"
            })
            res.write(dataNotFound)
            res.end()
          }
        })
      } else {
        let ext = getExt(extName)

        res.writeHead(200, {
          "Content-Type": ext + "; charset='utf-8'"
        })
        res.write(data)
        res.end()
      }
    })
  }
}).listen('8090', () => {
  console.log('view is running')
})

const getExt = (extName) => {
  let ext = 'text/html'
  ext = JSON.parse(extNameList.toString())[extName]
  return ext
}
