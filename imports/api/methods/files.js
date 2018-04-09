import {Files} from "/imports/api/collections/files.js";

Meteor.methods({
	"filesInsert": function(data) {
		return Files.insert(data);
	},
	"filesUpdate": function(id, data) {
		Files.update({ _id: id }, { $set: data });
	},
	"filesRemove": function(id) {
		Files.remove({ _id: id });
	}
});
