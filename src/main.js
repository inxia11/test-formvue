import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Aside from './components/Aside.vue'


Vue.use(Vuelidate)

Vue.component('app-aside', Aside)



Vue.config.productionTip = true
Vue.config.devtools = true


new Vue({
  render: h => h(App),
}).$mount('#app')
