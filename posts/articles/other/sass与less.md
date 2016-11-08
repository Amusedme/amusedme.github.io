## sass与less的基本用法
---

> 他们都是CSS预处理框架

本文将从**语法、变量、嵌套、混入(Mixin)、继承、导入、函数和操作符**等方面来介绍两种框架的语法。


0.安装(需要[npm](http://skihi.cn/#!/posts/articles/npm/%E5%85%B3%E4%BA%8Enpm.md)和[package.json](http://skihi.cn/#!/posts/articles/npm/%E5%AF%B9package.json%E7%9A%84%E4%BD%BF%E7%94%A8.md)的支持)

sass:
```bash
	// SASS需要ruby的支持。
	$ gem install sass
	$ sass test.scss test.css
```

less:
```bash
	$ npm install -g less
	$ lessc styles.less styles.css
```

1.语法
与普通的css似乎没有区别。
```CSS
	h1{
		color:#fff;
}
```


2.变量
```CSS
	// sass
	$mainColor: #0982c1;
	$siteWidth: 1024px;
	$borderStyle: dotted;
	  
	body {
	  color: $mainColor;
	  border: 1px $borderStyle $mainColor;
	  max-width: $siteWidth;
	}


	//	less
	@mainColor: #0982c1;
	@siteWidth: 1024px;
	@borderStyle: dotted;
	  
	body {
	  color: @mainColor;
	  border: 1px @borderStyle @mainColor;
	  max-width: @siteWidth;
	}

```


3.嵌套
父子结构非常明显，减少代码量
```CSS
	// sass less
	section {
	  margin: 10px;
	  
	  nav {
	    height: 25px;
	  
	    a {
	      color: #0982C1;
	  
	      &amp;:hover {
	        text-decoration: underline;
	      }
	    }
	  }
	}

	// 最终生成
	section {
	  margin: 10px;
	}
	section nav {
	  height: 25px;
	}
	section nav a {
	  color: #0982C1;
	}
	section nav a:hover {
	  text-decoration: underline;
	}
```


4.Mixins (混入)
Mixins 有点像是函数或者是宏，当你某段 CSS 经常需要在多个元素中使用时，你可以为这些共用的 CSS 定义一个 Mixin，然后你只需要在需要引用这些 CSS 地方调用该 Mixin 即可。
```CSS
	// sass
	@mixin error($borderWidth: 2px) {
	  border: $borderWidth solid #F00;
	  color: #F00;
	}
	  
	.generic-error {
	  padding: 20px;
	  margin: 4px;
	  @ include error(); /* Applies styles from mixin error */
	}
	.login-error {
	  left: 12px;
	  position: absolute;
	  top: 20px;
	  @ include error(5px); /* Applies styles from mixin error with argument $borderWidth equal to 5px*/
	}

	// less
	.error(@borderWidth: 2px) {
	  border: @borderWidth solid #F00;
	  color: #F00;
	}
	  
	.generic-error {
	  padding: 20px;
	  margin: 4px;
	  .error(); /* Applies styles from mixin error */
	}
	.login-error {
	  left: 12px;
	  position: absolute;
	  top: 20px;
	  .error(5px); /* Applies styles from mixin error with argument @borderWidth equal to 5px */
	}

	//最终生成
	.generic-error {
	  padding: 20px;
	  margin: 4px;
	  border: 2px solid #f00;
	  color: #f00;
	}
	.login-error {
	  left: 12px;
	  position: absolute;
	  top: 20px;
	  border: 5px solid #f00;
	  color: #f00;
	}
```


5.继承
当我们需要为多个元素定义相同样式的时候，我们可以考虑使用继承的做法。
```CSS
	// 源CSS
	.block, p, ul, ol {
	  margin: 10px 5px;
	  padding: 2px;
	}
	p {
	  border: 1px solid #EEE;
	}
	ul, ol {
	  color: #333;
	  text-transform: uppercase;
	}


	// sass
	.block {
	  margin: 10px 5px;
	  padding: 2px;
	}
	  
	p {
	  @extend .block; /* Inherit styles from '.block' */
	  border: 1px solid #EEE;
	}
	ul, ol {
	  @extend .block; /* Inherit styles from '.block' */
	  color: #333;
	  text-transform: uppercase;
	}

	// less 更像是混入写法
	.block {
	  margin: 10px 5px;
	  padding: 2px;
	}
	  
	p {
	  .block; /* Inherit styles from '.block' */
	  border: 1px solid #EEE;
	}
	ul, ol {
	  .block; /* Inherit styles from '.block' */
	  color: #333;
	  text-transform: uppercase;
	}

	// 最终生成
	.block {
	  margin: 10px 5px;
	  padding: 2px;
	}
	p {
	  margin: 10px 5px;
	  padding: 2px;
	  border: 1px solid #EEE;
	}
	ul,
	ol {
	  margin: 10px 5px;
	  padding: 2px;
	  color: #333;
	  text-transform: uppercase;
	}
```


6.导入 (Import)
多个文件相互引用
```CSS
	@ import "reset.css";
	@ import "file.{type}";
	  
	p {
	  background: #0982C1;
	}
```


7.颜色函数
```CSS
	// sass
	lighten($color, 10%); /* returns a color 10% lighter than $color */
	darken($color, 10%);  /* returns a color 10% darker than $color */
	  
	saturate($color, 10%);   /* returns a color 10% more saturated than $color */
	desaturate($color, 10%); /* returns a color 10% less saturated than $color */
	  
	grayscale($color);  /* returns grayscale of $color */
	complement($color); /* returns complement color of $color */
	invert($color);     /* returns inverted color of $color */
	  
	mix($color1, $color2, 50%); /* mix $color1 with $color2 with a weight of 50% */

	//less
	lighten(@color, 10%); /* returns a color 10% lighter than @color */
	darken(@color, 10%);  /* returns a color 10% darker than @color */
	  
	saturate(@color, 10%);   /* returns a color 10% more saturated than @color */
	desaturate(@color, 10%); /* returns a color 10% less saturated than @color */
	  
	spin(@color, 10);  /* returns a color with a 10 degree larger in hue than @color */
	spin(@color, -10); /* returns a color with a 10 degree smaller hue than @color */
	  
	mix(@color1, @color2); /* return a mix of @color1 and @color2 */

```


8.运算符
你可以直接在 CSS 预处理器中进行样式的计算
```CSS
	body {
	  margin: (14px/2);
	  top: 50px + 100px;
	  right: 100px - 50px;
	  left: 10 * 10;
	}
```
