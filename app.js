//NAMESPCING APP
var App = {
  Models : {},
	Collections: {},	
	Views: {},
	Router: {}
};
 


//DECLARING MODEL
App.Models.Post = Backbone.Model.extend({});
 
// DECLARING Collection
App.Collections.Blog = Backbone.Collection.extend({
	model: App.Models.Post,
	url: 'posts.php'
});
 
// DECLARING BLOG VIEW
App.Views.BlogList = Backbone.View.extend({

	initialize: function(){
		_.bindAll(this, 'addViews');
		this.collection = new App.Collections.Blog();
		this.collection.on('reset', this.render, this);
		this.collection.fetch({reset: true});
		//console.log('initialize function');
	},
	render: function(){
		//console.log(this.collection);
		var _this = this;
		this.views = [];

		this.collection.each(this.addViews);

		return this;
	},

	addViews: function(model){
		var view = new App.Views.BlogItem({
			model: model
		});
		this.$el.append(view.render().el);
		this.views.push(view);
	},

	remove: function() {
		_.each(this.views, function(view) {
			view.remove();
		});
	}
	
});

App.Views.BlogItem = Backbone.View.extend({

	template: _.template($('#posts_template').html()),

	tagName: 'li',

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
 
 
App.blogView = new App.Views.BlogList({el: '#posts-container'});
