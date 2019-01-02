const cheerio = require('cheerio')
const http = require('http')

const fs = require('fs')
const path = require('path')

const url = 'http://www.ziroom.com/'

const getWebData = (data) => {
  let $ = cheerio.load(data)

  let imgUrlArr = $('#foucsSlideList')
  let imgArr = []

  imgUrlArr.find('li').each(function(item){

    let pic = $(this)
    
    let pic_url = pic.children('a').children('img').attr('_src')

    imgArr.push(pic_url)

  })

  imgArr.forEach((item, index) => {
    http.get(`http:${item}`, (res) => {
      let imgData = ''
      res.setEncoding('binary')

      res.on('data', (chunk) => {
        imgData += chunk
      })

      res.on('end', () => {

        fs.writeFile(path.join(__dirname, 'myImg', `${index}.jpg`), imgData, 'binary', (err) => {
          if (!err) {
            console.log('success')
          }
        })
      })
    })
  })
}

http.get(url, (res) => {
  let webData = ''
  res.on('data', (chunk) => {
    webData += chunk
  })
  res.on('end', () => {
    getWebData(webData)
  })
})
