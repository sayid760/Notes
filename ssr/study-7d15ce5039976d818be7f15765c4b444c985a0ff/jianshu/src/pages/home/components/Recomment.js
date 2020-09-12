
import React, { Component } from 'react';
import { RecommentWrapper, RecommentItem, CodePicture } from '../style';
import { connect } from 'react-redux';

class Recomment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { list } = this.props;
    return (
      <RecommentWrapper>
        {
          list&&list.map(item => {
            return (
              <RecommentItem key={item.get('id')}>
                <img src={item.get('imgUrl')} height="100%" alt="" />
              </RecommentItem>
            )
          })
        }
      </RecommentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.getIn(['home', 'recommendList'])
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, null)(Recomment)