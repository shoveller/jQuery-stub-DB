/**
 * Created by cinos81 on 15. 12. 30..
 */

$.stubDB = function stubDB(jsonArr, options){
	var privates = $.extend({},{
		urlRoot: 'users',
		idAttribute:'id',
		collection:new Backbone.Collection(jsonArr)
	},options || {});
	
	function getPrivates(){
		return privates;
	}

	function getUrl(urlStr){
		return Backbone.Router.prototype._routeToRegExp(urlStr)
	}

	return {
		dumpJSON: function(){
			console.log(JSON.stringify(getPrivates()['collection'].toJSON(),null,2));
		},
		getIdObj: function(id){
			var idObj = {};
			idObj[getPrivates()['idAttribute']] = id;
			return idObj;
		},
		get: function(urlPattern, responseCallback){
			var self = this;
			$.mockjax(_.extend({
				url: getUrl(urlPattern),
				type: 'GET'
			},{response:function(settings,done){
				settings['collection'] = getPrivates()['collection'];
				settings['idAttribute'] = getPrivates()['idAttribute'];
				responseCallback.call(this,settings,done);
			}
			}));
		},
		post: function(urlPattern, responseCallback){
			var self = this;
			function responseCallbackWrap(settings,done){
				settings['collection'] = getPrivates()['collection'];
				settings['idAttribute'] = getPrivates()['idAttribute'];
				responseCallback(settings,done);
			}
			$.mockjax(_.extend({
				url: getUrl(urlPattern),
				type: 'POST'
			},{response:responseCallbackWrap}));
		},
		put: function(urlPattern, responseCallback){
			var self = this;
			function responseCallbackWrap(settings,done){
				settings['collection'] = getPrivates()['collection'];
				settings['idAttribute'] = getPrivates()['idAttribute'];
				responseCallback(settings,done);
			}
			$.mockjax(_.extend({
				url: getUrl(urlPattern),
				type: 'PUT'
			},{response:responseCallbackWrap}));
		},
		del: function(urlPattern, responseCallback){
			var self = this;
			function responseCallbackWrap(settings,done){
				settings['collection'] = getPrivates()['collection'];
				settings['idAttribute'] = getPrivates()['idAttribute'];
				responseCallback(settings,done);
			}
			$.mockjax(_.extend({
				url: getUrl(urlPattern),
				type: 'DELETE'
			},{response:responseCallbackWrap}));
		}
	};
};