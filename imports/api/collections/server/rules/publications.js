import {Publications} from "/imports/api/collections/both/publications.js";
import {Authors} from "../../both/authors";

Publications.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Publications.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;
	_.forEach(doc.untaggedauthors,(obj)=>{
		let found = Authors.findOne({
			name:obj,
		});
		if(found){

		}else{
            Authors.insert({
                name: obj
            });
		}
	});

	if(!doc.user) doc.user = userId;
});

Publications.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Publications.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Publications.before.remove(function(userId, doc) {
	
});

Publications.after.insert(function(userId, doc) {
	
});

Publications.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Publications.after.remove(function(userId, doc) {
	
});
