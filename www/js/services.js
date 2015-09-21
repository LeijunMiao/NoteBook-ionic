angular.module('starter.services', [])
.factory('journalServices', function (UserService) {
	var _all = function(){		
		var user = Parse.User.current();
		var query = new Parse.Query("Journal");
		query.equalTo('User',user).descending("createdAt");
		return query.find();
	}

	var _save = function(journal){
		var user = Parse.User.current();
		var journalObject = Parse.Object.extend("Journal");
		var jn = new journalObject();
	   	//if(tk.pos) talk.set("location", new Parse.GeoPoint(tk.pos.coords.latitude, tk.pos.coords.longitude));
	    jn.set({"content": journal.content,'User': user});
		return jn.save();
	}
	var _get = function(jid){
		var query = new Parse.Query("Journal");
		return query.get(jid);
	}
	return {
		all: _all,
		save: _save,
		get: _get
	};
})