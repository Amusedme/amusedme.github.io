## NPM的一些知识
---

NPM是什么？
NPM是随同NodeJS一起安装的**包管理工具**，能解决NodeJS代码部署上的很多问题。

1.安装
直接安装Nodejs即可。在Nodejs官网可以下载到新版。

2.查看NPM版本
```bash
   $ npm -v
```

如果不是最新版本，可使用以下命令更新版本：
```bash
   $ npm install npm -g
```

**注意：在Mac上，只要-g方式安装，必须在命令前加 sudo 。**

3.对NPM源操作
```bash
   $ npm install nrm -g     //安装源
   $ nrm use taobao         //切换到淘宝源，国内更快
   $ nrm test               //返回各个源的响应速度
   $ nrm ls                 //列出所有可用源
```

**提示：如果第一次装nrm很慢，可以采用cnpm  install nrm -g。**

4.全局安装
```bash
   $ npm install <Module> -g
```

5.本地安装(在项目目录下产生一个node_modules文件夹)
```bash
   $ npm install <Module>
```

6.卸载包
```bash
   $ npm uninstall <Module>
```

7.更新包
```bash
   $ npm unpdate <Module>
```

8.列出已安装包
```bash
   $ npm ls
```

9.NPM帮助
```bash
   $ npm help       //如果只要install命令，可用npm help install
```


更多命令，访问[这里](https://docs.npmjs.com/)，建议配合“对package.json的使用”阅读。