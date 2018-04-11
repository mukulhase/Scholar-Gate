import {Meteor} from "meteor/meteor";
import {Publications} from "/imports/api/collections/both/publications.js";
import {Authors} from "../../both/authors";

if (Meteor.isServer) {
    Publications._ensureIndex({
        "title": "text",
    });
}

Meteor.publish("publication_list", function() {
    return Publications.publishJoinedCursors(Publications.find({
		public: true
	}, {}));
});

Meteor.publish("publication_search", function(searchValue) {
    if (!searchValue) {
        return Publications.find({});
    }
    return Publications.find(
        {
            $text: {$search: searchValue}
        },
        {
            fields: {
                score: { $meta: "textScore" }
            },
            sort: {
                score: { $meta: "textScore" }
            }
        }
    );
});
Meteor.publish("my_publication_list", function(userid) {
    return Publications.publishJoinedCursors(Publications.find({
        authorsids:{
            $elemMatch:{
                $eq: Authors.findOne({userid: this.userid}, {})._id
            }
        }
	}, {}));
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

