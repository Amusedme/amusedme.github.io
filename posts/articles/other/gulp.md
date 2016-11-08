## gulp的基本用法
---

> gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

入门：
1. 全局安装 gulp：
```bash
	$ npm install --global gulp
```

2. 作为项目的开发依赖（devDependencies）安装：
```bash
	$ npm install --save-dev gulp
```

3. 在项目根目录下创建一个名为 gulpfile.js 的文件：
```bash
	var gulp = require('gulp');

	gulp.task('default', function() {
	  // 将你的默认的任务代码放在这
	});
```

4. 运行 gulp：
```bash
	$ gulp
```
默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。


以下是一个项目的gulpfile.js
```javascript

	var gulp = require("gulp");
	var eslint = require("gulp-eslint");
	var source = require("vinyl-source-stream");
	var buffer = require('vinyl-buffer');
	var watchify = require('gulp-watchify');
	var browserSync = require("browser-sync").create();
	var cached = require("gulp-cached");
	var less = require("gulp-less");
	var jade = require("gulp-jade");
	var csso = require("gulp-csso");
	var plumber = require("gulp-plumber");
	var streamify = require('gulp-streamify');
	var uglify = require("gulp-uglify");
	var gulpif = require("gulp-if");
	var babelify = require("babelify");
	var prefixer = require("gulp-autoprefixer");
	var sourcemaps = require("gulp-sourcemaps");
	var fe = require("gulp-foreach");
	var path = require('path');
	var replace = require("gulp-replace");
	var collapse = require('bundle-collapser/plugin');
	var del = require("del");
	var seq = require("gulp-sequence");
	var rename = require("gulp-rename");
	var htmlmini = require('gulp-minify-html');
	var proxyMiddleware = require('http-proxy-middleware');

	var SERVER_PROXY = "http://172.20.192.226:8080/";

	var TMP_FOLDER = "tmp/";

	var DEPLOY_FOLDER = "build/";

	var SERVER_PORT = 8090;

	var APP = "";

	var FOLDER = TMP_FOLDER;
	var TYPE = "DEV";
	var JS = ["src/app/**/*.js"];
	var DATA = ["src/datas/**/*.json"];
	var CSSMAIN = ["src/assets/style/entries/*.less"];
	var CSSDIR = ["src/assets/style/**/*.less"];
	var VIEWS = ["src/views/**/*.html"];
	var IMAGES = ["src/assets/image/**/*"];

	var proxy = proxyMiddleware("/portal", {
	    target: SERVER_PROXY,
	    changeOrigin: true
	});

	var config = {
	    watch: true,
	    cache: {},
	    packageCache: {},
	    setup: function(bundle) {
	        bundle.transform('bulkify');
	        bundle.transform(babelify, { presets: ["es2015"] });
	        bundle.transform(babelify);
	    }
	};

	gulp.task('lint', () => {
	    return gulp.src(JS).pipe(eslint()).pipe(eslint.format());
	});

	gulp.task("clear", function() {
	    del.sync([FOLDER]);
	});


	gulp.task("bundle", watchify(function(wf) {
	    if (TYPE == "DEV") LOGSERVER = "";
	    return gulp.src(JS)
	        .pipe(plumber())
	        .pipe(wf(config))
	        .on("error", function(error) {
	            console.dir(error);
	            this.emit('close');
	            this.emit('end');
	        })
	        .pipe(buffer())
	        .pipe(plumber())
	        .pipe(gulpif(TYPE == "DEPLOY", uglify()))
	        .pipe(gulp.dest(FOLDER + APP + "scripts"));
	}));

	gulp.task("compile-libs", function() {
	    return gulp.src(["libs/**/*"])
	        .pipe(gulp.dest(FOLDER + "libs"));
	});

	gulp.task("compile-views", function() {
	    return gulp.src(VIEWS)
	        .pipe(htmlmini())
	        .pipe(gulp.dest(FOLDER + APP));
	});
	gulp.task("compile-data", function() {
	    return gulp.src(DATA).pipe(gulp.dest(FOLDER + APP + "datas"));
	});

	gulp.task("compile-style", function() {
	    gulp.src(CSSMAIN, { base: "src/assets/style/entries" })
	        .pipe(less())
	        .on("error", function(error) {
	            console.dir(error);
	            this.emit('end');
	        })
	        .pipe(prefixer())
	        .pipe(gulp.dest(FOLDER + APP + "assets/style"));

	});

	gulp.task("compile-image", function() {
	    return gulp.src(IMAGES, { base: "src" })
	        .pipe(cached("debug", { optimizeMemory: true }))
	        .pipe(gulp.dest(FOLDER + APP));
	});

	gulp.task("watch", function() {
	    gulp.watch(VIEWS, ["compile-views"]);
	    gulp.watch(CSSDIR, ["compile-style"]);
	    gulp.watch(IMAGES, ["compile-image"]);
	    gulp.watch(FOLDER + APP + "/**/*", { read: false }).on('change', function(event) {
	        browserSync.reload();
	    });
	});

	gulp.task("default", ["bundle", "compile-views", "compile-libs", "compile-data", "compile-style", "compile-image"]);

	gulp.task("dev", ["default"], function() {
	    console.log("##Starting Server.......");
	    browserSync.init({
	        port: SERVER_PORT,
	        ghostMode: false,
	        notify: false,
	        server: FOLDER,
	        open: true,
	        middleware: [proxy]
	    }, function() {
	        gulp.run("watch");
	    });
	});

	gulp.task("server", seq("clear", "dev"));
	gulp.task("deploy", ["clear"], function() {
	    FOLDER = DEPLOY_FOLDER;
	    TYPE = "DEPLOY";
	    SERVER = "";
	    config = {
	        watch: false,
	        cache: {},
	        packageCache: {},
	        setup: function(bundle) {
	            bundle.transform('bulkify');
	            bundle.transform(babelify, { presets: ["es2015"] });
	            bundle.plugin(collapse);
	        }
	    };
	    gulp.start("default");
	});

```