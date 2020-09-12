const path = require('path')
const qiniu = require('qiniu')

class UploadPlugin {
  /**
   * 构造函数
   * @param {Object} options 
   * @param {String} options.bucket 七牛云存储空间名
   * @param {String} options.accessKey 七牛云公钥
   * @param {String} options.bucket 七牛云私钥
   * @param {RegExp} options.skiped 不需要上传的文件
   */
  constructor(options) {
    const { bucket = '', accessKey = '', secretKey = '', skiped = /\.(html|md)$/ } = options
    const config = new qiniu.conf.Config()
    
    // https://developer.qiniu.com/kodo/sdk/1289/nodejs#upload-flow
    this.bucket = bucket
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.formUploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra()
    this.skiped = skiped
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', compliation => {
      const { assets, } = compliation
      const uploads = Object.keys(assets).map(asset => {
        if (!this.skiped.test(asset)) {
          return this.upload(asset, path.join(__dirname, '../dist', asset))
        } else {
          return Promise.resolve(`no need upload file ${asset}`)
        }
      })

      return Promise.all(uploads)
    })
  }

  upload(filename) {
    const options = {
      scope: this.bucket + ':' + filename,
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(this.mac)

    return new Promise((resolve, reject) => {
      const localFile = path.resolve(__dirname, '../../dist', filename)

      this.formUploader.putFile(uploadToken, filename, localFile, this.putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          return reject(respErr)
        }

        if (respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          reject(body)
        }
      })
    })
  }
}

module.exports = UploadPlugin