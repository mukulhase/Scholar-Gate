import {Meteor} from "meteor/meteor";
import {Comments} from "/imports/api/collections/both/comments.js";

Meteor.publish("comment_list", function() {
	return Comments.find({}, {});
});

Meteor.publish("comments_null", function() {
	return Comments.find({_id:null}, {});
});

Meteor.publish("comment", function(commentId) {
	return Comments.find({_id:commentId}, {});
});

