/**
 * 自定义插件 Toast 消息提示框
 */
import Toast from "./Toast.vue"
const obj = {};

obj.install = function (Vue) {
  // 1. 创建组件构建器
  const toastConstructor = Vue.extend(Toast);

  // 2. new ,创建组件对象
  const toast = new toastConstructor();

  // 3. 手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));

  // 4. toast.$el 就有相应元素
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}

export default obj;