## [返回主页](../README.md)

<b><details><summary>[2020.1.29] 用js封装一个前端分页的库，说说你的思路</summary></b>
分页插件的功能：1)把请求的数据处理成每页10条数据 2)点击分页按钮时，可以操作回调函数，把

前台需要传入参数：
{
　　业务所需的参数：data
　　分页所需的参数：
　　　　　1.当前页面在第几页（currentPage）
　　　　　2.每页显示的条数（pageSize）
    分页所显示的容器：'#pagination'
}

后台返回
{
　　用于展示表格用的数据：data，
　　用于渲染分页用的数据：
　　　　1.总页数（total）
　　　　2.总记录数（records）
　　　　3.当前页（pageNo），这个也可以不传
}

插件的思路：
1) 把currentPage、pageSize当作参数请求数据，传入返回的数据去渲染页面，当请求返回的数据条数大于等于10，才显示分页函数。
2）将请求返回的全部数据(包括分页参数)，分页显示的容器，点击分页时回调动作（获取当前页面作为参数，再请求数据）作为参数传入插件函数中；
3）再将所有参数与默认的参数结合，渲染分页组件（分页的html、样式）
4）给分页添加点击事件，把点击的第几页传给之前定义好的回调，去重新请求数据。

```js
// index.js
function loadList(){
    // 请求数据
    // 渲染数据到页面
    ...
    // 判断总数据是否大于10
    if (res.totalCount <= 10) {
        $('.pagination').hide();
    } else {
        $('.pagination').show();
        _this.loadPagination(res);
    }
}

function loadPagination(res){
    let pagination ? '' : (pagination = new Pagination());
    pagination.render(res, $.extend({}, {
        container: $('#pagination'),
        onSelectPage: function (currentPage) { // 点击页面时，执行回调函数加载数据
            _this.data.listParam.currentPage = currentPage;   // 插件返回currentPage，把currentPage赋值给请求的数据
            _this.loadList(); // 点击时，重新加载数据
        }
    }));
}

// Pagination.js
var Pagination = function () {
    var _this = this;
    this.defaultOption = {
        container: null,
        currentPage: 0,
        pageRange: 3,
        onSelectPage: null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function () {
        // 点击分页  1）对于active和disabled按钮点击，不做处理
        // 2）获取点击页面的在第几页：判断点击上一页当前页该变成多少，下一页当前页该变成多少
        // 3）把点击页面的数字当作参数传给回调函数
        // typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage(value) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function (res, userOption) {
    let pageInfo = {
        hasPreviousPage: res.currentPage > 0 ? true : false, 
        prePage: res.currentPage - 1,
        hasNextPage: Math.floor(res.totalCount / res.pageSize) > res.currentPage ? true : false,
        nextPage: res.currentPage + 1,
        currentPage: res.currentPage, // 当前页面
        totalCount: res.totalCount, //共多少页
        pages: res.totalCount / res.pageSize // 多少页
    }
    // 合并选项
    this.option = $.extend({}, this.defaultOption, pageInfo, userOption);
    // 判断是否只有1页
    ...
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function () {
    var html = '',
      ...
    return html;
};
module.exports = Pagination;
```

</details>