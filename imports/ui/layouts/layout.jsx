import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {userEmail, userFullName} from "/imports/modules/client/account_utils";


export class Layout extends Component {
	constructor () {
		super();
	}

	componentDidMount() {
		$(document).on("click", function (e) {
			var clickover = $(e.target).closest(".dropdown-toggle").length;
			var opened = $(".navbar-collapse").hasClass("in");
			if (opened === true && !clickover) {
				$(".navbar-collapse").collapse("hide");
			}
		});

		$(document).on("keydown", function (e) {
			var opened = $(".navbar-collapse").hasClass("in");
			if (opened === true) {
				$(".navbar-collapse").collapse("hide");
			}
		});
	}

	render() {
		return this.props.data.currentUser ?
	<PrivateLayoutContainer content={this.props.content} />
:
	<PublicLayoutContainer content={this.props.content} />
}
}

export const LayoutContainer = withTracker(function(props) {
	var data = {};

	data.currentUser = Meteor.user();

	return { data: data };
})(Layout);
export class FreeLayout extends Component {

	constructor() {
		super();
	}

	componentWillMount() {

	}

	componentDidMount() {
		$("body").addClass("landing-layout");

		$("#dismiss, .overlay, #sidebar ul li a").on("click", function () {
			if($(this).hasClass("dropdown-toggle")) {
				return;
			}
			$("#sidebar").removeClass("active");
			$(".overlay").fadeOut();
		});

		$("#sidebar-collapse").on("click", function () {
			$("#sidebar").addClass("active");
			$(".overlay").fadeIn();
			$(".collapse.in").toggleClass("in");
			$("a[aria-expanded=true]").attr("aria-expanded", "false");
		});
	}

	componentWillUnmount() {
		$("body").removeClass("landing-layout");
	}

	render() {
		return (
	<div className="layout-root">
		<div id="content" className="wrapper">
			<div className="overlay">
			</div>
			<header>
				<nav id="navbar" className="navbar main-nav navbar-fixed-top navbar-default">
					<div className="navbar-container container">
						<div className="navbar-header">
							<button type="button" className="navbar-btn navbar-toggle collapsed" id="sidebar-collapse" data-toggle="collapse">
								<span className="sr-only">
									Toggle navigation
								</span>
								<span className="icon-bar">
								</span>
								<span className="icon-bar">
								</span>
								<span className="icon-bar">
								</span>
							</button>
							<a className="navbar-brand" href="/">
								Scholar Gate
							</a>
						</div>
						<div id="menu" className="navbar-collapse collapse">
						</div>
					</div>
				</nav>
				<nav id="sidebar" className="sidebar">
					<div id="dismiss" className="dismiss">
						<i className="glyphicon glyphicon-remove">
						</i>
					</div>
					<div className="sidebar-header">
						<h3>
							Scholar Gate
						</h3>
					</div>
				</nav>
			</header>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<footer className="footer">
			<div className="container">
				<p className="text-muted">
				</p>
			</div>
		</footer>
	</div>
);
	}
}

export const FreeLayoutContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

			};
		

		
	}
	return { data: data };

})(FreeLayout);
export class PublicLayout extends Component {
	constructor () {
		super();
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="layout-root">
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-fixed-top navbar-default" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="/">
							Scholar Gate
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
						<PublicLayoutLeftMenu data={this.props.data} routeParams={this.props.routeParams} />
						<PublicLayoutRightMenu data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
				</p>
			</div>
		</div>
	</div>
);
		}
	}
}

export const PublicLayoutContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

			};
		

		
	}
	return { data: data };

})(PublicLayout);
export class PublicLayoutLeftMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	

	

	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav">
		<li id="menu-item-simple" className={menuItemClass('home_public')}>
			<a href={pathFor('home_public', {})}>
				<span className="item-title">
					Home
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('search')}>
			<a href={pathFor('search', {})}>
				<span className="fa fa-search">
				</span>
				<span className="item-title">
					&nbsp;Search
				</span>
			</a>
		</li>
	</ul>
);
	}
}
export class PublicLayoutRightMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	

	

	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav navbar-right">
		<li id="menu-item-simple" className={menuItemClass('register')}>
			<a href={pathFor('register', {})}>
				<span className="item-title">
					Register
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('login')}>
			<a href={pathFor('login', {})}>
				<span className="item-title">
					Login
				</span>
			</a>
		</li>
	</ul>
);
	}
}
export class PrivateLayout extends Component {
	constructor () {
		super();
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="layout-root">
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-fixed-top navbar-default" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="/">
							Scholar Gate
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
						<PrivateLayoutLeftMenu data={this.props.data} routeParams={this.props.routeParams} />
						<PrivateLayoutRightMenu data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
				</p>
			</div>
		</div>
	</div>
);
		}
	}
}

export const PrivateLayoutContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

			};
		

		
	}
	return { data: data };

})(PrivateLayout);
export class PrivateLayoutLeftMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	

	

	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav">
		<li id="menu-item-simple" className={menuItemClass('home_private')}>
			<a href={pathFor('home_private', {})}>
				<span className="fa fa-home">
				</span>
				<span className="item-title">
					&nbsp;Home
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('publications.insert')}>
			<a href={pathFor('publications.insert', {})}>
				<span className="fa fa-plus">
				</span>
				<span className="item-title">
					&nbsp;Upload Publication
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('search')}>
			<a href={pathFor('search', {})}>
				<span className="fa fa-search">
				</span>
				<span className="item-title">
					&nbsp;Search
				</span>
			</a>
		</li>
	</ul>
);
	}
}
export class PrivateLayoutRightMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	

	

	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav navbar-right">
		<li id="menu-item-simple" className={menuItemClass('admin')}>
			<a href={pathFor('admin', {})}>
				<span className="fa fa-wrench">
				</span>
				<span className="item-title">
					&nbsp;Admin
				</span>
			</a>
		</li>
		<li id="menu-item-dropdown" className="dropdown ">
			<a href="#" className="dropdown-toggle" data-toggle="dropdown">
				<span className="fa fa-cog">
				</span>
				<span className="item-title">
					&nbsp;{userEmail()}
				</span>
				<b className="caret">
				</b>
			</a>
			<ul id="menu-items" className="dropdown-menu">
				<li className={menuItemClass('user_settings')}>
					<a href={pathFor('user_settings', {})}>
						<span className="item-title">
							Settings
						</span>
					</a>
				</li>
				<li className={menuItemClass('logout')}>
					<a href={pathFor('logout', {})}>
						<span className="item-title">
							Logout
						</span>
					</a>
				</li>
			</ul>
		</li>
		<li id="menu-item-simple" className={menuItemClass('publications')}>
			<a href={pathFor('publications', {})}>
				<span className="item-title">
					My Publications
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('claim_publication')}>
			<a href={pathFor('claim_publication', {})}>
				<span className="item-title">
					Claim Publication
				</span>
			</a>
		</li>
	</ul>
);
	}
}
