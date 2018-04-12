import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {userEmail, userFullName} from "/imports/modules/client/account_utils";
import {PublicationList} from "../../components/publication_list/publication_list";
import { Publications } from '../../../api/collections/both/publications';


export const HomePublicationList = withTracker(function(props){
    let results = [];
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
      results = Publications.find({}, {
        // sort: [["score", "desc"]]
      }).fetch();
    }
  console.log(results);
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
        <p>You can View, Upload, Search, Claim existing publications.</p>
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
