import Button from "@/components/button";
Button.install = function(Vue) {
  Vue.component("Button", Button);
};

const components = [Button];
// install Vue.use 注册全局组件
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
export default {
  // component install function
  install,
  // component ⬇
  Button
  // component ⬆
};
