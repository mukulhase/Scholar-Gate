import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Authors} from "/imports/api/collections/both/authors.js";
import {Publications} from "/imports/api/collections/both/publications.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";
import {Files} from "/imports/api/collections/both/files.js";


export class PublicationsUpdatePage extends Component {
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
			<PublicationsUpdatePageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationsUpdatePageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("authors_list"),
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

				authors_list: Authors.find({}, {}).fetch(),
				publication: Publications.findOne({_id:props.routeParams.publicationId}, {})
			};
		

		
	}
	return { data: data };

})(PublicationsUpdatePage);
export class PublicationsUpdatePageForm extends Component {
	constructor () {
		super();

		this.state = {
			publicationsUpdatePageFormErrorMessage: "",
			publicationsUpdatePageFormInfoMessage: ""
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
		{this.state.publicationsUpdatePageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.publicationsUpdatePageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ publicationsUpdatePageFormInfoMessage: "" });
		this.setState({ publicationsUpdatePageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var publicationsUpdatePageFormMode = "update";
			if(!$("#publications-update-page-form").find("#form-cancel-button").length) {
				switch(publicationsUpdatePageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ publicationsUpdatePageFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("publications", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ publicationsUpdatePageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("publicationsUpdate", self.props.data.publication._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("publications", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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

	onFileUpload(e) {
	e.preventDefault();
	var fileInput = $(e.currentTarget);
	var dataField = fileInput.attr("data-field");
	var hiddenInput = fileInput.closest("form").find("input[name='" + dataField + "']");

	FS.Utility.eachFile(e, function(file) {
		Files.insert(file, function (err, fileObj) {
			if(err) {
				console.log(err);
			} else {
				hiddenInput.val(fileObj._id);
			}
		});
	});
}


	

	render() {
		return (
	<div id="publications-update-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Edit Publication
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.publicationsUpdatePageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.publicationsUpdatePageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="title">
					Title
				</label>
				<div className="input-div">
					<input type="text" name="title" defaultValue={this.props.data.publication.title} className="form-control " autoFocus="autoFocus" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-authorsids">
				<label htmlFor="authorsids">
					Authors
				</label>
				<div className="input-div">
					<select multiple="multiple" className="form-control " name="authorsids" data-type="array" defaultValue={[this.props.data.publication.authorsids]}>
						{this.props.data.authors_list.map(function(item, index) { return(
						<option key={"dynamic-" + index} value={item._id}>							{item.name}</option>
						); }) }
					</select>
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-fileid">
				<label htmlFor="fileid">
					File
				</label>
				<div className="input-div">
					<input type="file" id="field-fileid" className="file " multiple="false" data-show-upload="false" data-show-caption="true" data-field="fileid" onChange={this.onFileUpload} />
					<input type="hidden" name="fileid" defaultValue={this.props.data.publication.fileid} />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-public">
				<div className="input-div" data-required="true">
					<div className="checkbox">
						<label>
							<input type="checkbox" defaultChecked={this.props.data.publication.public} name="public" data-type="bool" defaultChecked={formUtils.itemIsChecked(this.props.data.publication.public, true)} />
							Public
						</label>
					</div>
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-untaggedauthors">
				<label htmlFor="untaggedauthors">
					Unregistered Authors
				</label>
				<div className="input-div">
					<select multiple="multiple" data-role="tagsinput" className="form-control " name="untaggedauthors" data-type="array">
						{objectUtils.getArray(this.props.data.publication.untaggedauthors).map(function(tag, ndx) {
					return(
						<option key={ndx} value={tag} id="form-input-tags-item">							{tag}</option>
						);
				})}
					</select>
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
