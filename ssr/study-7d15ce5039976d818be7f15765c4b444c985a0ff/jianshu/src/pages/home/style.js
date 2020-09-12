import styled from 'styled-components'

export const HomeWapper = styled.div`
  width:750px;
  margin:0px auto;
  overflow:hidden;
  ::after {
    clear: both;
    content:"";
  }
`

export const HomeLeft = styled.div`
  float:left;
  padding-top:20px;
  width:485px;
  box-sizing:border-box;
  .banner-image {
    width:485px;
    height:210px;
    border-radius:10px;
  }
`;

export const HomeRight = styled.div`
    float:left;
    width:240px;
    padding:0 0 0 25px;
    /* background:red; */
`

export const TopicWrapper = styled.div`
	overflow: hidden;
	padding: 20px 0 10px 0;
	margin-left: -18px;
  border-bottom: 1px solid #dcdcdc;
  display:none;
`;

export const TopicItem = styled.div`
	float: left;
	height: 32px;
	line-height: 32px;
	margin-left: 18px;
	margin-bottom: 18px;
	padding-right: 10px;
	background-color: #f7f7f7;
	font-size: 14px;
	color: #000;
	border: 1px solid #dcdcdc;
	border-radius: 4px;
	.topic-pic {
		display: block;
		float: left;
		width: 32px;
		height: 32px;
		margin-right: 10px;
	}
`;

export const ListWrapper = styled.div`
  width:100%;
  overflow:hidden;
`;

export const ListItem = styled.div`
  width:100%;
  padding-top:30px;
  border-bottom:1px solid #F0F0F0;
  .list-info {
    /* position:absolute; */
    float:left;
    /* margin-right:170px; */
    width:330px;
    >h3 {
      text-overflow:ellipsis;
      overflow:hidden;
      white-space: nowrap;
      line-height: 27px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    >p {
      text-overflow:ellipsis;
      overflow:hidden;
      max-height:90px;
      line-height: 24px;
		  font-size: 13px;
		  color: #999;
    }
    >.meta {
      height:30px;
      line-height:30px;
      font-size: 12px;
      font-weight: 400;
      color:#b4b4b4;
      vertical-align:middle;
      >span {
        margin-right:10px;
      }
      >.jsd-meta {
        color:#ea6f5a;
      }
      .iconfont {
        font-size: 12px;
        margin-right:2px;
      }
    }
  }
  .img-content  {
    /* position:absolute; */
    /* right:0; */
    float:right;
    padding-top:10px;
    width:150px;
    height:100px;
  }
  ::after {
    clear:both;
    content:"";
    display:block;
  }
`;

export const RecommentWrapper = styled.div`
  padding-top:20px;
`;

export const RecommentItem = styled.div`
  width:219px;
  height:39px;
  margin-bottom:5px;
`

export const CodePicture = styled.div`
  border:1px solid #CCC;
  border-radius:10px;
  margin-top:10px;
  width:218px;
  padding:5px;
  box-sizing:border-box;
  >img {
    float:left;
    display:block
  }
  >div {
    float:left;
    font-size:12px;
    color:#ccc;
    margin-left:10px;
    line-height:16px;
    vertical-align:middle;
    >div {
      margin:5px 0 0 0px;
      >h4 {
        font-weight:700;
        color:#000;
        font-size:14px;
      }
      >p {
        line-height:20px;
      }
    }
  }
  &::after{
    content:"";
    display:block;
    clear:both;
  }
`;

export const WriterWrapper = styled.div`
  padding-top:10px;
  margin:0 auto;
`;

export const WriterItem = styled.div`
  padding-bottom:10px;
  >img {
    border-radius:50%;
    border:1px solid #CCC;
    width:48px;
    height:48px;
    float:left;
  }
  >div {
    margin-left:5px;
    float:left;
    font-size:14px;
    padding:7px 0;
    .author {
      width:700;
    }
    a {
      float:right;
      color:green;
      text-decoration:none;
    }
    .desc {
      font-size:12px;
      color:#969696;
      line-height:25px;
    }
  }
  &::after {
    content:"";
    display:block;
    clear: both;
  }
`;

export const WriteHeade = styled.div`
  color:#999999;
  font-size:14px;
  line-height:14px;
  padding-bottom:10px;
  width:200px;
  >:first-child {
    float:left;
  }
  >:last-child {
    float:right
  }
  ::after {
    display:block;
    clear: both;
    content:'';
  }
`;

export const AddMore = styled.a.attrs({
  // href:'/'
})`
  display:block;
  border-radius:30px;
  color:#696969;
  width:100%;
  height:40px;
  text-align:center;
  line-height:40px;
  background-color:#CCCCCC;
  margin-top:10px;
  text-decoration:none;
  :hover {
    text-decoration:none;
  }
`;

export const ToTop = styled.div`
  position:fixed;
  width:60px;
  height:60px;
  right:calc(50% - 400px);
  bottom:10px;
  border:1px solid #CCCCCC;
  background-color:#EFEFEF;
  line-height:60px;
  text-align:center;
  user-select:none
`;