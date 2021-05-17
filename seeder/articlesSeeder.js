const ArticleModel = require('../model/articleModel');
const LinkModel = require('../model/articleLinkList');
const _uuid = require('custom-uuid');
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://admin:sFxwOHpBFQVkTe90@cluster0.dfpa4.mongodb.net/sportDB?serverSelectionTryOnce=true&serverSelectionTimeoutMS=3000&',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(async () => {
    console.log('db connected to! start run articleSeeder()');
    const linkList = await articleSeeder();
    link(linkList);
  })
  .catch((err) => {
    console.log(err);
    console.log('db connected fail.');
  });

function articleSeeder () {
  return new Promise(async (resolve, reject) => {
    const dateDeliver = [
      {
        firstTimeStamp: new Date('2016/01/02 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/03 12:22:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/02 12:39:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/02 12:44:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/06 11:59:04').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/06 13:01:19').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/06 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/06 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/16 09:17:04').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/16 12:09:56').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/16 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/16 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/19 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/24 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/28 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/04 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/01/28 12:4:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/01/04 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/04 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/04 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/04 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/04 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/04 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/04 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/08 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/08 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/08 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/08 12:24:01').getTime()
      },
      {
        firstTimeStamp: new Date('2016/02/08 12:22:01').getTime(),
        lastUpdatTimeStampe: new Date('2016/02/08 12:24:01').getTime()
      }
    ]

    const tobeLinkList = [];
    try {
      await ArticleModel.deleteMany({ firstTimeStamp: { $gt: 0 } });
      console.log('刪除舊資料成功')
    } catch (err) {
      console.error('刪除舊資料失敗原因:', err)
    }
    dateDeliver.forEach(async dateStamps => {
      const DF = new Date(dateStamps.firstTimeStamp)
      const DL = new Date(dateStamps.lastUpdatTimeStampe)
      const uuid = _uuid()
      tobeLinkList.push({
        articleId: `arti-${uuid}`
      })
      const newArticle = new ArticleModel({
        "articleId": `arti-${uuid}`,
        "outsideTitle": `標題${uuid}`,
        "topLink": `標題${uuid}`,
        "title": "會否過最2的標題54121d皇馬？沙拿：去留不由我話事",
        "author": `標題${uuid}`,
        "lastUpdate": DL.getFullYear() + '年' + DL.getMonth() + 1 + '月' + DL.getDate() + '日',
        "firstCreate": DF.getHours() + ':' + DF.getMinutes() + ' ' + DF.getFullYear() + '年' + DF.getMonth() + 1 + '月' + DF.getDate() + '日',
        "firstTimeStamp": dateStamps.firstTimeStamp,
        "lastUpdatTimeStampe": dateStamps.lastUpdatTimeStampe,
        "imgSrc": `https://picsum.photos/1024/480/?image=${Math.floor(Math.random() * 1000) + 1}`,
        "outsideImgSrc": `https://picsum.photos/1024/480/?image=${Math.floor(Math.random() * 1000) + 1}`,
        "tags": [
          {
            "text": "英格蘭",
            "to": "https://www.yahoo.com.tw"
          },
          {
            "text": "LIVERPOOL",
            "to": "https://www.yahoo.com.tw"
          },
          {
            "text": "英格蘭超級聯賽",
            "to": "https://www.yahoo.com.tw"
          }
        ],
        "content": "VVVVVV",
        "sideLinks": [
          {
            "text": "英超大賽場",
            "to": "https://www.yahoo.com.tw"
          },
          {
            "text": "英超大賽場2",
            "to": "https://www.yahoo.com.tw"
          }
        ],
        "outSideFooterText": "faosdjfioa",
        "outSideFooterTime": DF.getFullYear() + '年' + DF.getMonth() + 1 + '月' + DF.getDate() + '日',
      })
      try {
        await newArticle.save();
      } catch (err) {
        console.log(err);
        mongoose.disconnect();
        reject(-1);
      }
    })
    console.log('儲存成功');
    console.log('要連結的清單:', tobeLinkList)
    resolve(tobeLinkList);
  })
}

async function link (linkList) {
  const newLinkList = new LinkModel({ linkList })
  try {
    await LinkModel.deleteMany({ name: 'linkList' });
    console.log('成功刪除舊聞張清單')
    newLinkList.save()
    console.log('成功連結文章清單')
  } catch (err) {
    console.log(err)
  }
}
