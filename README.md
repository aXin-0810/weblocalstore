weblocalstore
===

weblocalstore组件描述

实现web页面与页面之间的跨域传递数据

```javascript
  
  //运行命令安装
  npm install weblocalstore
  
  import weblocalstore from 'weblocalstore';
  OR
  var weblocalstore = require('weblocalstore');
  
  //本地存储indexedDB
  var indexedDbopt = weblocalstore.indexedDB
  (
    "myimVal",            //数据库名
    1,                    //数据库版本号
    [{                    //数据库建表
      name:'teblename',   //表名
      keyPath:'key'       //表行数据唯一key
     }]
   );
   
   //插入新数据
   indexedDbopt.addData(
      tablename,            //参数一：表名
      data={}               //插入数据为对象并且对象数据内必须包含表key值
   );
   
   //更新数据
   indexedDbopt.putData(
      tablename,            //参数一：表名
      data={}               //插入数据为对象并且对象数据内必须包含表key值
   );
   
   //获取表内行数据
   indexedDbopt.getData(
      tablename,            //参数一：表名
      key,                  //行数据对应key值
      function(data){}      //获取数据成功回调(数据通过data传递)    
   );

```
