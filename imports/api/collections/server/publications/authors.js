import {Meteor} from "meteor/meteor";
import {Authors} from "/imports/api/collections/authors.js";

Meteor.publish("authors_list", function() {
	return Authors.publishJoinedCursors(Authors.find({}, {}));
});

Meteor.publish("authors_null", function() {
	return Authors.publishJoinedCursors(Authors.find({_id:null}, {}));
});

Meteor.publish("author", function(authorId) {
	return Authors.publishJoinedCursors(Authors.find({_id:authorId}, {}));
});

