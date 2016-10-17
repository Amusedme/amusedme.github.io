## Echarts重新渲染数据时，需要异步
---

#### 入坑情景：
　　在项目中需要使用**echarts**，所以在百度[官方文档](http://echarts.baidu.com/)上找了一下，在根据以下代码：

1.引入Echarts:
```html
<!DOCTYPE html>
<html>
<header>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</header>
</html>
```

2.准备DOM容器来盛放图表：
```html
<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

3.为图表准备数据：
```javascript
// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
```

以下就是生成的效果图：
![](/posts/assets/imgs/echarts_1.png)

在Angular中使用：
1.定义指令
```javascript
var md = require('../module/common');
md.directive('echarts', echartsDirective);

echartsDirective.$inject = ['$rootScope', '$parse'];

function echartsDirective($rootScope,$parse){
     return {
        restrict: 'EA',
        scope:{option:"="},
        link: function(scope, ele, attrs) {
        var nowid = attrs.id;
            var myChart = echarts.init(document.getElementById(nowid));
            myChart.setOption(scope.option);
        }
    };
}

```

2.在jade中引入指令
```jade
div(echarts ="myecharts" id="myecharts1" style="width:100%;height:500px;" 
option="option1")
```

3.在Controller中初始echarts
```javascript
initChart(data);
function initChart(resFigureData) {
    $scope.option1 = {
      title: {
        text: '工单个数'
      },
      tooltip: {},
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['工单个数']
      },
      xAxis: {
        data: ['总量', '客观题', '主观题']
      },
      yAxis: {},
      series: [
        {
          name: '工单个数',
          type: 'bar',
          data: [resFigureData.total_bill, resFigureData.kg_count, resFigureData.zg_count],
          barMaxWidth: 50,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = [
                  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}m',
                textStyle: {
                  color: 'tomato'
                }
              }
            }
          }
        }
      ]
    };
}
```

到目前为止，可以在页面中渲染出相应的图表。

然而，需求是要根据时间的变化改变图表中的内容。几经尝试，发现这个initChart方法只能被触发一次。

想法：当点击按钮时，时间发生了变化，让当Controller发一个事件出去，让指令中的link来监听这个事件。

发事件：
```javascript
$scope.$broadcast('FigureDataChange', ()=> {});
```

监听事件：
```javascript
scope.$on('FigureDataChange', function() {
            myChart.setOption(scope.option);           
        });
```


在页面中还是没达到效果，第一次点击时，坐标内的内容全为0，第二次点击才出现相应的数据。

猜测：可能是数据还没来得及更新，图表就已渲染完了，因为数据是请求的。
所以，采用$timeout来异步执行事件分发。

```javascript
$timeout(function () {
        $scope.$broadcast('FigureDataChange', ()=> {});
});
```


結论：echarts更新数据时，即时显示数据应异步操作的。