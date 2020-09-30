const React = require('react')
const Container = require('../src/components/container')

module.exports = function (props) {
    return <Container  columns={props}
      filtType = {0}
      filt={() => { }}
      sort={() => { }}>
    </Container>
}
