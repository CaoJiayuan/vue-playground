export default {
  name   : 'charts',
  props  : {
    option: {
      type    : Object | Promise,
      required: true,
    },
    height: {
      type   : Number,
      default: () => 512
    }
  },
  data() {
    return {
      chart: null,
      opt  : null
    };
  },
  mounted() {
    let chart = echarts.init(this.$refs.chart);

    Promise.resolve(this.option).then(option => {
      chart.setOption(option);
      this.chart = chart;
    });
  },
  methods: {
    resizing() {
      this.chart && this.chart.resize();
    },
    refresh() {
      if (this.chart) {
        Promise.resolve(this.option).then(option => {
          this.chart.setOption(option, true);
          this.chart.resize();
        });
      }
    }
  },
  watch  : {
    option(now) {
      Promise.resolve(now).then(option => {
        this.chart && this.chart.setOption(option);
      });
    }
  },
  render(h) {
    return h('div', {
      ref       : 'chart',
      style     : {
        width   : '100%',
        height  : `${this.height}px`,
        overflow: 'hidden'
      },
      directives: [
        {
          name : 'resize',
          value: this.resizing
        }
      ]
    });
  }
};
