import styled from 'styled-components'
import logoPic from "../../static/logo.png";

export const HeaderWrapper = styled.div`
	height: 56px;
    /* border-bottom: 1px solid #f0f0f0; */
	display:flex;
	display: -webkit-flex; /* Safari */
	flex-direction:row;
	box-shadow:0px 1px 2px rgb(0,0,0,0.1);
`;

export const Logo = styled.a.attrs({ href: "/" })`
	background: url(${logoPic}) no-repeat;
	background-size: contain;
	flex:0 0 100px;
`;


export const Nav = styled.div`
  flex:0 1 960px;
`;

export const NavItem = styled.div`
  line-height: 56px;
	padding: 0 15px;
	font-size: 17px;
	color: #333;
	&.left {
		float: left;
	}
	&.right {
		float: right;
		color: #969696;
	}
	&.active {
		color: #ea6f5a;
	}
`;

export const Addtion = styled.div`
  flex:0 0 auto;
  align-self:center;
`;

export const Button = styled.button`
	line-height:38px;
	border:1px solid #ec6149;
	font-size:14px;
	border-radius:19px;
	padding:0 20px;
	outline:none;
	&:first-child {
		margin:0 5px 0 10px;
	}
	&.reg {
		color: #ec6149;
	}
	&.writting {
		color: #fff;
		background: #ec6149;
		vertical-align:baseline;
	}
`;

export const SearchWapper = styled.div`	
  position:relative;	
  float:left;
   &.zoom {
		position: absolute;
		right: 5px;
		bottom: 5px;
		width: 30px;
		line-height: 30px;
		border-radius: 15px;
		text-align: center;
		&.focused {
			background: #777;
			color: #fff;
		}
	}
	& >.icon:hover{
		text-decoration:none;
		color:#FF0000;
	}
	& >.icon {
		/* padding-left:10px; */
		/* cursor: default; */
		position:absolute;
		top:12px;
		right:2px;
		text-decoration:none;
		padding:8px;
		background-color:rgba(180,180,180,0);
		transition:background-color 0.3s ease-out;
		border-radius:50%;
	
	}
	&.focused {
		.icon{
			background-color:rgba(180,180,180,1);
			border-radius:50%;
		}
		.inputSerach {
			width:220px;
		}
	}
`;

export const NavSearch = styled.input.attrs(
	{ placeholder: '搜索' }
)`
  	width: 160px;
	height: 38px;
	padding: 0 30px 0 20px;
	margin-top: 9px;
	margin-left: 20px;
	box-sizing: border-box;
	border: none;
	outline: none;
	border-radius: 19px;
	background: #eee;
	font-size: 14px;
	color: #666;
	transition:width 0.3s ease-out;
`;