import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";


export class AdminPage extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	

	

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container">
		<div className="row">
			<div className="col-md-12" id="content">
				<div className="row" id="title_row">
					<div className="col-md-12">
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div id="menu" className="col-sm-3 col-md-2">
				<h2>
				</h2>
				<AdminPageSideMenu data={this.props.data} routeParams={this.props.routeParams} />
			</div>
			<div id="subcontent" className="col-sm-9 col-md-10">
				{this.props.subcontent}
			</div>
		</div>
	</div>
);
		}
	}
}

export const AdminPageContainer = withTracker(function(props) {
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

})(AdminPage);
export class AdminPageSideMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		
	}

	

	

	render() {
		return (
	<ul id="menu-items" className="nav nav-stacked nav-pills">
		<li id="menu-item-simple" className={menuItemClass('admin.users')}>
			<a href={pathFor('admin.users', {})}>
				<span className="item-title">
					Users
				</span>
			</a>
		</li>
	</ul>
);
	}
}
