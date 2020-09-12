// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //要求或禁止文件末尾存在空行
    'eol-last':0, 
    //强制在 function的左括号之前使用一致的空格
    'space-before-function-paren':0,
    //禁止不必要的分号
    'no-extra-semi':1,
    //强制分号的位置
    "semi-style": ["error", "last"],
    //要求或禁止使用分号代替 ASI
    'semi': 0,
    //缩进
    "indent": ["error", 2],
    "quotes": 0,

  }
}
