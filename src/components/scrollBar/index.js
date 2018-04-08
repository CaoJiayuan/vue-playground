import Bar from './bar'

let timer = null;
export function throttle (callback, threshold) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    (typeof callback === 'function') && callback()
  }, threshold)
}

export default {
  name    : 'scroll-bar',
  props   : {
    height: {
      type   : Number,
      default: () => null
    }
  },
  data(){
    return {
      clientHeight : 0,
      scrollHeight : 0,
      scrolling : false
    }
  },
  methods : {
    getWrapperStyles() {
      return {
        margin : 0,
        padding: 0,
      }
    },
    renderBar(createElement){
      return createElement(Bar, {
        props : {
          styles : {
            height : this.barHeight,
            top : (this.scrollHeight * 100 / this.clientHeight) + '%',
            opacity: this.barOpacity
          }
        }
      })
    },
    onScroll(e){
      this.scrolling = true;
      throttle(() => this.scrolling = false, 300);
      this.scrollHeight = e.path[1].scrollY;
    }
  },
  computed: {
    computedHeight() {
      if (this.height === null) {
        return document.documentElement.clientHeight
      }
      return this.height
    },
    barHeight(){
      if (this.clientHeight !== 0){
        return ((this.computedHeight / this.clientHeight) * 100) + '%'
      }
      return 0;
    },
    barOpacity(){
      return this.scrolling ? .75 : .2
    }
  },
  mounted() {
    this.clientHeight = this.$el.clientHeight
  },
  render(h) {
    let data = {
      style     : this.getWrapperStyles(),
      directives :[{
        name : 'scroll',
        value : this.onScroll
      }]
    };

    return h('div', data, [this.$slots.default, this.renderBar(h)])
  }
}
