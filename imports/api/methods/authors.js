import {Authors} from "/imports/api/collections/both/authors.js";

Meteor.methods({
	"authorsInsert": function(data) {
		if(!Authors.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Authors.insert(data);
	},

	"authorsUpdate": function(id, data) {
		var doc = Authors.findOne({ _id: id });
		if(!Authors.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Authors.update({ _id: id }, { $set: data });
	},

	"authorsRemove": function(id) {
		var doc = Authors.findOne({ _id: id });
		if(!Authors.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Authors.remove({ _id: id });
	}
});
