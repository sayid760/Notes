import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render(){
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
if(!window.__POWERED_BY_QIANKUN__){
  render();
}
export async function bootstrap(){

}
export async function mount(props) {
  console.log('react子应用props')
  console.log(props)
  render()
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('react子应用state改变')
    console.log(state, prev)
  })
}
export async function unmount(){
  ReactDOM.unmountComponentAtNode( document.getElementById('root'));
}