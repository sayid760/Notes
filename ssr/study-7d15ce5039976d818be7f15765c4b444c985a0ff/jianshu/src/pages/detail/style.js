import styled from 'styled-components'

export const DetailWapper = styled.div`
  width:750px;
  margin:15px auto 0px;
  overflow:hidden;
  ::after {
    clear: both;
    content:"";
  }
  padding:15px;
  /* border:1px solid #CCC; */
	box-shadow:0px 0px 15px rgb(0,0,0,0.1);
`

export const Header = styled.div`
  line-height:35px;
  text-align:left;
  font-weight:700;
  font-size:32px;
`;

export const Mesc = styled.div`
  font-size:12px;
`
