import {Files} from "/imports/api/collections/files.js";

Files.allow({
	insert: function (userId, doc) {
		return Files.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Files.userCanUpdate(userId, doc, fields, modifier);
	},

	remove: function (userId, doc) {
		return Files.userCanRemove(userId, doc);
	},

	download: function (userId, doc) {
		return Files.userCanDownload(userId, doc);
	}
});
