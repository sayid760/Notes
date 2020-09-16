
// $.ajax({
//   url: 'http://localhost:3003/api/detail',
//   method: 'post',
//   data: JSON.stringify({
//     a: 'a',
//     b: 'b'
//   })
// }).then((res) => {
//   console.log('res', res);
//   // debugger;
// }).catch((err) => {
//   console.log('error', err);
// })

// fetch('http://localhost:3003/api/detail').then((res)=>{
//   console.log('res', res);
//   debugger;
// });

console.log('start');
a()

function a() {
  b()
}

function b() {
  c()
}

function c() {
  x = b + d;
}

console.log('end');

