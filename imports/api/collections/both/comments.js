import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Comments = new Mongo.Collection("comments");

Comments.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

Comments.userCanUpdate = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};

Comments.userCanRemove = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};
