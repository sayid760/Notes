## [返回主页](./README.md)

<b><details><summary>[2020.1.29] 你有了解video的x5-video-player-type这个属性吗？它的作用是什么呢？</summary></b>
启用同层H5播放器，就是在视频全屏的时候，div可以呈现在视频层上，也是WeChat安卓版特有的属性(ios不支持)。
同层播放别名也叫做沉浸式播放，播放的时候看似全屏，但是已经除去了control和微信的导航栏，只留下"X"和"<"两键。

```js
<video
  id="video" 
  src="video.mp4" 
  controls = "true"
  poster="images.jpg"  // 视频封面
  preload="auto" 
  webkit-playsinline="true" /* 这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/  
  playsinline="true"  // IOS微信浏览器支持小窗内播放
  x-webkit-airplay="allow" 
  x5-video-player-type="h5"  // 启用H5播放器,可以默认把微信自带播放器的播放限制住！
  x5-video-player-fullscreen="true" // 全屏设置，设置为 true 是防止横屏
  x5-video-orientation="portraint" // 播放器的方向， landscape横屏，portraint竖屏，默认值为竖屏
  style="object-fit:fill">
</video>
```

[更多参考](https://github.com/gnipbao/iblog/issues/11)
</details>