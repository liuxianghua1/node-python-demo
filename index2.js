const sp = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs')
const BASE_URL = 'http://www.23us.so';

(async () => {
    let html = await sp.get(BASE_URL);
    let $ = cheerio.load(html.text);

    let books = [];

    $('#s_dd dd').each(function () {
        let info = {
            link: $(this).find('a').eq(0).attr('href'),
            name: $(this).find('a').eq(1).text(),
            image: $(this).find('img').attr('src')
        }
        books.push(info)
    })
    console.log(books);
    books.forEach(v => {
        console.log(v.link);
    fs.writeFileSync("./demo1.txt", v.link)

    });
})()