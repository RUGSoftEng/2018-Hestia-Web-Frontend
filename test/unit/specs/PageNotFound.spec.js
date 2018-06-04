import Vue from 'vue';
import PageNotFound from '@/components/PageNotFound';

const $route = {
  path: '/iets',
};

Vue.prototype.$route = $route;

describe('PageNotFound.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PageNotFound);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('Page not found');
  });
});
