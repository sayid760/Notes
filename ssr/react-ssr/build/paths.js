// 'use strict'

// const path = require('path')
// const fs = require('fs')

// // Make sure any symlinks in the project folder are resolved:
// // https://github.com/facebook/create-react-app/issues/637
// // const appDirectory = fs.realpathSync(path.resolve(__dirname, '..'))
// const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

// const envPublicUrl = process.env.PUBLIC_URL

// const getPublicUrl = appPackageJson =>
//   envPublicUrl || require(appPackageJson).homepage

// module.exports = {
//   dotenv: resolvePath('.env'),
//   appPath: resolvePath('.'),
//   appBuild: resolvePath('dist'),
//   appPublic: resolvePath('app/public'),
//   appPackageJson: resolvePath('package.json'),
//   appSrc: resolvePath('src'),
//   entry: resolvePath('src/entry'),
//   layout: resolvePath('src/layout'),
//   appNodeModules: resolvePath('node_modules'),
//   publicUrl: getPublicUrl(resolvePath('package.json')),
//   resolvePath: resolvePath
// }

// module.exports.moduleFileExtensions = moduleFileExtensions
