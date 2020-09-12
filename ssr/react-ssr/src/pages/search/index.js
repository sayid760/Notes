//src/client/pages/detail/index.js
//小册详情 组件

import React from 'react';
import {Link} from 'react-router-dom';
import fetchDetail from '../../common/fetch/get-detail';

import PageContainer from '../../common/components/page-container';

// import './index.css';

//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: null
        }
    }

    static async  getInitialProps(ctx) {
        let res = await fetchDetail(ctx.match.params.id);

        return {
            fetchData:res.data ||{},
            page:{
                tdk:{
                    title:'小册详情 - koa-react-ssr demo',
                    keywords:'koa-react-ssr',
                    description:'koa-react-ssr'
                }
            }
        };
    }

    handleDynamicImport () {
        import('./aa.js').then((Text) => {
            this.setState({
                Text: Text.default.msg
            })
            console.log(Text.default.msg)
        })
    }

    render() {
        //渲染数据
        const {fetchData={}} = this.props.initialData || {};
        const  {html}  = fetchData || null;
        return (
            <div className="detail-box" >
                { this.state.Text ?  this.state.Text : null}
                <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
            </div>
        )
    }
}

export default PageContainer(Index); 