angular.module('starter.services', [])
.factory('journalServices', function (UserService) {
	var _all = function(){		
		var user = Parse.User.current();
		var query = new Parse.Query("Journal");
		query.equalTo('User',user).descending("createdAt");
		return query.find();
	}

	var _save = function(journal){
        console.log('2',journal);
        if(journal.id != '' && journal.id != undefined) {
            var query = new Parse.Query("Journal");
            return query.get(journal.id, {
                success: function(myObj) {
                    // The object was retrieved successfully.
                    myObj.save({content : journal.content});
                    console.log(myObj);
                },
                error: function(object, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and description.
                    console.log(error);
                }
            });
        }
        else {
            var user = Parse.User.current();
            var journalObject = Parse.Object.extend("Journal");
            var jn = new journalObject();
            //if(tk.pos) talk.set("location", new Parse.GeoPoint(tk.pos.coords.latitude, tk.pos.coords.longitude));
            jn.set({"content": journal.content,'User': user});
            return jn.save();
        }

	}
	var _get = function(jid){
		var query = new Parse.Query("Journal");
		return query.get(jid);
	}
    var _del = function (jid){
        var query = new Parse.Query("Journal");
        return query.get(jid, {
            success: function(myObj) {
                // The object was retrieved successfully.
                myObj.destroy({});
                console.log(myObj);
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                console.log(error);
            }
        });

    }
	return {
		all: _all,
		save: _save,
		get: _get,
        delete: _del
	};
})