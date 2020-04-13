const React = require('react');

module.exports = class ColumnItem extends React.Component {
    render() {
        const column = this.props.column
        return (
            <div className="item">
                <div>
                    <img src={column.cover} alt="" />
                </div>
                <div>
                    <div>
                        <h2>{column.name}</h2> {column.count}人购买
                    </div>
                   <button className="btnBuy">立即订阅</button>
                </div>
            </div>
        )
    }
}