"use strict";
// 插件中的package.json里面的types代表声明文件的入口
// jquery/index.d.ts   
/// <referene types="sizzle"> // 在@types里面找sizzle
/// <reference path="JQueryStatic.d.ts">  // 路径
/// <renerence path="jQuery.d.ts">
/// <renerence path="misc.d.ts">
/// <renerence path="legacy.d.ts">
// let arr:[number, string]=[123,'this is ts']
// enum Days {Mon=1, Tue, Wed, Thu, Fri, Sat, Sun}
// function isWorkDay(day:Days){
//     switch (day) {
//         case Days.Sat:
//         case Days.Sun:
//             return false
//             default:
//                 return true
//     }
// }
// class BeeKeeper{
//     hasMask:string
// }
// class LionKeeper {
//     nametag: string
// }
// class Animal {
//     numLegs: number
// }
// class Bee extends Animal{
//     keeper: BeeKeeper
// }
// class Lion extends Animal{
//     keeper: LionKeeper
// }
// function createInstance<T extends Animal>(c:new()=>T):T{
//     return new c()
// }
// createInstance(Lion).keeper.nametag
// createInstance(Bee).keeper.hasMask
