import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";


export class SearchPublicationsSearchSemanticSearchPage extends Component {
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
		</div>
	</div>
);
		}
	}
}

export class SearchPublicationssemanticfilterSearchPage extends Component {
    constructor() {
        super();

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {


        Meteor.defer(function () {
            globalOnRendered();
        });
    }


    render() {
        if (this.props.data.dataLoading) {
            return (
				<Loading/>
            );
        } else {
            return (
				<div>
					<div className="page-container container" id="content">
						<div className="row" id="title_row">
							<div className="col-md-12">
							</div>
						</div>
						<SearchPublicationssemanticfilterSearchPagePublicationFilter data={this.props.data}
																				   routeParams={this.props.routeParams}/>
					</div>
				</div>
            );
        }
    }
}

export const SearchPublicationssemanticfilterSearchPageContainer = withTracker(function (props) {
    var isReady = function () {


        var subs = [
            Meteor.subscribe("authors_list"),
        ];
        var ready = true;
        _.each(subs, function (sub) {
            if (!sub.ready())
                ready = false;
        });
        return ready;
    };

    var data = {dataLoading: true};

    if (isReady()) {


        data = {
            authors_list: Authors.find({}, {}).fetch()
        };


    }
    return {data: data};

})(SearchPublicationssemanticfilterSearchPage);


export const QueryPublicationList = withTracker(function(props){
    let results = [];
    let values = props.query;
    if (!values){
        return {publications: []}
    }
    console.log(values);
    var isReady = function () {
        var subs = [
            Meteor.subscribe("publication_search", values.title),
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
                authorsids: {
                    $elemMatch: {
                        $in: values.authorsids
                    }
                }
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

export class SearchPublicationssemanticfilterSearchPagePublicationFilter extends Component {
    constructor() {
        super();

        this.state = {
            searchPublicationssemanticfilterSearchPagePublicationFilterErrorMessage: "",
            searchPublicationssemanticfilterSearchPagePublicationFilterInfoMessage: "",
            results:[]
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

    }

    renderErrorMessage() {
        return (
			<div className="alert alert-warning">
                {this.state.searchPublicationssemanticfilterSearchPagePublicationFilterErrorMessage}
			</div>
        );
    }

    renderInfoMessage() {
        return (
			<div className="alert alert-success">
                {this.state.searchPublicationssemanticfilterSearchPagePublicationFilterInfoMessage}
			</div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({searchPublicationssemanticfilterSearchPagePublicationFilterInfoMessage: ""});
        this.setState({searchPublicationssemanticfilterSearchPagePublicationFilterErrorMessage: ""});

        var self = this;
        var $form = $(e.target);

        function submitAction(result, msg) {
            var searchPublicationssemanticfilterSearchPagePublicationFilterMode = "insert";
            if (!$("#search-publications-search-filter-search-page-publication-filter").find("#form-cancel-button").length) {
                switch (searchPublicationssemanticfilterSearchPagePublicationFilterMode) {
                    case "insert": {
                        $form[0].reset();
                    }
                        ;
                        break;

                    case "update": {
                        var message = msg || "Saved.";
                        self.setState({searchPublicationssemanticfilterSearchPagePublicationFilterInfoMessage: message});
                    }
                        ;
                        break;
                }
            }

            /*SUBMIT_REDIRECT*/
        }

        function errorAction(msg) {
            msg = msg || "";
            var message = msg.message || msg || "Error.";
            self.setState({searchPublicationssemanticfilterSearchPagePublicationFilterErrorMessage: message});
        }

        formUtils.validateForm(
            $form,
            function (fieldName, fieldValue) {

            },
            function (msg) {

            },
            function (values) {
                if (values.authorsids == ""){
                    values.authorsids = []
                }else{
                    values.authorsids = values.authorsids.split(',');
                }
                self.setState({query: values})
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
                    {this.state.searchPublicationssemanticfilterSearchPagePublicationFilterErrorMessage ? this.renderErrorMessage() : null}
                    {this.state.searchPublicationssemanticfilterSearchPagePublicationFilterInfoMessage ? this.renderInfoMessage() : null}
					<div className="form-group  field-title">
						<label htmlFor="title">
							Title
						</label>
						<div className="input-div">
							<input type="text" name="title" defaultValue="" className="form-control "
								   autoFocus="autoFocus" data-type="string"/>
							<span id="help-text" className="help-block"/>
							<span id="error-text" className="help-block"/>
						</div>
					</div>
					<div className="form-group  field-authorsids">
						<label htmlFor="authorsids">
							Authors
						</label>
						<AuthorPicker name="authorsids" selected={[]} options={this.props.data.authors_list} placeholder="List of authors"/>
					</div>
					<div className="form-group">
						<input type={"submit"} className="submit-div btn-toolbar" />
					</div>
				</form>
				<QueryPublicationList query={this.state.query} />
			</div>
        );
    }
}
