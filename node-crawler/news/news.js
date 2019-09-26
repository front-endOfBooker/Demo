const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class News {
    constructor(baseUrl, url) {
        this.baseUrl = baseUrl
        this.url = url
    }

    static formatNews(content) {
        return content.replace(/，|。|；/g, ', \n')
    }

    getHtml(html) {
        let $ = cheerio.load(html);
        let content = News.formatNews($('.quote-content').text());
        console.log(content)
    }

    readNews() {
        https.get(this.url, res => {
            let resHtml = ''
            res.on('data', (chunk) => {
                resHtml += chunk;
            });
        
            res.on('end', () => {
                console.log('read over')
                this.getHtml(resHtml);
            })
        })
    }

    readNav() {
        return new Promise((resolve, reject) => {
            https.get(this.baseUrl, res => {
                let resHtml = ''
                res.on('data', (chunk) => {
                    resHtml += chunk;
                });
        
                res.on('end', () => {
                    console.log('read over')
                    fs.writeFile(path.join(__dirname, 'new.html'), resHtml, 'utf-8', (err) => {
                        if (!err) {
                            resolve();
                            console.log('write success')
                        } else {
                            reject();
                        }
                    })
                })
            })
        });
    }
}

let baseUrl = 'https://bbs.hupu.com/kings'
let url = 'https://bbs.hupu.com/29518977.html'

let myNews = new News(baseUrl, url);
myNews.readNav().then(() => {
    myNews.readNews();
});
