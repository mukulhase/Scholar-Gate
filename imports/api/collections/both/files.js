import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Files = new FS.Collection("files", {
	stores: [new FS.Store.S3("files", {})]
});

Files.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

Files.userCanUpdate = function(userId, doc) {
	return userId && (doc.owner == userId || Users.isInRoles(userId, ["admin"]));
};

Files.userCanRemove = function(userId, doc) {
	return userId && (doc.owner == userId || Users.isInRoles(userId, ["admin"]));
};

Files.userCanDownload = function(userId, doc) {
	return true;
};
