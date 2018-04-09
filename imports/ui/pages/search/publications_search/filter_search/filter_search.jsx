import React, {Component} from "react";
import {createContainer, withTracker} from "meteor/react-meteor-data";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import * as objectUtils from "/imports/modules/both/object_utils";
import {Authors} from "/imports/api/collections/authors.js";
import {Publications} from "/imports/api/collections/publications.js";
import * as formUtils from "/imports/modules/client/form_utils";


export class SearchPublicationsSearchFilterSearchPage extends Component {
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
			<SearchPublicationsSearchFilterSearchPagePublicationFilter data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const SearchPublicationsSearchFilterSearchPageContainer = withTracker(function(props) {
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

				authors_list: Authors.find({}, {}).fetch(),
				publications_null: Publications.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

})(SearchPublicationsSearchFilterSearchPage);
export class SearchPublicationsSearchFilterSearchPagePublicationFilter extends Component {
	constructor () {
		super();

		this.state = {
			searchPublicationsSearchFilterSearchPagePublicationFilterErrorMessage: "",
			searchPublicationsSearchFilterSearchPagePublicationFilterInfoMessage: ""
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
		{this.state.searchPublicationsSearchFilterSearchPagePublicationFilterErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.searchPublicationsSearchFilterSearchPagePublicationFilterInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ searchPublicationsSearchFilterSearchPagePublicationFilterInfoMessage: "" });
		this.setState({ searchPublicationsSearchFilterSearchPagePublicationFilterErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var searchPublicationsSearchFilterSearchPagePublicationFilterMode = "insert";
			if(!$("#search-publications-search-filter-search-page-publication-filter").find("#form-cancel-button").length) {
				switch(searchPublicationsSearchFilterSearchPagePublicationFilterMode) {
					case "insert": {
						$form[0].reset();
                    }
                        break;
                    case "update": {
						var message = msg || "Saved.";
						self.setState({ searchPublicationsSearchFilterSearchPagePublicationFilterInfoMessage: message });
                    }
                        break;
                }
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ searchPublicationsSearchFilterSearchPagePublicationFilterErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("publicationsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	render() {
		return (
	<div id="search-publications-search-filter-search-page-publication-filter" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
		</h2>
		<form role="form" onSubmit={this.onSubmit} className="form-inline">
			{this.state.searchPublicationsSearchFilterSearchPagePublicationFilterErrorMessage ? this.renderErrorMessage() : null}
					{this.state.searchPublicationsSearchFilterSearchPagePublicationFilterInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="title">
					Title
				</label>
				<div className="input-div">
					<input type="text" name="title" defaultValue="" className="form-control " autoFocus="autoFocus" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-authorsids">
				<label htmlFor="authorsids">
					Authors
				</label>
				<div className="input-div">
					<select multiple="multiple" className="form-control " name="authorsids" data-type="array">
						{this.props.data.authors_list.map(function(item, index) { return(
						<option key={"dynamic-" + index} value={item._id}>							{item.name}</option>
						); }) }
					</select>
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
						{objectUtils.getArray("").map(function(tag, ndx) {
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
				</div>
			</div>
		</form>
	</div>
);
	}
}
