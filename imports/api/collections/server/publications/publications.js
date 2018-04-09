import {Meteor} from "meteor/meteor";
import {Publications} from "/imports/api/collections/publications.js";

Meteor.publish("publication_list", function() {
	return Publications.publishJoinedCursors(Publications.find({}, {}));
});

Meteor.publish("publications_null", function() {
	return Publications.publishJoinedCursors(Publications.find({_id:null}, {}));
});

Meteor.publish("publication", function(publicationId) {
	return Publications.publishJoinedCursors(Publications.find({_id:publicationId}, {}));
});

Meteor.publish("public_search", function() {
	return Publications.publishJoinedCursors(Publications.find({}, {}));
});

Meteor.publish("claim_publications", function() {
	return Publications.publishJoinedCursors(Publications.find({}, {}));
});

