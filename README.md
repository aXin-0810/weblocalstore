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
  
  
  ######################### 本地存储indexedDB ##########################
  
  var indexedDbopt = weblocalstore.indexedDB(
    "databaseName",       //数据库名
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
   
   //获取表内所有数据
   indexedDbopt.getAllData(
      tablename,            //参数一：表名
      function(data){}      //获取数据成功回调(数据通过data逐个传递)    
   );
   
   //删除表内指定数据
   indexedDbopt.deleteDataByKey(
      tablename,            //参数一：表名
      key                   //行数据对应key值
   );
   
   //清空表数据
   indexedDbopt.clearObjectStore(
      tablename             //参数一：表名
   );
   
   //关闭数据库
   indexedDbopt.closeDatabase();
   
   //删除数据库
   indexedDbopt.delDB(
      databaseName          //参数一：数据库名
   );
   
   
   ######################### 本地存储webSql ##########################
   
   var webSqlopt = weblocalstore.webSql({
      name:'数据库名',
      size:'数据库大小',
      version:'数据库版本号',
      describe:'数据库描述',
   });
   
   //创建数据库表
   webSqlopt.createForm(obj={
      name:'数据表名',
      key:'表主键名(非必要数据)',
      titleArr:'表列名数组',
      success:function(){},       //创建成功回调
   });
   
   //插入新数据
   webSqlopt.addVal(obj={
      name:'数据表名',
      titleArr:'对应表列名数组',
      valArr:'对应数据数组',
      success:function(){},       //插入成功回调
   });
   
   //更新数据
   webSqlopt.update(obj={
      name:'数据表名',
      replaceArr:[{
        column:'表列名',
        val:'列对应数据'
      }],
      conditions:'条件语句',       //条件数据格式下方有详细描述
      success:function(){},       //更新成功回调
   });
   
   //读取数据
   webSqlopt.readVal(obj={
      name:'数据表名',
      columnArr:'列名数组',        //非必填,不填的话获取整行数据
      conditions:'条件语句',       //条件数据格式下方有详细描述
      success:function(data){},   //获取成功回调，数据通过data传递
   });
   
   //删除数据库表
   webSqlopt.delVal(obj={
      name:'数据表名',
      conditions:'条件语句',       //条件数据格式下方有详细描述
      success:function(){},       //删除成功回调
   });
   
   //条件数据格式描述
   conditions:{
      type:'',                     //type类型分别为AND(与),OR(或)
      corres:{
        id:'1',                    //条件值(id=1)  
        id_:[0,3],                 //条件值(id_>0 , id_<3)。备注：大于和小于根据数组值顺序来定，列：id_:[3,0]。表示(id_>3 , id_<0)
        id__:'!='+3                //条件值(id__!=3)
      }
    };
    
    
    ######################### 本地存储cookie ##########################
    
    var cookieopt = weblocalstore.cookie;
    
    //设置cookie存储
    cookieopt.setCookie(
        name,                   //参数一:key
        value,                  //参数二:存储数据（字符类型）
        seconds                 //参数三:存储时间（秒为单位）
    );
     
    //获取cookie数据
    cookieopt.getCookie(
        name,                   //参数一:key
    );
    
    //删除cookie数据
    cookieopt.delCookie(
        name,                   //参数一:key
    );

```
