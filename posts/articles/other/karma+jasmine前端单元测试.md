## karma+jasmine前端单元测试
---

Q:为何要单元测试？
A：为了提升代码的质量、减少bug、快速定位bug、减少调试时间。

本文主要采用karma+jasmine来进行简单的单元测试。

0.生成一个项目package.json:
```bash
	$ npm init -y
```

1.安装必须依赖：
```bash
	$ npm install karma --save
	$ npm install karma-jasmine --save
	$ npm install karma-chrome-launcher --save
	$ npm install jasmine-core --save
	$ sudo npm install karma-cli -g
	$ npm install karma-coverage --save-dev
```

2.创建文件
在项目中创建一个js文件夹，在其中创建以下内容的js文件
```javascript
	// index.js
	function test1(){
		return 'abc';
	}
	function test2(){
		return '333';
	}

	// jasmineTest.js
	describe('TestFunction',function(){
		it('测试test',function(){
			expect('abc').toEqual(test1());
		});
		it('测试test2',function(){
			expect('123').toEqual(test2());
		});
	});
```

3.生成karma.conf.js
在项目根目录中使用karma init 生成一个测试配置文件：内容如下
```javascript
	// Karma configuration
// Generated on Mon Nov 07 2016 19:54:49 GMT+0800 (CST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'js',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: ['*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {'js/*.js':'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

```

4.开始测试：
```bash
	$	karma start
```

5.测试结果：
在浏览器的console中可以看到结果，也可以在命令行中看到SUCCESS。

6.单元测试覆盖率：
当我们在控制台键入karma start的时候会生成一个coverage文件夹，点击index.html文件，在浏览器中打开，可以查看到测试报表。