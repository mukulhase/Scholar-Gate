import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Reports = new Mongo.Collection("reports");

Reports.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

Reports.userCanUpdate = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};

Reports.userCanRemove = function(userId, doc) {
	return userId && (doc.user == userId || Users.isInRoles(userId, ["admin"]));
};
