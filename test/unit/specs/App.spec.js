import Vue from 'vue'
import App from '@/App'

describe('app.vue', () => {
  it('should render a card', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.flashcards')).not.to.be.empty
  })

  // it('should have a card', () => {
  //   const Constructor = Vue.extend(App)
  //   const vm = new Constructor().$mount()
  //   expect(vm.$this.card).not.to.be.empty
  // })



  it('should have a question', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.flashcards p')).not.to.be.empty
  })

})
