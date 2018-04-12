import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { pathFor, menuItemClass } from '/imports/modules/client/router_utils';
import { Loading } from '/imports/ui/pages/loading/loading.jsx';
import { mergeObjects } from '/imports/modules/both/object_utils';
import { PublicationList } from '../../components/publication_list/publication_list';
import { Publications } from '/imports/api/collections/both/publications.js';
import {Button} from "react-bootstrap";


export class ClaimPublicationPage extends Component {
  constructor() {
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
                <PublicationList publications={this.props.data.publications}>
                  <Button bsStyle={'success'}> Claim </Button>
                </PublicationList>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export const ClaimPublicationPageContainer = withTracker(function(props) {
  var isReady = function() {


    var subs = [
      Meteor.subscribe('claim_publications')
    ];
    var ready = true;
    _.each(subs, function(sub) {
      if (!sub.ready())
        ready = false;
    });
    return ready;
  };

  var data = { dataLoading: true };

  if (isReady()) {


    data = {
      publications: Publications.find().fetch()
    };


  }
  return { data: data };

})(ClaimPublicationPage);
