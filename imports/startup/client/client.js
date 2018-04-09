import "/imports/modules/client/globals/init.js";

import "/imports/api/collections/both/publications.js";
import "/imports/api/collections/both/reports.js";
import "/imports/api/collections/both/comments.js";
import "/imports/api/collections/both/files.js";
import "/imports/api/collections/both/authors.js";

import "/imports/api/collections/both/joins/joins.js";

import "/imports/ui/router/router.jsx";

import "/imports/ui/stylesheets/styles/styles.less";
import "/imports/ui/stylesheets/styles/animate_visible.js";

import "/imports/ui/stylesheets/framework/bootstrap3-plugins/plugins.js";

this.globalOnRendered = function() {
	
	animateVisible();
};

Meteor.startup(function() {
	
	$(window).on("scroll resize", function() {
		animateVisible();
	});
});
