const option = {
  backgroundColor: '#ffffff',

  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#848484'
    }
  },

  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series : [
    {
      name:'访问来源',
      type:'pie',
      radius : '55%',
      center: ['50%', '50%'],
      data:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:274, name:'联盟广告'},
        {value:235, name:'视频广告'},
        {value:400, name:'搜索引擎'}
      ].sort(function (a, b) { return a.value - b.value; }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: '#000000'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#000000'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#b883c2',
          shadowBlur: 200,
          shadowColor: '#dddddd'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};

export default option;
