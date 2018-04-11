import React, { Component } from "react";
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {AuthorPicker} from "../../../components/author_picker/author_picker";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Authors} from "/imports/api/collections/both/authors.js";
import {Publications} from "/imports/api/collections/both/publications.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";
import {Files} from "/imports/api/collections/both/files.js";


export class PublicationsInsertPage extends Component {
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
			<PublicationsInsertPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationsInsertPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("authors_list"),
			Meteor.subscribe("publications_null")
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

				authors_list: Authors.find({
                    userid: {
                        $exists: true
                    }
				}, {}).fetch(),
				unregistered_list: Authors.find({
                    userid: {
                    	$exists: false
                    }
				}, {}).fetch(),
				me: Authors.findOne({userid: Meteor.user()._id}, {}),
				publications_null: Publications.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

})(PublicationsInsertPage);
export class PublicationsInsertPageForm extends Component {
	constructor () {
		super();

		this.state = {
			publicationsInsertPageFormErrorMessage: "",
			publicationsInsertPageFormInfoMessage: ""
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
        $("input[name='authorsids']").val(this.props.data.me._id);
        $("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.publicationsInsertPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.publicationsInsertPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ publicationsInsertPageFormInfoMessage: "" });
		this.setState({ publicationsInsertPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var publicationsInsertPageFormMode = "insert";
			if(!$("#publications-insert-page-form").find("#form-cancel-button").length) {
				switch(publicationsInsertPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ publicationsInsertPageFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("publications", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ publicationsInsertPageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {
			},
			function(msg) {

			},
			function(values) {
                values["untaggedauthors"] = values["untaggedauthors"].split(",");
                values["authorsids"] = values["authorsids"].split(",");
                console.log(values);
				Meteor.call("publicationsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	<div id="publications-insert-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			New Publication
		</h2>
		<form role="form" onSubmit={this.onSubmit} className="form-horizontal">
			{this.state.publicationsInsertPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.publicationsInsertPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="title" className="col-sm-3 control-label">
					Title
				</label>
				<div className="input-div col-sm-9">
					<input type="text" name="title" defaultValue="" className="form-control " autoFocus="autoFocus" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-authorsids">
				<label htmlFor="authorsids" className="col-sm-3 control-label">
					Authors
				</label>
				<div className="input-div col-sm-9">
					<AuthorPicker name="authorsids" selected={[this.props.data.me]} options={this.props.data.authors_list} placeholder="List of authors"/>
				</div>
			</div>
			<div className="form-group  field-fileid">
				<label htmlFor="fileid" className="col-sm-3 control-label">
					File
				</label>
				<div className="input-div col-sm-9">
					<input type="file" id="field-fileid" className="file " multiple="false" data-show-upload="false" data-show-caption="true" data-field="fileid" onChange={this.onFileUpload} />
					<input type="hidden" name="fileid" defaultValue="" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-public">
				<label htmlFor="public" className="col-sm-3 control-label">
					&nbsp;
				</label>
				<div className="input-div col-sm-9" data-required="true">
					<div className="checkbox">
						<label>
							<input type="checkbox" defaultChecked="" name="public" data-type="bool" />
							Public
						</label>
					</div>
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-untaggedauthors">
				<label htmlFor="untaggedauthors" className="col-sm-3 control-label">
					Unregistered Authors
				</label>
				<div className="input-div col-sm-9">
                    <Typeahead
                        labelKey="name"
                        allowNew
                        newSelectionPrefix="New Author: "
                        defaultSelected={[]}
                        multiple={true}
                        options={this.props.data.unregistered_list}
                        placeholder="Authors which aren't registered on the website"
                        onChange={(e)=>{
                            $("input[name='untaggedauthors']").val(_.map(e, e=>e.name));
                        }}

                    />
                    <input type="hidden" className="form-control " name="untaggedauthors" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div btn-toolbar col-sm-9 col-sm-offset-3">
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

