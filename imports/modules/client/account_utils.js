import {Meteor} from "meteor/meteor";

export const userEmail = function() {
	let user = Meteor.user();
	if(!user) {
		return "";
	}

	if(user.emails && user.emails.length) {
		return user.emails[0].address || "";
	}

	return "";
};

export const userFullName = function() {
	let user = Meteor.user();
	if(!user || !user.profile) {
		return "";
	}

	return user.profile.name;
};
