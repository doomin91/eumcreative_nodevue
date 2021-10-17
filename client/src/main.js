import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import VueCookies from 'vue-cookies';

/* element ui */
import lang from 'element-ui/lib/locale/lang/ko';
import locale from 'element-ui/lib/locale';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';

/* web site style */
import './assets/css/main.css'

Vue.use(ElementUI);
Vue.use(ElementTiptapPlugin);
locale.use(lang);

Vue.use(VueCookies);
Vue.$cookies.config('60m');
Vue.config.productionTip = false

//새로고침 시 자동으로 세션이 갱신된다.
function init(){
  const savedToken = VueCookies.get('accessToken')
  if (savedToken) {
    return store.dispatch('signinByToken', savedToken).then(res =>{
      if(res==false){
        Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie));        
        location.href="/Login"
      }else {
        // console.log(res);
      }
    })
  } else {
    return Promise.resolve()
  }
}

init().then(() => {
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
})
