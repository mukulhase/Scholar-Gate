import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Files = new FS.Collection("files", {
	stores: [new FS.Store.S3("files", {
        region: "ap-southeast-1", //optional in most cases
        accessKeyId: "AKIAI2DUU4V5YVBSHXSA", //required if environment variables are not set
        secretAccessKey: "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", //required if environment variables are not set
        bucket: "scholargate", //required
        ACL: "public-read-write", //optional, default is 'private', but you can allow public or secure access routed through your app URL
        folder: "uploads", //optional, which folder (key prefix) in the bucket to use
        // The rest are generic store options supported by all storage adapters
        // transformWrite: myTransformWriteFunction, //optional
        // transformRead: myTransformReadFunction, //optional
        maxTries: 1 //optional, default 5
    })]
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
