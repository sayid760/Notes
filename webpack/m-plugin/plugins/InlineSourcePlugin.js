const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class InlineSourePlugin {
  constructor({ match }) {
    this.match = match
  }

  processTag(tag, compilation) {
    let newTag, url

    if (tag.tagName === 'link' && this.match.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: { type: 'text/css' }
      }
      url = tag.attributes.href
    }

    if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      url = tag.attributes.src
    }

    if (url) {
      newTag.innerHTML = compilation.assets[path.basename(url)].source()
      // 删除掉原本应该生成的资源
      Reflect.deleteProperty(compilation.assets, url)
      return newTag
    }

    return tag
  }

  processTags(data, compilation) {  
    const headTags = []
    const bodyTags = []

    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    })

    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })

    return { ...data, headTags, bodyTags }
  }

  apply(compiler) {
    // https://github.com/jantimon/html-webpack-plugin#alterassettaggroups-hook
    compiler.hooks.compilation.tap('InlineSourePlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterAssetTagGroups', (data, cb) => {
        data = this.processTags(data, compilation)
        cb(null, data)
      })
    })
  }
}

module.exports = InlineSourePlugin