## AngularJS向PHP页面POST数据时，无法接收的问题
---

### 入坑情景

在使用$http向PHP页面POST数据时，从页面中接收，无论怎么都是空，以下是部分代码：
```javascript
 $http.post("http://localhost:8080/index.php?action=findTeam",{teamname:$scope.teamName,type:type}).success(function (data) {
                if(data.code===1000){
                    $scope.callText="正常返回";
                    $scope.isCall=true;
                }else{
                    $scope.callText="非正常返回";
                    $scope.isCall=false;
                }
            });
```

在PHP页面：
通过$_POST['teamname']_和$_POST['type']_取值时一直都是空。通过查阅资料，得知：

　　在使用AngularJS $http.post()的时候，PHP如果通过$_POST来获取值，那么它获取到的将会是空值。而如果是用jquery来进行post传递，却不会这个问题。这是为什么呢？这是因为两者的post对header的处理有所不同。jQuery会把作为JSON对象的myData序列化，而AngularJS不会，所以PHP无法接受到这个值。

怎么解决呢？高手给出以下3点：
　1.引入jquery，以此代替AngularJS。（不推荐）;

　2.在服务器端（PHP）通过  $params = json_decode(file_get_contents('php://input'),true); 获取参数，需要一个一个改，效率低下，后期维护问题也大。（不推荐）;

　3.修改Angular的$httpProvider的默认处理方式

高手推荐使用第3种方式：

在配置module时，加入以下代码：
```javascript
app.config(function($httpProvider) {
     $httpProvider.defaults.transformRequest = function(obj) {
         var str = [];
         for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         }
         return str.join("&");
     };
     $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
     }
 })
```

以上代码在使用时应注意：如果采用了代码压缩，代码中的function内参数应该以数组的方式引入。

