const React = require('react')
const Container = require('../components/container')

// filt 和 sort 是前端使用的，这里传空函数即可。
module.exports = function (reactData) {
    return <Container
        columns={reactData}
        filtType = {0}
        filt={() => { }}
        sort={() => { }}
    />
}
