import option from './option';
import Charts from '@/components/charts'

export default {

  name: 'line-demo',
  render(h) {
    return h(Charts, {
      props:{
        option: option
      }
    });
  }
}
