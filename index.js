const request = require("request")
const cheerio = require("cheerio")
let fs = require('fs')
request('http://news.dgut.edu.cn/dgut/xydt/news_list.shtml', (err, res) => {
    if (err) {
        console.log('err');
    } else {
        let $ = cheerio.load(res.body, {
            decodeEntities: false
        });
        $('.listList').children('ul').children('li').each(function () { //找到li元素对象然后通过each遍历
            var newsTitle = $(this).children('a').text(); //得到<a>标签的文字
            var newsTime = $(this).children('span').eq(1).text(); //得到第二个<span>标签的文字
            var newsUrl = "http://news.dgut.edu.cn" + $(this).children('a').attr('href'); //得到<a>标签的href的值1
            let demo = `${newsTitle}\n${newsTime}\n${newsUrl}`
            console.log(demo);
            fs.writeFileSync("./demo.txt", newsTitle)
        });
    }
})