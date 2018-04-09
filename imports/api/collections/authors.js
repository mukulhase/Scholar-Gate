import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Authors = new Mongo.Collection("authors");

Authors.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

Authors.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

Authors.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
