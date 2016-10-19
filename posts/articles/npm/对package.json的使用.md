## 对Package.json的使用
---

>应一个朋友的需求，特地分享一下package.json的一些小知识。


1.package.json是干嘛的？
package.json 位于模块的目录下，用于定义包的属性。

2.package.json里的属性解释：
```json
{
  "name": "",                   //包名
  "description": "",            //包的描述
  "version": "",                //包的版本号
  "author": {                   //包的作者
    "name": "",
    "email": ""
  },
  "license": "MIT",             //包的授权
  "repository": {               //包代码存放，可以是 git 或 svn
    "type": "git",
    "url": ""
  },
  "keywords": [                 //关键字
    ""
  ],
  "dependencies": {             //依赖包列表
   
  },
  "devDependencies": {          //开发依赖包列表
   
  },
  
  "scripts": {                  //用于快速运行脚本 npm test
    "test": ""
  }
 
}
```

3.快速生成一个package.json:
```bash
   $ npm init [-y]          //有-y可以生成默认空值文件
```

4.安装package.json中的所有依赖：
```bash
   $ npm install
```

建议配合“关于NPM”阅读。