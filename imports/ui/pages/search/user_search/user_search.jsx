import React, {Component} from "react";
import {createContainer, withTracker} from "meteor/react-meteor-data";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import * as formUtils from "/imports/modules/client/form_utils";


export class SearchUserSearchPage extends Component {
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
			<SearchUserSearchPageSearchUsers data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const SearchUserSearchPageContainer = withTracker(function(props) {
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

})(SearchUserSearchPage);
export class SearchUserSearchPageSearchUsers extends Component {
	constructor () {
		super();

		this.state = {
			searchUserSearchPageSearchUsersErrorMessage: "",
			searchUserSearchPageSearchUsersInfoMessage: ""
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
		{this.state.searchUserSearchPageSearchUsersErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.searchUserSearchPageSearchUsersInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ searchUserSearchPageSearchUsersInfoMessage: "" });
		this.setState({ searchUserSearchPageSearchUsersErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var searchUserSearchPageSearchUsersMode = "insert";
			if(!$("#search-user-search-page-search-users").find("#form-cancel-button").length) {
				switch(searchUserSearchPageSearchUsersMode) {
					case "insert": {
						$form[0].reset();
                    }
                        break;
                    case "update": {
						var message = msg || "Saved.";
						self.setState({ searchUserSearchPageSearchUsersInfoMessage: message });
                    }
                        break;
                }
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ searchUserSearchPageSearchUsersErrorMessage: message });
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

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	render() {
		return (
	<div id="search-user-search-page-search-users" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.searchUserSearchPageSearchUsersErrorMessage ? this.renderErrorMessage() : null}
					{this.state.searchUserSearchPageSearchUsersInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group">
				<div className="submit-div btn-toolbar">
				</div>
			</div>
		</form>
	</div>
);
	}
}
