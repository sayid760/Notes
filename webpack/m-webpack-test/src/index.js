// import data from './a.js'  // 直接引入，非异步
let button= document.createElement('button')

button.innerHTML = '点击'
button.addEventListener('click',function(){
    console.log('click')
    import('./a.js').then(data=>{
        console.log(data.default.message)
    }) 
    // console.log(data.message) 
})

document.body.appendChild(button)

