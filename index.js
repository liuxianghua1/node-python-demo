const request = require("request")
const cheerio = require("cheerio")
const mysql = require("mysql")
var item = 0;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pasword: 'root',
    database: 'root'
})
db.connect();

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

            db.query(`INSERT INTO demo (newsTitle, newsTime, newsUrl) VALUE('${newsTitle}', '${newsTime}','${newsUrl}')`, function (err, data) {
                if (err) {
                    console.log("数据库连接错误");
                } else {
                    item++;
                    // console.log("已爬取" + item + "条记录");
                    console.log(newsTitle);
                }
            })

        });
    }
})