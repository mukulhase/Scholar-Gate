import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Comments} from "/imports/api/collections/comments.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class PublicationDetailsPage extends Component {
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
			<PublicationDetailsPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationDetailsPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("comment", props.routeParams.commentId)
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

				comment: Comments.findOne({_id:props.routeParams.commentId}, {})
			};
		

		
	}
	return { data: data };

})(PublicationDetailsPage);
export class PublicationDetailsPageForm extends Component {
	constructor () {
		super();

		this.state = {
			publicationDetailsPageFormErrorMessage: "",
			publicationDetailsPageFormInfoMessage: ""
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
		{this.state.publicationDetailsPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.publicationDetailsPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ publicationDetailsPageFormInfoMessage: "" });
		this.setState({ publicationDetailsPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var publicationDetailsPageFormMode = "read_only";
			if(!$("#publication-details-page-form").find("#form-cancel-button").length) {
				switch(publicationDetailsPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ publicationDetailsPageFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ publicationDetailsPageFormErrorMessage: message });
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

		FlowRouter.go("publication", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("publication", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	render() {
		return (
	<div id="publication-details-page-form" className="">
		<h2 id="component-title">
			<a href="#" id="form-back-button" className="btn btn-default" title="back" onClick={this.onBack}>
				<span className="fa fa-chevron-left">
				</span>
			</a>
			<span id="component-title-icon" className="">
			</span>
			Comment Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.publicationDetailsPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.publicationDetailsPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-content">
				<label htmlFor="content">
					Comment
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-content">
						{this.props.data.comment.content}
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
