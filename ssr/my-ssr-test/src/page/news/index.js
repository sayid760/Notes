import React from 'react'
import './index.less'

const mockData = {
  1: `aaaaaaaaaaaaaaaaaaaaaaa`,
  2: `bbbbbbbbbbbbbbbbbbbbbbb`,
  3: `ccccccccccccccccccccccc`,
  4: `ddddddddddddddddddddddd`,
  5: `eeeeeeeeeeeeeeeeeeeeeee`
}

function News (props) {
  return (
    <div className='news-container' >
      {props.newsDetail}
    </div>
  )
}

News.getInitialProps = (ctx) => {
  const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
  return Promise.resolve({
    newsDetail: mockData[newsId]
  })
}

export default News
