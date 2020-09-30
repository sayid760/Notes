const fs = require('fs');
const vm = require('vm');
const path = require('path')

const templateContext = vm.createContext({});
/* 
在 ./index 中传入的 __dirname + '/index.htm' ，返回的结果就是这个文件，记为A
with 的作用是加了一层作用域，也就是说，传递上面返回的函数中的参数中，要有A中定义的变量等。
所以如果执行报错，需要检查下是否有未定义的变量。
所以，要在 ./index 中传入 {reactString: xxx}，reactString 是有定义的变量。
*/
function createTemplate(templatePath) {
    return vm.runInContext(
        `(function render(template) {
            return function (data) {
                with (data) {
                    return \`${fs.readFileSync(templatePath, 'utf-8')}\`
                }
            }
        })`,
        templateContext
    )(function (relativePath, data) {
        return createTemplate(path.dirname(templatePath) + '/' + relativePath)(data);
    });
}

module.exports = createTemplate