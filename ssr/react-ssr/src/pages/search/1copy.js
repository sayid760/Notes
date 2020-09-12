import React from 'react';
import ReactDOM from 'react-dom';
// import { a } from './tree-shaking';
import './search.less';
// import logo from './aa.jpg';
import PageContainer from '../../common/components/page-container';

class Search extends React.Component {
    constructor (props) {
        this.state = {
            Text: null
        }
    }
    handleDynamicImport () {
        import('./aa.js').then((Text) => {
            this.setState({
                Text: Text.default.msg
            })
        })
    }
    render () {
        const { Text } = this.state;
        return (
            <div className="search-text" >
                {/* { a() } */}
                { Text ?  this.state.Text : null}
                <span className="text">react ssr demo</span> 
                <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
                {/* <img src={ logo }/> */}
            </div>
        )
    }
}

export default PageContainer(Search)