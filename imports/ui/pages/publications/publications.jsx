import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Publications} from "/imports/api/collections/both/publications.js";
import {Authors} from "/imports/api/collections/both/authors.js";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as httpUtils from "/imports/modules/client/http_utils";
import {Markdown} from "/imports/ui/components/markdown/markdown.jsx";
import {ConfirmationDialog} from "/imports/ui/components/confirmation_dialog/confirmation_dialog.jsx";

export const linkhelper = (data) => {
  return data.file.original ? 'https://s3-ap-southeast-1.amazonaws.com/scholargate/uploads/files/' + data.fileid + '-' + data.file.original.name : 'Not uploaded';
};

export class PublicationsPage extends Component {
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
			<PublicationsPageView data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const PublicationsPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("my_publication_list"),
            Meteor.subscribe("authors_list"),
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
				publication_list: Publications.find({
                    authorsids:{
                        $elemMatch:{
                            $eq: Authors.findOne({userid: Meteor.user()._id}, {})._id
                        }
                    }
                }, {}).fetch(),
				authors_list: Authors.find({}, {}).fetch()
			};
		
	}
	return { data: data };

})(PublicationsPage);
export class PublicationsPageView extends Component {
	constructor () {
		super();

		this.state = {
			PublicationsPageViewSearchString: "",
			PublicationsPageViewSortBy: "",
			PublicationsPageViewStyle: "table"
		};

		this.isNotEmpty = this.isNotEmpty.bind(this);
		this.isNotFound = this.isNotFound.bind(this);
		this.onInsert = this.onInsert.bind(this);
		this.onSearchInputChange = this.onSearchInputChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSort = this.onSort.bind(this);
		this.exportData = this.exportData.bind(this);
		this.onExportCSV = this.onExportCSV.bind(this);
		this.onExportTSV = this.onExportTSV.bind(this);
		this.onExportJSON = this.onExportJSON.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderBlog = this.renderBlog.bind(this);
		this.renderCards = this.renderCards.bind(this);
		this.renderData = this.renderData.bind(this);

		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		
	}

	isNotEmpty() {
		return this.props.data.publication_list && this.props.data.publication_list.length > 0;
	}

	isNotFound() {
		return this.props.data.publication_list && this.props.data.publication_list.length == 0 && this.state.PublicationsPageViewSearchString;
	}

	onInsert(e) {
		FlowRouter.go("publications.insert", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onSearchInputChange(e) {
		this.setState({PublicationsPageViewSearchString: e.target.value});
	}

	onSearch(e) {
		e.preventDefault();
		let form = $(e.currentTarget).parent();
		let searchInput = form.find("#dataview-search-input");
		searchInput.focus();
		let searchString = searchInput.val();
		this.setState({ PublicationsPageViewSearchString: searchString });
	}

	onSort(e) {
		e.preventDefault();
		let sortBy = $(e.currentTarget).attr("data-sort");
		this.setState({ PublicationsPageViewSortBy: sortBy });
	}

	exportData(data, fileType) {
		let exportFields = [];

		let str = objectUtils.exportArrayOfObjects(data, exportFields, fileType);

		let filename = "export." + fileType;

		httpUtils.downloadLocalResource(str, filename, "application/octet-stream");
	}

	onExportCSV(e) {
		this.exportData(this.props.data.publication_list, "csv");
	}

	onExportTSV(e) {
		this.exportData(this.props.data.publication_list, "tsv");
	}

	onExportJSON(e) {
		this.exportData(this.props.data.publication_list, "json");
	}

	renderTable() {
		var self = this;
		var parentData = {};
        authors_list = this.props.data.authors_list;
        return (
	<div id="dataview-data-table">
		<table id="dataview-table" className="table table-striped table-hover">
			<thead id="dataview-table-header">
				<tr id="dataview-table-header-row">
					<th className="th-sortable" data-sort="title" onClick={this.onSort}>
						Title
					</th>
					<th className="th-sortable" data-sort="authorsids" onClick={this.onSort}>
						Authors
					</th>
					<th>
						File
					</th>
					<th className="th-sortable" data-sort="public" onClick={this.onSort}>
						Public
					</th>
					<th className="th-sortable" data-sort="untaggedauthors" onClick={this.onSort}>
						Unregistered Authors
					</th>
					<th>
						&nbsp;
					</th>
					<th>
						&nbsp;
					</th>
				</tr>
			</thead>
			<tbody id="dataview-table-items">
				{this.props.data.publication_list.map(function(item) {
			return(
				<PublicationsPageViewTableItems key={item._id} data={item} authors={authors_list} routeParams={self.props.routeParams} onDelete={self.onDelete} parentData={parentData} />
				);
		})}
			</tbody>
		</table>
	</div>
);
	}

	renderList() {
		var self = this;
		return (
	<div id="dataview-data-list">
	</div>
);
	}

	renderBlog() {
		var self = this;
		return (
	<div id="dataview-data-blog">
	</div>
);
	}

	renderCards() {
		var self = this;
		return (
	<div id="dataview-data-cards">
	</div>
);
	}

	renderData() {
		let viewStyle = this.state.PublicationsPageViewStyle || "table";
		switch(viewStyle) {
			case "table": return this.renderTable(); break;
			case "blog": return this.renderBlog(); break;
			case "list" : return this.renderList(); break;
			case "cards": return this.renderCards(); break;
			default: return this.renderTable();
		}
	}

	insertButtonClass() {
		return Publications.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	}

	

	

	render() {
		return (
	<div id="publications-page-view" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Publications
		</h2>
		<div className="row">
			<div className="col-md-12">
				<form id="dataview-controls" className="form-inline">
					<div id="dataview-controls-insert" className={`form-group ${this.insertButtonClass()}`}>
						<button type="button" id="dataview-insert-button" className="btn btn-success" onClick={this.onInsert}>
							<span className="fa fa-plus">
							</span>
							&nbsp;Add new
						</button>
						&nbsp;
					</div>
					<div id="dataview-controls-search" className="form-group">
						<div id="dataview-controls-search-group" className="input-group">
							<input type="text" className="form-control" id="dataview-search-input" placeholder="Search" name="search" defaultValue={this.state.PublicationsPageViewSearchString} onChange={this.onSearchInputChange} autoFocus={true} />
							<span className="input-group-btn">
								<button type="submit" id="dataview-search-button" className="btn btn-primary" onClick={this.onSearch}>
									<span className="fa fa-search">
									</span>
								</button>
							</span>
						</div>
						&nbsp;
					</div>
				</form>
			</div>
		</div>
		{this.isNotEmpty() ? this.renderData() : (this.isNotFound() ?
		<div className="alert alert-warning">
			{"\"" + this.state.PublicationsPageViewSearchString + "\" not found."}
		</div>
		:
		<div className="alert alert-info">
			Empty.
		</div>
		)}
	</div>
);
	}
}
export class PublicationsPageViewTableItems extends Component {
	constructor() {
		super();
		this.onToggle = this.onToggle.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSelect = this.onSelect.bind(this);
		
	}

	onToggle(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		let toggleField = $(e.currentTarget).attr("data-field");

		let data = {};
		data[toggleField] = !this.props.data[toggleField];

		Meteor.call("publicationsUpdate", itemId, data, function(err, res) {
			if(err) {
				alert(err);
			}
		});
	}

	onEdit(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		FlowRouter.go("publications.update", objectUtils.mergeObjects(FlowRouter.current().params, {publicationId: this.props.data._id}));
	}

	onDelete(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		ConfirmationDialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			onYes: function(id) {
				Meteor.call("publicationsRemove", id, function(err, res) {
					if(err) {
						alert(err);
					}
				});
			},
			onNo: null,
			onCancel: null,
			buttonYesTitle: "Yes",
			buttonNoTitle: "No",
			buttonCancelTitle: null,
			showCancelButton: false,
			payload: itemId
		});
	}

	onSelect(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;

		
		FlowRouter.go("publications.details", objectUtils.mergeObjects(FlowRouter.current().params, {publicationId: this.props.data._id}));
	}

	editButtonClass() {
		return Publications.userCanUpdate(Meteor.userId(), this.props.data) ? "" : "hidden";
	}

	deleteButtonClass() {
		return Publications.userCanRemove(Meteor.userId(), this.props.data) ? "" : "hidden";
	}

	

	

	

	

	render() {
		return(
	<tr id="dataview-table-items-row">
		<td onClick={this.onSelect}>
			{this.props.data.title}
		</td>
		<td onClick={this.onSelect}>
			{
				_.map(
					_.filter(
						this.props.authors,
						(obj => this.props.data.authorsids.indexOf(obj._id)!=-1)
					), obj=>obj.name
				)
			}
		</td>
    <td>
			{
        <a className={'btn'} href={linkhelper(this.props.data)}>Download</a>
			}
		</td>
		<td>
			<input type="checkbox" className={`inline-checkbox ${this.editButtonClass()}`} data-field="public" checked={!!this.props.data.public} onChange={this.onToggle} />
		</td>
		<td onClick={this.onSelect}>
			{this.props.data.untaggedauthors}
		</td>
		<td className="td-icon">
			<span id="edit-button" className={`fa fa-pencil ${this.editButtonClass()}`} title="Edit" onClick={this.onEdit}>
			</span>
		</td>
		<td className="td-icon">
			<span id="delete-button" className={`fa fa-trash-o ${this.deleteButtonClass()}`} title="Delete" onClick={this.onDelete}>
			</span>
		</td>
	</tr>
);
	}
}
