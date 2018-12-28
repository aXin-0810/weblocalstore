function webSqlopt(obj={
  name:'数据库名',
  size:'数据库大小',
  version:'数据库版本号',
  describe:'数据库描述',
}){

  var instance=null;
  createLibrary(obj);

  // 创建数据库函数
  function createLibrary(obj={
    name:'数据库名',
    size:'数据库大小',
    version:'数据库版本号',
    describe:'数据库描述',
  }){
    if(!obj.name){obj.name='defaultName'}
    if(!obj.size){obj.size=5 * 1024 * 1024}
    if(!obj.version){obj.size='1.0'}
    if(!obj.describe){obj.describe='webSQL'}
    instance=openDatabase(obj.name,obj.version,obj.describe,obj.size);
  };

  // 创建数据表
  function createForm(obj={
    name:'数据表名',
    key:'表主键名',
    titleArr:'表列名数组',
    success:function(){},
  }){
    var i = obj.titleArr.indexOf(obj.key);

    if(i>-1){obj.titleArr[i]=obj.titleArr[i]+'  unique'};

    var command = 'CREATE TABLE IF NOT EXISTS '+obj.name+' ('+obj.titleArr.join(",")+')';
    
    synchronous(function(){
      instance.transaction(function (tx) {  
        tx.executeSql(command,[],function(){
          obj.success && obj.success()
        })
      })
    });

  };

  // 插入数据
  function addVal(obj={
    name:'数据表名',
    titleArr:'对应表列名数组',
    valArr:'对应数据数组',
    success:function(){},
  }){

    var command = `INSERT INTO ${obj.name} ${obj.titleArr ? '('+obj.titleArr.join(",")+')':''} VALUES `; 
        command+= typeof(obj.valArr[0]) == 'object'?
        obj.valArr.map((item,index)=>{return "('"+item.join("','")+"')"+((index+1)<obj.valArr.length?'':';')}):
        "('"+obj.valArr.join("','")+"');";

    synchronous(function(){
      instance.transaction(function (tx) {
        tx.executeSql(command,[],function(){
          obj.success && obj.success()
        })
      })
    });
  
  };

  // 更新数据
  function update(obj={
    name:'数据表名',
    replaceArr:[{
      column:'表列名',
      val:'列对应数据'
    }],
    conditions:'条件语句',
    success:function(){},
  }){

    var replaceStr = obj.replaceArr.map((item,index)=>{
      return item.column +'='+ item.val + ((index+1)<obj.replaceArr.length ? ',':'');
    });

    var command = 'UPDATE ' + obj.name + ' SET ' + replaceStr;

    if(obj.conditions)command += conditionsParsing(obj.conditions);
    
    synchronous(function(){
      instance.transaction(function(tx) {
        tx.executeSql(command,[],function(){
          obj.success && obj.success()
        })
      });
    });
  };

  // 读取数据
  function readVal(obj={
    name:'数据表名',
    columnArr:'列名数组',
    conditions:'条件语句',
    success:function(){},
  }){
    var columnStr = obj.columnArr && typeof(obj.columnArr) == 'object'? obj.columnArr.join(",") : '*';
    var command='SELECT ' + columnStr + ' FROM ' + obj.name;

    if(obj.conditions)command += conditionsParsing(obj.conditions);

    synchronous(function(){
      instance.transaction(function(tx) {
        tx.executeSql(command,[], function (tx, results) {
          obj.success && obj.success(results.rows);
        }, null);
      });
    });
  };

  // 删除表数据
  function delVal(obj={
    name:'数据表名',
    conditions:'条件语句',
    success:function(){},
  }){
    
    var command='DELETE FROM ' + obj.name;
    
    if(obj.conditions)command += conditionsParsing(obj.conditions);

    synchronous(function(){
      instance.transaction(function(tx) {
        tx.executeSql(command,[],function(){
          obj.success && obj.success()
        });
      });
    });
  };

  // 条件语句解析
  function conditionsParsing(conditions){
    var condiStr = ' WHERE ';
    Object.keys(conditions.corres).forEach((key,index)=>{
      if(conditions.corres[key][0]!==undefined && typeof(conditions.corres[key])=='object'){
        condiStr += key+`>`+`'${conditions.corres[key][0]}'`;
        if(conditions.corres[key][1])condiStr += ` ${conditions.type} `+key+`<`+`'${conditions.corres[key][1]}'`;
      }else{
        var i=0;
        if((conditions.corres[key].indexOf('!==') == 0 && (()=>i=3)()) || (conditions.corres[key].indexOf('!=') == 0 && (()=>i=2)())){
          condiStr += key+`!=`+`'${conditions.corres[key].substring(i)}'`;
        }else{
          condiStr += key+`=`+`'${conditions.corres[key]}'`;
        }
      }
      condiStr += (index+1)<Object.values(conditions.corres).length ? ` ${conditions.type} `:'';
    });
    return condiStr;
  };

  // 定时器解决异步
  function synchronous(function_){
    var timeID = setInterval(function(){
      if(instance!=null){  function_();  clearInterval(timeID);  };
    },20);
  };

  return {
    createForm,
    addVal,
    update,
    readVal,
    delVal,
  };
};

module.exports = webSqlopt;
