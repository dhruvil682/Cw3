import Vue from 'vue'
import Lesson from './Lesson.vue'
import Checkout from './Checkout.vue'
import App from './App.vue'


// Vue.use(Vuetify);

new Vue({
  el: '#app',
  render: h => h(App),
  components: {
    Lesson, Checkout
  }
}
)



