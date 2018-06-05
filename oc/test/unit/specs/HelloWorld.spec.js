import Vue from 'vue'
import addressBook from '@/components/new'

describe('index.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(addressBook);
        const vm = new Constructor().$mount()
            // expect(vm.$el.querySelector('.hello h1').textContent)
            //     .to.equal('Welcome to Your Vue.js App')
    })
})