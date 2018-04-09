import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Publications} from "/imports/api/collections/both/publications.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class PublicationsDetailsPage extends Component {
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
			<PublicationsDetailsPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationsDetailsPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("publication", props.routeParams.publicationId)
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

				publication: Publications.findOne({_id:props.routeParams.publicationId}, {})
			};
		

		
	}
	return { data: data };

})(PublicationsDetailsPage);
export class PublicationsDetailsPageForm extends Component {
	constructor () {
		super();

		this.state = {
			publicationsDetailsPageFormErrorMessage: "",
			publicationsDetailsPageFormInfoMessage: ""
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
		{this.state.publicationsDetailsPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.publicationsDetailsPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ publicationsDetailsPageFormInfoMessage: "" });
		this.setState({ publicationsDetailsPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var publicationsDetailsPageFormMode = "read_only";
			if(!$("#publications-details-page-form").find("#form-cancel-button").length) {
				switch(publicationsDetailsPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ publicationsDetailsPageFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ publicationsDetailsPageFormErrorMessage: message });
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

		FlowRouter.go("publications", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("publications", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		return (
	<div id="publications-details-page-form" className="">
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
			Publication Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.publicationsDetailsPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.publicationsDetailsPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="title">
					Title
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-title">
						{this.props.data.publication.title}
					</p>
				</div>
			</div>
			<div className="form-group  field-authorsids">
				<label htmlFor="authorsids">
					Authors
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-authorsids">
						{this.props.data.publication.authorsids}
					</p>
				</div>
			</div>
			<div className="form-group  field-fileid">
				<label htmlFor="fileid">
					File
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-fileid">
						{this.props.data.publication.fileid}
					</p>
				</div>
			</div>
			<div className="form-group  field-public">
				<label htmlFor="public">
					Public
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-public">
						{this.props.data.publication.public}
					</p>
				</div>
			</div>
			<div className="form-group  field-untaggedauthors">
				<label htmlFor="untaggedauthors">
					Unregistered Authors
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-untaggedauthors">
						{this.props.data.publication.untaggedauthors}
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
