import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {userEmail, userFullName} from "/imports/modules/client/account_utils";
import {PublicationList} from "../../components/publication_list/publication_list";


export const HomePublicationList = withTracker(function(props){
    let results = [];
    let values = props.query;
    if (!values){
        return {publications: []}
    }
    console.log(values);
    var isReady = function () {
        var subs = [
            Meteor.subscribe("publication_list"),
        ];
        var ready = true;
        _.each(subs, function (sub) {
            if (!sub.ready())
                ready = false;
        });
        return ready;
    };
    if (isReady()) {
        if (values.authorsids.length > 0) {
            results = Publications.find({
            }, {
                // sort: [["score", "desc"]]
            }).fetch();
        } else {
            results = Publications.find({
            }, {
            }).fetch();
        }
    }
    // Meteor.subscribe("publication_list", values.title);
    return {publications: results}
})(PublicationList);

export class HomePrivatePage extends Component {
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
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
					<h2 id="page_title" className="pull-left">
						Welcome {userFullName()}!
					</h2>
				</div>
			</div>
			<HomePublicationList/>
		</div>
	</div>
);
		}
	}
}

export const HomePrivatePageContainer = withTracker(function(props) {
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

})(HomePrivatePage);
