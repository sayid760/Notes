## [返回主页](./README.md)

<b><details><summary>[2020.1.29] 移动端1px像素的问题及解决方案是什么？</summary></b>

1）伪类 + transform 实现（大多数ui框架用这种，支持圆角）
```js
@mixin bd-all-1px($bStyle, $color, $radius) {
    position: relative;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        box-sizing: border-box;
        transform: scale(0.5);
        transform-origin: left top;
        border: 1px $bStyle $color;
        border-radius: $radius;
    }
}　
```

2）box-shadow模拟边框
主要是阴影大小为-1，相当于吃掉一半阴影
```js
.box-shadow-1px {
    //inset内侧 h-shadow水平阴影 v-shadow垂直阴影  blur模糊距离  spread阴影大小   color颜色
    box-shadow: inset 0px -1px 1px -1px #c8c7cc;  
}
```


3）border-image（颜色更改不灵活）
<img src="https://github.com/haizlin/fe-interview/raw/master/resource/images/qrcode_public.jpg">

```js
.border-image-1px {
    border-width: 1px 0px; // 上下边框为1px 左右边框为0px（即是没有左边框）
    -webkit-border-image: url("border.png") 2 0 stretch;
    border-image: url("border.png") 2 0 stretch;   // 左右 上下的图片偏移量
    // 相当于
    // border-image-source:url("border.png") 所用图像的url地址
    // border-image-slice:2 0;  图片边框向内偏移（可以用百分比）
    // border-image-width:initial  图像边界的宽度
    // border-image-outset:initial  边框图像区域超出边框的量
    // border-image-repeat:round 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)
}
```

[参考](https://www.cnblogs.com/sunLemon/p/10775551.html)
</details>

<b><details><summary>[2020.1.29] -webkit-linear-gradient和-webkit-gradient有什么区别 </summary></b>
两者都是用来创建渐变 "图像"。
在Webkit引擎下的
-webkit-gradient: 老版本语法（可以根据语法来选择不同的渐变方式）
-webkit-linear-gradient: 新版版本语法 （渐变方式变成单一独立的的样式：  linear-gradient线性渐变  radial-gradient径向渐变）

```js
background:-webkit-gradient(linear,left top,left bottom,from(#6bb2ff),to(#2288dd));
background:-webkit-linear-gradient(top,#6bb2ff,#2288dd);
```

[参考](https://www.cnblogs.com/moqiutao/p/6364543.html)
</details>