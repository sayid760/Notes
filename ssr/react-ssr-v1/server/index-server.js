const React = require('react');
const { a } = require('./tree-shaking');
const logo = require('./aa.jpg');
require('./search.less');

class Search extends React.Component {
    constructor () {
        super(...arguments);
        this.state = {
            Text: null
        }
    }
    handleDynamicImport () {
        console.log('1111111')
        // import('./aa.js').then((Text) => {
        //     this.setState({
        //         Text: Text.default.msg
        //     })
        // })
    }
    render () {
        const { Text } = this.state;
        return (
            <div className="search-text" >
                { a() }
                { Text ? <Text/> : null}
                <span className="text">react ssr demo</span> 
                <button onClick={this.handleDynamicImport.bind(this)}>点击</button>
                <img src={ logo }/>
            </div>
        )
    }
}

module.exports = <Search/>;