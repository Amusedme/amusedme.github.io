## Webpack里的path问题
---

在webpack中，配置output时会使用到文件的路径，

以下是一段常用webpack配置片段：
```json
output: {
    publicPath: '/dist/',
    path: './dist/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
```


　　由于是'/'在不同的系统中解释不一致。

　　Unix、Linux使用斜杆'/'作为路径分隔符，而web应用最新使用在Unix系统上面，所以目前所有的网络地址都采用 斜杆'/'作为分隔符。

　　Windows由于使用 斜杆'/'作为DOS命令提示符的参数标志了，为了不混淆，所以采用 反斜杠'/'作为路径分隔符。所以目前windows系统上的文件浏览器都是用 反斜杠'/'作为路径分隔符。随着发展，DOS系统已经被淘汰了，命令提示符也用的很少，斜杆和反斜杠在大多数情况下可以互换，没有影响。

所以，为了避免在不同的平台使用npm install 时出现问题，将以上代码改为：
```javascript
var path = require('path');
output: {
    publicPath: path.join(__dirname, '/dist/'),
    path: path.join(__dirname, './dist/'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
```
