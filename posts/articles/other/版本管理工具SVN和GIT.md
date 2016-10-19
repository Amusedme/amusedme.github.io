## SVN与GIT
---

>SVN与GIT都是代码管理工具。两者的区别也很明显。最大的是SVN可以在自己的服务器上运行，而GIT在墙外的别人家里。更多区别在这里

这里就分享这个常用的命令：

首先是SVN:
```bash
    svn checkout url       //检出
    svn delete filename    //删除文件
    svn up                 //update最新代码
    svn commit -m "message"//提交代码并添加注释
    svn log                //显示提交的log记录
    svn diff               //显示前后版本的差异
```

其次是GIT:
```bash
    git config --global user.name "username";       //初次设置用户名
    git config --global user.email "email";         //初次设置邮箱
    
    git clone "url"         //克隆远程仓库代码
    git add .               //将所以改动代码添加
    git commit -m "message" //提交代码并添加注释
    git pull                //从服务器更新代码
    git push origin master  //将代码提交到远程仓库
```


补充几个命令行技巧：
```bash
    rm -f "a.txt"           //强制删除a.txt
    rm -r "folder"          //删除文件夹下的所有文件包括自己
    ls                      //列出文件夹下的详情
    tree                    //对文件夹以树形展示
    tree -f                 //包括文件以树形展示
    TAB                     //提示文件名
```

