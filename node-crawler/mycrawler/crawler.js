const cheerio = require('cheerio')
const https = require('https')
const fs = require('fs')
const path = require('path')

const baseUrl = 'https://bbs.hupu.com'

// 获取爆照区首页的信息
const getHtmlData = function (html) {
  let $ = cheerio.load(html)
  let ulBox = $('.for-list')

  let hrefArr = []
  ulBox.find('li').each(function (item) {
    let liBox = $(this)

    let target_href = liBox.children('.titlelink').children('.truetit').attr('href')

    hrefArr.push(target_href)

  })

  // console.log(hrefArr)

  return hrefArr

}

// 获取每一页的详细照片
const getDetailImg = function (html) {
  let $ = cheerio.load(html)

  let detailBox = $('.quote-content')
  let imgData = []

  detailBox.find('p').each(function (item) {
    let p = $(this)

    let img_href = p.children('img').attr('src')

    imgData.push(img_href)
  })

  return imgData
}


// 获取每一页的结构信息
const getDetail = function (hrefArr) {
  let imgArr = []

  hrefArr.forEach((item, index) => {
    https.get(`${baseUrl}${item}`, (res) => {
      let detailHtml = ''

      res.on('data', (chunk) => {
        detailHtml += chunk
      })

      res.on('end', () => {
        let imgData = getDetailImg(detailHtml)

        imgArr.push(imgData)

        if (index == (hrefArr.length - 1)) {

          
          picArr = []
          
          imgArr.forEach(ele => {
            ele.forEach(ele1 => {
              picArr.push(ele1)
            })
          })
          
          // console.log(picArr)

          picArr.forEach((ele, idx) => {
            if (ele && ele != 'https://b1.hoopchina.com.cn/web/sns/bbs/images/placeholder.png') {
              let imgItem = ''
              let count = 0
              https.get(ele, (res) => {
                res.setEncoding('binary')
                res.on('data', (chunk) => {
                  imgItem += chunk
                })
                res.on('end', () => {
                  
                  let type = ele.split('.')[ele.split('.').length - 1]
                  type = type.indexOf('format,webp')==-1?type:'webp'

                  fs.writeFile(path.join(__dirname, 'image', `${idx}-${++count}.${type}`), imgItem, 'binary', (err) => {
                    if (!err) {
                      console.log(`成功写入${idx}-${count}`)
                    }
                  })

                })
              })

            }


          })

        }


      })
    })
  })
}


for (let i = 0; i < 10; i++) {
  https.get(`${baseUrl}/selfie-${i}`, (res) => {
    let html = ''
    res.on('data', (chunk) => {
      html += chunk
    })
  
    res.on('end', () => {
      let htmlData = getHtmlData(html)
  
      getDetail(htmlData)
  
  
    })
  })
}

