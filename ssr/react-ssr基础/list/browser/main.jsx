const Container = require('../components/container.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor() {
        super();
        // 3个状态都是在后端渲染，填充到 index.html 后绑定到 window 对象，
        this.state = {
            columns: reactInitData,
            filtType: reactInitFiltType,  // 这2个是在 ./node/index.js 中渲染时传递给 index.htm 的，用于记录当前排序和过滤的状态。
            sortType: reactInitSortType
        }
    }

    render() {
        return (
            <Container
                columns={this.state.columns}
                filt={(filtType) => {
                    fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
                        .then(res => res.json())
                        .then(json => {
                            this.setState({
                                columns: json,
                                filtType: filtType
                            })
                        })
                }}
                filtType={this.state.filtType}
                sort={(sortType) => {
                    fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
                        .then(res => res.json())
                        .then(json => {
                            this.setState({
                                columns: json,
                                sortType: sortType
                            })
                        })
                }}
            />
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('reactapp')
)