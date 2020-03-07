const router = require('koa-router')()
const md5 = require('md5');
const request  = require('superagent');
const parser = require("fast-xml-parser");  // join to xml
let j2xParser =parser.j2xParser
router.prefix('/wx')

const config={
  WX_MCH_ID: '1535063641', // 商户id
  WX_SHOP_KEY: '23782ASDAsagdjgHDK1123SASasfdsfd', // 商户密钥
  WX_APP_ID: 'wx7884e3fd54e3bf98', // 小程序id
  WX_APP_SECRET: '5862d91d01fe030d10858ed491d4156e' // 小程序密钥
}

// 随机数
function getRnd32(){
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for(let i=0; i<32;i++){
    let rnd = Math.floor(Math.random()*str.length)
    result +=str[rnd]
  }
  return result
}

function getTradeNo(){
  let date = new Date()
  let arr = [date.getFullYear(), (date.getMonth()+1),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds(), Math.round(Math.random() * 23 + 100)]
  return arr.join('')
}

// ip
function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
  if(ip.split(',').length>0){
      ip = ip.split(',')[0]
  }
  return ip;
};

// 签名
function getWXSing(params, shopKey){
  let str = []
  for(const key in params){
    str.push(key+'='+params[key])
  }

  str.sort(function(a,b){
    return a.localeCompare(b)
  })
  str.push('key='+ shopKey)
  str = str.join('&')
  str = md5(str)
  return str
}

// 1、登录获取用户opendi
router.get('/code2session', async (ctx, next) => {
  let js_code = ctx.query.code
  let result = await request 
  .get('https://api.weixin.qq.com/sns/jscode2session')
  .query({
    appid: config.WX_APP_ID,
    secret: config.WX_APP_SECRET,
    js_code: js_code,
    grant_type: 'authorization_code'
  })
  if(result.statusCode == 200){
    let {session_key, openid} = JSON.parse(result.text) 
  }else{
    console.log(result.error)
  }
  ctx.body = { 'success': 'true', 'data': JSON.parse(result.text)  }
})

// 2、在微信支付服务后台生成预支付交易单
router.get('/wxpay', async (ctx, next) => {
  let openid = ctx.query.openid
  let params ={
    appid: config.WX_APP_ID,
    mch_id: config.WX_MCH_ID,
    nonce_str: getRnd32(),
    body: 'ccc',
    out_trade_no: getTradeNo(),
    total_fee: 1,
    spbill_create_ip: getClientIp(ctx),
    notify_url: 'http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php',
    trade_type: 'JSAPI',
    openid: openid,
  }

    let str = getWXSing(params, config.WX_SHOP_KEY)
    params.sign = str
    var j2xparser = new j2xParser();
    let obj = {
      xml: params
    }
    var xml = j2xparser.parse(obj)
    // console.log(xml)

  let result = await request 
  .post('https://api.mch.weixin.qq.com/pay/unifiedorder')
  .set('Content-Type', 'application/xml')
  .send(xml)

  let data
  if(result.statusCode == 200){
  var jsonObj = parser.parse(result.text)
    data = {
      timeStamp: parseInt(new Date().getTime() / 1000) + '',
      nonceStr: params.nonce_str,
      package: 'prepay_id=' + jsonObj.xml.prepay_id,
      signType: 'MD5',
      appId: config.WX_APP_ID
    }
    let sing = getWXSing(data, config.WX_SHOP_KEY)
    data = Object.assign(data , { paySign:sing })
  }else{
    console.log(result.error)
  }
  ctx.body = { 'success': 'true', 'data': data }
})

module.exports = router


/*
// 另一种json to xml的模块
const xml2js = require('xml2js')
const  parser = new xml2js.Parser()
const builder= new xml2js.Builder({rootName:'xml'})
let str = []
  for(const key in params){
    str.push(key+'='+params[key])
  }
  str.sort(function(a,b){
    return a.localeCompare(b)
  })
  str.push('key='+ config.WX_SHOP_KEY)
  str = str.join('&')
  str = md5(str)
  params.sign = str
  var j2xparser = new j2xParser();
  let obj = {
    xml: params
  }
  var xml = j2xparser.parse(obj)
*/