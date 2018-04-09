import {Publications} from "/imports/api/collections/publications.js";

Meteor.methods({
	"publicationsInsert": function(data) {
		if(!Publications.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Publications.insert(data);
	},

	"publicationsUpdate": function(id, data) {
		var doc = Publications.findOne({ _id: id });
		if(!Publications.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Publications.update({ _id: id }, { $set: data });
	},

	"publicationsRemove": function(id) {
		var doc = Publications.findOne({ _id: id });
		if(!Publications.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Publications.remove({ _id: id });
	}
});