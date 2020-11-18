class MyPlugin {
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            // 钩子函数在注册到它处理HTML之前，
            compilation.plugin('html-webpack-plugin-before-html-processing', (data, callback) => {
                    data.html = data.html.replace(`<div id="app"></div>`, `
                        <div id="app">
                            <div id="home" style="display:none">首页 骨架屏</div>
                            <div id="about" style="display:none">about页面骨架屏</div>
                        </div>
                        <script>
                            if(window.hash == '#/about' ||  location.pathname=='/about'){
                                document.getElementById('about').style.display="block"
                            }else{
                                document.getElementById('home').style.display="block"
                            }
                        </script>
                    `);
                    return data;
                }
            )
        });
    }
}


module.exports = MyPlugin