
import React, { Component } from 'react';
import { WriterWrapper, WriterItem, WriteHeade } from '../style';
import { connect } from 'react-redux';

class Write extends Component {
  constructor(props) { super(props); }

  render() {
    let { authors } = this.props;
    return (
      <WriterWrapper>
        <WriteHeade>
          <div>作者</div>
          <div>刷新</div>
        </WriteHeade>
        {
          authors && authors.map(item => {
            return (
              <WriterItem key={item.get('id')}>
                <img src={item.get('imgUrl')}></img>
                <div>
                  <p>
                    <span>{item.get('author')}</span>
                    <a href="/">关注</a>
                  </p>
                  <p className="desc">{item.get('desc')}</p>
                </div>
              </WriterItem>
            );
          })
        }
      </WriterWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authors: state.getIn(['home', 'authorList'])
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, null)(Write)