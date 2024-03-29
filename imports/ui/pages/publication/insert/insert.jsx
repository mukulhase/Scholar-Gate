import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Comments} from "/imports/api/collections/both/comments.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class PublicationInsertPage extends Component {
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
			<PublicationInsertPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationInsertPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("comments_null")
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

				comments_null: Comments.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

})(PublicationInsertPage);
export class PublicationInsertPageForm extends Component {
	constructor () {
		super();

		this.state = {
			publicationInsertPageFormErrorMessage: "",
			publicationInsertPageFormInfoMessage: ""
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
		{this.state.publicationInsertPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.publicationInsertPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ publicationInsertPageFormInfoMessage: "" });
		this.setState({ publicationInsertPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var publicationInsertPageFormMode = "insert";
			if(!$("#publication-insert-page-form").find("#form-cancel-button").length) {
				switch(publicationInsertPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ publicationInsertPageFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("publication", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ publicationInsertPageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("commentsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("publication", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	

	render() {
		return (
	<div id="publication-insert-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			New Comment
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.publicationInsertPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.publicationInsertPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-content">
				<label htmlFor="content">
					Comment
				</label>
				<div className="input-div">
					<input type="text" name="content" defaultValue="" className="form-control " autoFocus="autoFocus" required="required" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div btn-toolbar">
					<a href="#" id="form-cancel-button" className="btn btn-default" onClick={this.onCancel}>
						Cancel
					</a>
					<button id="form-submit-button" className="btn btn-success" type="submit">
						Save
					</button>
				</div>
			</div>
		</form>
	</div>
);
	}
}
