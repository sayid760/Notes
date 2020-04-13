const data = [{
    id:1,
    name:'李子',
    count:5,
    price:8,
    type: 2,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN012hWING28vIjNWmAYg_!!725677994.jpg_430x430q90.jpg'
},
{
    id:2,
    name:'橘子',
    count:6,
    price:10,
    type:2,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN012hWING28vIjNWmAYg_!!725677994.jpg_430x430q90.jpg'
},
{
    id:3,
    name:'苹果',
    count:8,
    price:16,
    type:2,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN012hWING28vIjNWmAYg_!!725677994.jpg_430x430q90.jpg'
},
{
    id:4,
    name:'面包粉',
    count:8,
    price:8,
    type:3,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN014viHAu28vIdWIZite_!!725677994.jpg'
},
{
    id:5,
    name:'大米',
    count:50,
    price:3.5,
    type:3,
    cover:'https://img.alicdn.com/imgextra/i1/725677994/TB2iDiFbf9TBuNjy1zbXXXpepXa_!!725677994.jpg'
},
{
    id:6,
    name:'饼干',
    count:15,
    price:10,
    type:1,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN012hWING28vIjNWmAYg_!!725677994.jpg'
},
{
    id:7,
    name:'牛奶',
    count:10,
    price:15,
    type:1,
    cover:'https://img.alicdn.com/imgextra/i3/725677994/O1CN01Hp0z7a28vIgxJkcyz_!!725677994.jpg'
}]
  
  // 用于排序和过滤
  module.exports = function(sortType = 0, filtType = 0) {
    return data
      .sort((a, b) => {
        if (sortType == 1) {
            return a.id - b.id
  
        } else if (sortType == 2) {
            return a.count - b.count
  
        } else if (sortType == 3) {
            return a.price - b.price
        }
      })
      .filter((item) => {
          if (filtType == 0) {
              return item
          } else {
              return item.type == filtType
          }
      })
  }