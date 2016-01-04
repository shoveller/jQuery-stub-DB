# jQuery-stub-DB
$.mockjax로 구현한 Restful Stub Database Server입니다.  
  
express와 비슷한 문법으로 url을 등록할 수 있습니다.  
아래의 라이브러리들에 의존합니다.  
(bower지원 예정)
  
underscore.js  
jQuery.js  
Backbone.js  
jquery-mockjax.js
  
사용 방법은 Restful API를 구현한 아래의 코드를 확인하십시오.

```
var stubDB = $.stubDB([{
    'id': '1',
    'name': '오재원'
}, {
    'id': '2',
    'name': '육재원'
}, {
    'id': '3',
    'name': '오재원'
}, {
    'id': '4',
    'name': '육재원'
},{
    'id': '5',
    'name': '오재원'
}, {
    'id': '6',
    'name': '육재원'
}, {
    'id': '7',
    'name': '오재원'
}, {
    'id': '8',
    'name': '육재원'
}]);

//Create(레코드 1개 Insert)
stubDB.post('/users',function(settings, done) {
    var nextId = (parseInt(settings.collection.max(settings.idAttribute).toJSON()[settings.idAttribute], 10) +1) +'';
    var newRecord = _.extend(JSON.parse(settings.data), stubDB.getIdObj(nextId));
    this.responseText = settings.collection.add(newRecord).toJSON();
    console.info('가상 서버의 ' + settings.url + ' 라우터가 ' + JSON.stringify(this.responseText) + ' 라고 응답했습니다.');
    done();
});

//Read(모든 레코드 Select)
stubDB.get('/users',function(settings, done) {
    this.responseText = settings.collection.toJSON();
    console.info('가상 서버의 ' + settings.url + ' 라우터가 ' + JSON.stringify(this.responseText) + ' 라고 응답했습니다.');
    done();
});

//Read(레코드 1개 Select)
stubDB.get('/users/:id',function(settings, done) {
    var id = settings.url.split('/')[2];
    var record = settings.collection.findWhere(stubDB.getIdObj(id));
    if(_.isUndefined(record)){
        record = {toJSON:function(){return undefined;}};
    }
    this.responseText = record.toJSON();
    console.info('가상 서버의 ' + settings.url + ' 라우터가 ' + JSON.stringify(this.responseText) + ' 라고 응답했습니다.');
    done();
});

//Update(레코드 1개 Update)
stubDB.put('/users/:id',function(settings, done) {
    var id = settings.url.split('/')[2];
    var record = settings.collection.findWhere(stubDB.getIdObj(id));
    if(record){
        _.each(JSON.parse(settings.data), function(value, key){
            record.set(key, value);
        });
    }else{
        record = {toJSON:function(){return undefined;}};
    }
    this.responseText = record.toJSON();
    console.info('가상 서버의 ' + settings.url + ' 라우터가 ' + JSON.stringify(this.responseText) + ' 라고 응답했습니다.');
    done();
});

//Delete(레코드 1개 Delete)
stubDB.del('/users/:id',function(settings, done) {
    var id = settings.url.split('/')[2];
    var record = settings.collection.findWhere(stubDB.getIdObj(id));
    settings.collection.remove(record);
    console.info('가상 서버의 ' + settings.url + ' 라우터가 ' + JSON.stringify(this.responseText) + ' 라고 응답했습니다.');
    done();
});
```