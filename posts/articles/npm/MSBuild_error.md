## MSBuild时出现错误

>为什么会有这个错误？
　　很多npm包底层都需要用到node-gyp，node-gyp是用来编译C++扩展的，它需要配合Python和VS系列使用。

提示：python2.7更适合nodejs。

在项目开发中，有接触到一点NW.js，其中对C++支持，所以底层会运用node-gyp。在npm install 时，出现以下错误：
```bash
sass MSBUILD : error MSB4132: 无法识别工具版本“2.0”。可用的工具版本为 "14".
```

解决方法：

```bash
npm config set msvs_version 2012 --global
```


我的系统中装的VS2015，将以上的2012改为2015在cmd中执行即可。