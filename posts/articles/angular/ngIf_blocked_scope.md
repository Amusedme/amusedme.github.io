## ng-if 隔离作用域
---

#### 入坑情景：
　　在使用**ui-bootstrap**时，根据ui-bootstrap的指引：

官方JS:
```javascript 
angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});
```


官方HTML:
```html
<ul uib-pagination total-items="bigTotalItems" ng-model="bigCurrentPage" 
max-size="maxSize" class="pagination-sm" boundary-link-numbers="true"></ul>
```


在我的JADE中：
```jade
.page-split(ng-if="resTableData.length && isTable")
        ul(uib-pagination total-items="bigTotalItems" ng-model="currentPage" max-size="maxSize" 
        ng-change="pageChanged()" class="pagination-sm" boundary-link-numbers="true" rotate="false")
```

　　在我的Ctroller中，$scope.pageChanged，无论怎么触发，$scope.currentPage都是默认值，而不是像官网中切换变换页码值。


#### 填坑
---

　　通过查询[资料](https://code.angularjs.org/1.5.8/docs/api/ng/directive/ngIf)和咨询高人，得知**ngIf**当一个元素被ng-if从DOM中删除时，与其关联的作用域也会被销毁。而且当它重新加入DOM中时，则会生成一个新的作用域，而ng-show和ng-hide则不会。

　　另外，ngIf的优先级略高于ngView，如果ngIf的表达式值为true， ngView就可以被正常执行，但如果ngIf表达式的值为false，由于ngView的优先级较低就不会被执行。

　　所以，**ui-bootstrap**有一个它自己的作用域，在**ng-if**时被隔离了，$scope.currentPage就不会被访问到。解决方法：将**ng-if**改为**ng-show**。