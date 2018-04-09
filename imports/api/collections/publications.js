import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Publications = new Mongo.Collection("publications");

Publications.userCanInsert = function(userId, doc) {
	return true;
};

Publications.userCanUpdate = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};

Publications.userCanRemove = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};
