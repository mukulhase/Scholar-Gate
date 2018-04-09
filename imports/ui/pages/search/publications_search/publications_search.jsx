import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";


export class SearchPublicationsSearchPage extends Component {
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
			<div className="col-md-12" id="menu">
				<SearchPublicationsSearchPageMenu data={this.props.data} routeParams={this.props.routeParams} />
			</div>
		</div>
		<div className="row">
			<div className="col-md-12" id="subcontent">
				{this.props.subcontent}
			</div>
		</div>
	</div>
);
		}
	}
}

export const SearchPublicationsSearchPageContainer = withTracker(function(props) {
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

})(SearchPublicationsSearchPage);
export class SearchPublicationsSearchPageMenu extends Component {
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
	<ul id="menu-items" className="nav nav-tabs nav-pills">
		<li id="menu-item-simple" className={menuItemClass('search.publications_search.filter_search')}>
			<a href={pathFor('search.publications_search.filter_search', {})}>
				<span className="item-title">
					Filter Search
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('search.publications_search.semantic_search')}>
			<a href={pathFor('search.publications_search.semantic_search', {})}>
				<span className="item-title">
					Semantic Search
				</span>
			</a>
		</li>
	</ul>
);
	}
}
