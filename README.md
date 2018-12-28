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

```
