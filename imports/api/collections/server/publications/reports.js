import {Meteor} from "meteor/meteor";
import {Reports} from "/imports/api/collections/both/reports.js";
import { Publications } from '../../both/publications';

Meteor.publish('list_reports', function() {
  return Reports.publishJoinedCursors(Reports.find({}, {}));
});