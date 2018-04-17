import React, {Component} from "react";
import { Button, Label, Panel } from 'react-bootstrap';
import * as objectUtils from '../../../modules/both/object_utils';
import { Publications } from '../../../api/collections/both/publications';
import { Comments } from '../../../api/collections/both/comments';
import { Authors } from '../../../api/collections/both/authors';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Reports } from '../../../api/collections/both/reports';
import { linkhelper } from '../../pages/publications/publications';

export class PublicationSingle extends Component {
  constructor() {
    super();

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  componentDidMount() {
    x = '.panel-success, .panel-info, .panel-warning, or .panel-danger';

    Meteor.defer(function() {
      globalOnRendered();
    });
  }


  onClick(id) {
    FlowRouter.go('publication', objectUtils.mergeObjects(FlowRouter.current().params, { publicationId: id }));
  }

  render() {
    return (
      <Panel defaultExpanded={false} key={this.props.publication._id}>
        <Panel.Heading>
          <Panel.Title onClick={() => {
            this.onClick(this.props.publication._id);
          }}>{this.props.publication.title}</Panel.Title>
          By {this.props.data.authors_list.map((obj) => <Label>{obj.name}</Label>)}
          <br/>
          <Panel.Toggle componentClass="a">Read More</Panel.Toggle>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Abstract not parsed
          </Panel.Body>
        </Panel.Collapse>
        <Panel.Footer>
          {
            <a className={'btn'} href={linkhelper(this.props.publication)}>Download</a>
          }
          {<this className="props children"></this>}
        </Panel.Footer>
      </Panel>
    );
  }
}

export const PublicationSingleContainer = withTracker(function(props) {
  var isReady = function() {


    var subs = [
      Meteor.subscribe('authors_list')
      // Meteor.subscribe("reports_list"),
    ];
    var ready = true;
    _.each(subs, function(sub) {
      if (!sub.ready())
        ready = false;
    });
    return ready;
  };

  var data = {
    dataLoading: true,
    authors_list: []
  };

  if (isReady()) {
    if(!props.publication.authorsids || props.publication.authorsids.length===0){
        data = {authors_list:[]}
    }else{
        data = {
            authors_list: Authors.find({
                _id: {
                    $in: props.publication.authorsids
                }
            }, {}).fetch()
            // reports_pos: Reports.find({})
        };
    }


  }
  return { data: data };
})(PublicationSingle);

export class PublicationList extends Component {
  constructor() {
    super();

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  componentDidMount() {
    x = '.panel-success, .panel-info, .panel-warning, or .panel-danger';

    Meteor.defer(function() {
      globalOnRendered();
    });
  }


  onClick(id) {
    FlowRouter.go('publication', objectUtils.mergeObjects(FlowRouter.current().params, { publicationId: id }));
  }

  render() {
    return (
      <div className={'well well-sm'}>
        {
          (this.props.publications && this.props.publications.length > 0) ? this.props.publications.map((obj) => (
            <PublicationSingleContainer publication={obj} key={obj._id}>
            </PublicationSingleContainer>
          )) : 'No Publications'
        }

      </div>
    );
  }
}

