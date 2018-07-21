export default {
  name : 'bar',
  props : {
    styles : {
      type : Object,
      default : () => {
        return {};
      }
    }
  },
  computed: {
    computedStyles(){
      return Object.assign({
        'background-color' : '#363636',
        opacity: .75,
        height : '100%',
        width : '6px',
        'border-radius': '5px',
        top : 0
      }, this.styles, {
        position: 'fixed',
        right: 0,
      })
    }
  },
  render(h){
    return h('div', {
      style : this.computedStyles,
      on : {
        mouseover : () => this.$emit('hover'),
        mouseleave : () => this.$emit('leave'),
        mousedown : (e) => {
        },
        mouseup : (e) => {
        }
      }
    })
  }
}
