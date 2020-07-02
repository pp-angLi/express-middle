const express = require('express', ' 4.17.1')
const router = express.Router()
const https = require('https')
const mcache = require('memory-cache')
const qs = require('querystring')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "00000000",
  database: "test"
})

const cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url // 缓存的是接口, 及接口的数据
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.json(cachedBody)
      return
    } else {
      // res.sendResponse = res.send
      // res.send = (body) => {
      //   mcache.put(key, body, duration * 1000);
      //   res.sendResponse(body)
      // }

      res.jsonResponse = res.json
      res.json = (body) => { // 实际上是在请求的res.json之后再加以下代码,
        mcache.put(key, body, duration * 1000);
        res.jsonResponse(body) // 将服务器的数据在这里重新发送
      }
      next()
    }
  }
}

router.get('/test', (req, res, next) => {
  connection.query("select * from child_table where age>5", (err, req) => {
    if (err) {
      console.log(err)
    } else {
      console.log(req)
      res.json({
        data: req
      })
    }
  })
  // next()
})
// router.get('/test', (req, res, next) => {
//   next()
// })
// router.get('/test', cache(60), (req, res, next) => {
//   const postData = qs.stringify({
//     // post 请求
//     // 'id': ''
//   })
//   const opt = {
//     hostname: '', // post
//     path: '', // get url and params
//     method: 'GET',
//     headers: { // 需要与后台的数据返回的header相同

//     }
//   }

//   const request = https.request(opt, function (response) {
//     var renderData = ''
//     response.setEncoding('utf8');
//     response.on('data', function (body) {
//       renderData += body;
//     });
//     response.on('end', function () {
//       res.json(JSON.parse(renderData))
//     });
//     response.on('error', function (e) {
//       if (e) {
//         console.log(e);
//       }
//     })
//   });
//   request.on('error', function (e) {
//     console.error(e);
//   });
//   request.write(postData, 'utf-8');
// })

module.exports = router