import modal from './components/modal.js';
import './css/style.css';
var App = function(){
    var oApp = document.querySelector("#app");
    var oModal = new modal();
    oApp.innerHTML = oModal.tpl;
}
new App();