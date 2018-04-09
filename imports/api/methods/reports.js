import {Reports} from "/imports/api/collections/both/reports.js";

Meteor.methods({
	"reportsInsert": function(data) {
		if(!Reports.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Reports.insert(data);
	},

	"reportsUpdate": function(id, data) {
		var doc = Reports.findOne({ _id: id });
		if(!Reports.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Reports.update({ _id: id }, { $set: data });
	},

	"reportsRemove": function(id) {
		var doc = Reports.findOne({ _id: id });
		if(!Reports.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Reports.remove({ _id: id });
	}
});
