export default {
  onload: (cb)=>{
    if(document.readyState === 'complete'){
      cb();
      return void 0;
    }

    window.addEventListener('load', () => {
      cb();
    })
  }
}