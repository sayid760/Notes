import React, { Component } from 'react';

class Home extends Component {
  constructor () {
    super(...arguments);
    this.state = {
        Text: null
    }
  }
  handleDynamicImport () {
    console.log('1111111111')
    import('./aa.js').then((Text) => {
        this.setState({
            Text: Text.default.msg
        })
    })
  }
  render () {
    const { Text } = this.state;
    return (
      <div>
        { Text ?  this.state.Text : null}
        <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
      </div>
    )
  }
}

// export default connect(({ weather, loading }) => ({
//   inforLoading: loading.effects['weather/getWeather'],
//   url: weather.url || '',
//   copyright: weather.copyright || '',
//   city: weather.city || [],
//   searchInput: weather.searchInput || '',
//   searchCitys: weather.searchCitys || [],
//   currentCity: weather.currentCity || '杭州',
//   forecast: weather.forecast || [],
//   now: weather.now || {}
// }))(Home);


export default Home