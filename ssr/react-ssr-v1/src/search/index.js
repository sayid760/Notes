import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { a } from './tree-shaking';
// import '../../common/common';
import './search.less';
import logo from './aa.jpg';

class Search extends React.Component {
    constructor () {
        super(...arguments);
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
                { a() }
                { Text ?  this.state.Text : null}
                <span className="text">react ssr demo</span> 
                <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
                <img src={ logo }/>
            </div>
        )
    }
}

export default Search

// ReactDOM.render(
//     <Search/>,
//     document.getElementById('root')
// )