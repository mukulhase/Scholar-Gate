import "/imports/modules/client/globals/init.js";

import "/imports/api/collections/publications.js";
import "/imports/api/collections/reports.js";
import "/imports/api/collections/comments.js";
import "/imports/api/collections/files.js";
import "/imports/api/collections/authors.js";

import "/imports/api/collections/joins/joins.js";

import "/imports/ui/router/router.jsx";

import "/imports/ui/stylesheets/styles/styles.less";

import "/imports/ui/stylesheets/framework/bootstrap3-plugins/plugins.js";

this.globalOnRendered = function() {
	
	animateVisible();
};

Meteor.startup(function() {
	
	$(window).on("scroll resize", function() {
		animateVisible();
	});
});
