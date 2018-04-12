import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Authors} from "/imports/api/collections/both/authors.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class SearchAuthorSearchDetailsPage extends Component {
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
				</div>
			</div>
			<SearchAuthorSearchDetailsPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const SearchAuthorSearchDetailsPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
      Meteor.subscribe('author', props.routeParams.authorId)
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

				author1: Authors.findOne({_id:props.routeParams.authorId}, {})
			};
		

		
	}
	return { data: data };

})(SearchAuthorSearchDetailsPage);
export class SearchAuthorSearchDetailsPageForm extends Component {
	constructor () {
		super();

		this.state = {
			searchAuthorSearchDetailsPageFormErrorMessage: "",
			searchAuthorSearchDetailsPageFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.searchAuthorSearchDetailsPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.searchAuthorSearchDetailsPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ searchAuthorSearchDetailsPageFormInfoMessage: "" });
		this.setState({ searchAuthorSearchDetailsPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var searchAuthorSearchDetailsPageFormMode = "read_only";
			if(!$("#search-author-search-details-page-form").find("#form-cancel-button").length) {
				switch(searchAuthorSearchDetailsPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ searchAuthorSearchDetailsPageFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ searchAuthorSearchDetailsPageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("search.author_search", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("search.author_search", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		return (
	<div id="search-author-search-details-page-form" className="">
		<h2 id="component-title">
			<span id="form-back-button">
				<a href="#" className="btn btn-default" title="back" onClick={this.onBack}>
					<span className="fa fa-chevron-left">
					</span>
				</a>
				&nbsp;
			</span>
			<span id="component-title-icon" className="">
			</span>
			Author Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.searchAuthorSearchDetailsPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.searchAuthorSearchDetailsPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-name">
				<label htmlFor="name">
					Name
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-name">
						{this.props.data.author1.name}
					</p>
				</div>
			</div>
			<div className="form-group  field-email">
				<label htmlFor="email">
					Email
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-email">
						{this.props.data.author1.email}
					</p>
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div btn-toolbar">
					<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
						OK
					</a>
				</div>
			</div>
		</form>
	</div>
);
	}
}
