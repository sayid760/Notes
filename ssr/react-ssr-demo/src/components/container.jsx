const React = require('react');
const ColumnItem = require('./column_item.jsx')

module.exports = class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="classify">
                    <span>分类：</span>
                    <a className={this.props.filtType===0?'active':''} onClick={this.props.filt.bind(this, 0)}>全部</a> 
                    <a className={this.props.filtType===1?'active':''}  onClick={this.props.filt.bind(this, 1)}>零食</a>
                    <a className={this.props.filtType===2?'active':''}  onClick={this.props.filt.bind(this, 2)}>水果</a>
                    <a className={this.props.filtType===3?'active':''}  onClick={this.props.filt.bind(this, 3)}>粮油</a>
                </div>
                <div className="product">
                    <div className="sort">
                        <a onClick={this.props.sort.bind(this, 1)}>上新</a>
                        <a onClick={this.props.sort.bind(this, 2)}>销售</a>
                        <a onClick={this.props.sort.bind(this, 3)}>价格</a>
                    </div>
                    <div>
                    {this.props.columns.map(column => {
                            return (
                                <ColumnItem column={column} key={column.id} />
                            )
                        })}
                    </div>
                    <div className="OjL5wNoM_0"><span>— 没有更多了 —</span></div>
                </div>
            </div>
        )
    }
}