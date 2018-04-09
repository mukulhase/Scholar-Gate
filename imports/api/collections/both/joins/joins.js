import {Publications} from "/imports/api/collections/both/publications.js";
import {Users} from "meteor-user-roles";
import {Comments} from "/imports/api/collections/both/comments.js";
import {Reports} from "/imports/api/collections/both/reports.js";
import {Files} from "/imports/api/collections/both/files.js";
import {Authors} from "/imports/api/collections/both/authors.js";

// Publications
Publications.join(Users, "authorsids", "authors", ["name"]);
Publications.join(Comments, "commentsids", "comments", ["content", "user"]);
Publications.join(Reports, "reportsids", "reports", []);
Publications.join(Files.files, "fileid", "file");

// Authors
Authors.join(Users, "userid", "user", ["name"]);

