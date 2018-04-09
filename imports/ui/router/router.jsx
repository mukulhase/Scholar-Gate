import React, { Component } from "react";
import PropTypes from "prop-types";
import {mount, withOptions} from "react-mounter";
import {LayoutContainer} from "/imports/ui/layouts/layout.jsx";
import {NotFound} from "/imports/ui/pages/not_found/not_found.jsx";
import {HomePublicPageContainer} from "/imports/ui/pages/home_public/home_public.jsx";
import {SearchPageContainer} from "/imports/ui/pages/search/search.jsx";
import {SearchUserSearchPageContainer} from "/imports/ui/pages/search/user_search/user_search.jsx";
import {SearchPublicationsSearchPageContainer} from "/imports/ui/pages/search/publications_search/publications_search.jsx";
import {SearchPublicationsSearchFilterSearchPageContainer} from "/imports/ui/pages/search/publications_search/filter_search/filter_search.jsx";
import {SearchPublicationsSearchSemanticSearchPageContainer} from "/imports/ui/pages/search/publications_search/semantic_search/semantic_search.jsx";
import {PublicationPageContainer} from "/imports/ui/pages/publication/publication.jsx";
import {PublicationDetailsPageContainer} from "/imports/ui/pages/publication/details/details.jsx";
import {PublicationInsertPageContainer} from "/imports/ui/pages/publication/insert/insert.jsx";
import {PublicationUpdatePageContainer} from "/imports/ui/pages/publication/update/update.jsx";
import {AuthorPageContainer} from "/imports/ui/pages/author/author.jsx";
import {LoginPageContainer} from "/imports/ui/pages/login/login.jsx";
import {RegisterPageContainer} from "/imports/ui/pages/register/register.jsx";
import {VerifyEmailPageContainer} from "/imports/ui/pages/verify_email/verify_email.jsx";
import {ForgotPasswordPageContainer} from "/imports/ui/pages/forgot_password/forgot_password.jsx";
import {ResetPasswordPageContainer} from "/imports/ui/pages/reset_password/reset_password.jsx";
import {HomePrivatePageContainer} from "/imports/ui/pages/home_private/home_private.jsx";
import {AdminPageContainer} from "/imports/ui/pages/admin/admin.jsx";
import {AdminUsersPageContainer} from "/imports/ui/pages/admin/users/users.jsx";
import {AdminUsersDetailsPageContainer} from "/imports/ui/pages/admin/users/details/details.jsx";
import {AdminUsersInsertPageContainer} from "/imports/ui/pages/admin/users/insert/insert.jsx";
import {AdminUsersEditPageContainer} from "/imports/ui/pages/admin/users/edit/edit.jsx";
import {UserSettingsPageContainer} from "/imports/ui/pages/user_settings/user_settings.jsx";
import {UserSettingsProfilePageContainer} from "/imports/ui/pages/user_settings/profile/profile.jsx";
import {UserSettingsChangePassPageContainer} from "/imports/ui/pages/user_settings/change_pass/change_pass.jsx";
import {LogoutPageContainer} from "/imports/ui/pages/logout/logout.jsx";
import {PublicationsPageContainer} from "/imports/ui/pages/publications/publications.jsx";
import {PublicationsDetailsPageContainer} from "/imports/ui/pages/publications/details/details.jsx";
import {PublicationsInsertPageContainer} from "/imports/ui/pages/publications/insert/insert.jsx";
import {PublicationsUpdatePageContainer} from "/imports/ui/pages/publications/update/update.jsx";
import {ClaimPublicationPageContainer} from "/imports/ui/pages/claim_publication/claim_publication.jsx";
/*IMPORTS*/

const reactMount = withOptions({
	rootProps: {
		className: "react-root"
	}
}, mount);

// Wait user data to arrive
FlowRouter.wait();

// subscribe to user data
var userDataSubscription = Meteor.subscribe("current_user_data");

Tracker.autorun(function() {
	if(userDataSubscription.ready() && !FlowRouter._initialized) {
		// user data arrived, start router
		FlowRouter.initialize();
	}
});


Tracker.autorun(function() {
	var userId = Meteor.userId();
	var user = Meteor.user();
	if(userId && !user) {
		return;
	}

	var currentContext = FlowRouter.current();
	var route = currentContext.route;
	if(route) {
		if(user) {
			if(route.group.name == "public") {
				FlowRouter.reload();
			}
		} else {
			if(route.group.name == "private") {
				FlowRouter.reload();
			}
		}
	}
});

const publicRouteNames = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

const privateRouteNames = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"publications",
	"publications.details",
	"publications.insert",
	"publications.update",
	"claim_publication"
];

const freeRouteNames = [
	"home_public",
	"search",
	"search.user_search",
	"search.publications_search",
	"search.publications_search.filter_search",
	"search.publications_search.semantic_search",
	"publication",
	"publication.details",
	"publication.insert",
	"publication.update",
	"author"
];

const roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

const firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		console.log("All routes are restricted for current user.");
		return "notFound";
	}

	return "";
};

// this function returns true if user is in role allowed to access given route
export const routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app doesn't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	// if user data not arrived yet, allow route - user will be redirected anyway after his data arrive
	if(Meteor.userId() && !Meteor.user()) {
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in or doesn't have "role" member
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};


FlowRouter.subscriptions = function() {
	this.register("current_user_data", Meteor.subscribe("current_user_data"));
};


const freeRoutes = FlowRouter.group({
	name: "free",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!routeGranted(context.route.name)) {
				// user is not in allowedRoles - redirect to first granted route
				var redirectRoute = firstGrantedRoute("home_public");
				redirect(redirectRoute);
			}
		}
	]
});

const publicRoutes = FlowRouter.group({
	name: "public",
	triggersEnter: [
		function(context, redirect, stop) {
			if(Meteor.user()) {
				var redirectRoute = firstGrantedRoute("home_private");
				redirect(redirectRoute);
			}
		}
	]
});

const privateRoutes = FlowRouter.group({
	name: "private",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!Meteor.user()) {
				// user is not logged in - redirect to public home
				var redirectRoute = firstGrantedRoute("home_public");
				redirect(redirectRoute);
			} else {
				// user is logged in - check role
				if(!routeGranted(context.route.name)) {
					// user is not in allowedRoles - redirect to first granted route
					var redirectRoute = firstGrantedRoute("home_private");
					redirect(redirectRoute);
				}
			}
		}
	]
});

FlowRouter.notFound = {
	action () {
		reactMount(LayoutContainer, {
			content: (<NotFound />)
		});
	}
};

freeRoutes.route("/", {
    name: "home_public",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<HomePublicPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/search", {
    name: "search",

	triggersEnter: [
		function(context, redirect, stop) {
			FlowRouter.withReplaceState(function() {
				redirect("search.user_search", context.params, context.queryParams);
			});

		}
	],
    action: function(routeParams, routeQuery) {
    	
    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/search/user_search", {
    name: "search.user_search",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<SearchPageContainer routeParams={routeParams} subcontent={
					<SearchUserSearchPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/search/publications_search", {
    name: "search.publications_search",

	triggersEnter: [
		function(context, redirect, stop) {
			FlowRouter.withReplaceState(function() {
				redirect("search.publications_search.filter_search", context.params, context.queryParams);
			});

		}
	],
    action: function(routeParams, routeQuery) {
    	
    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/search/publications_search/filter_search", {
    name: "search.publications_search.filter_search",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<SearchPageContainer routeParams={routeParams} subcontent={
					<SearchPublicationsSearchPageContainer routeParams={routeParams} subcontent={
						<SearchPublicationsSearchFilterSearchPageContainer routeParams={routeParams} />
					} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/search/publications_search/semantic_search", {
    name: "search.publications_search.semantic_search",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<SearchPageContainer routeParams={routeParams} subcontent={
					<SearchPublicationsSearchPageContainer routeParams={routeParams} subcontent={
						<SearchPublicationsSearchSemanticSearchPageContainer routeParams={routeParams} />
					} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/publication/:publicationId", {
    name: "publication",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/publication/:publicationId/details/:commentId", {
    name: "publication.details",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/publication/:publicationId/insert", {
    name: "publication.insert",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/publication/:publicationId/update/:commentId", {
    name: "publication.update",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationUpdatePageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

freeRoutes.route("/author/:authorId", {
    name: "author",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AuthorPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/login", {
    name: "login",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<LoginPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/register", {
    name: "register",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<RegisterPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/verify_email/:verifyEmailToken", {
    name: "verify_email",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<VerifyEmailPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/forgot_password", {
    name: "forgot_password",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<ForgotPasswordPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/reset_password/:resetPasswordToken", {
    name: "reset_password",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<ResetPasswordPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/home_private", {
    name: "home_private",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<HomePrivatePageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/admin", {
    name: "admin",

	triggersEnter: [
		function(context, redirect, stop) {
			FlowRouter.withReplaceState(function() {
				redirect("admin.users", context.params, context.queryParams);
			});

		}
	],
    action: function(routeParams, routeQuery) {
    	
    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/admin/users", {
    name: "admin.users",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/admin/users/details/:userId", {
    name: "admin.users.details",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersDetailsPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/admin/users/insert", {
    name: "admin.users.insert",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersInsertPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/admin/users/edit/:userId", {
    name: "admin.users.edit",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersEditPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/user_settings", {
    name: "user_settings",

	triggersEnter: [
		function(context, redirect, stop) {
			FlowRouter.withReplaceState(function() {
				redirect("user_settings.profile", context.params, context.queryParams);
			});

		}
	],
    action: function(routeParams, routeQuery) {
    	
    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/user_settings/profile", {
    name: "user_settings.profile",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<UserSettingsPageContainer routeParams={routeParams} subcontent={
					<UserSettingsProfilePageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/user_settings/change_pass", {
    name: "user_settings.change_pass",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<UserSettingsPageContainer routeParams={routeParams} subcontent={
					<UserSettingsChangePassPageContainer routeParams={routeParams} />
				} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/logout", {
    name: "logout",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<LogoutPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/publications", {
    name: "publications",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/publications/details/:publicationId", {
    name: "publications.details",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/publications/insert", {
    name: "publications.insert",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/publications/update/:publicationId", {
    name: "publications.update",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PublicationsUpdatePageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/claim_publication", {
    name: "claim_publication",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<ClaimPublicationPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});
