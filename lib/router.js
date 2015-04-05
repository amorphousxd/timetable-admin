var onBeforeActions = {
    loginRequired: function(pause) {
        if (!Meteor.user()) {
            if (Meteor.loggingIn()) {}
            else {
                this.redirect('/');
            }
        }
        else {
            this.next();
        }
    }
};

Router.onBeforeAction(onBeforeActions.loginRequired, {
    only: ['user']
});

Router.map(function() {
    this.route('main', {
        path: '/',
        layoutTemplate: 'mainLayout',
        yieldTemplates: { 'staticMain': {to: 'content'} }
    });
    this.route('signup', {
        path: '/signup',
        layoutTemplate: 'mainLayout',
        yieldTemplates: { 'staticSignup': {to: 'content'} }
    });

    this.route('about', {
        path: '/about',
        layoutTemplate: 'mainLayout',
        yieldTemplates: { 'staticAbout': {to: 'content'} }
    });

    this.route('user', {
        path: '/user/:controller/:model?/:id?',
        loadingTemplate: '',
        layoutTemplate: 'userLayout',
        yieldTemplates: { 'userHome': {to: 'content'} },
        data: function() {
            return {
                user: Meteor.users.findOne({_id: Meteor.userId()}),
                organizations: Organizations.find({}),
                groups: Groups.find({}),
                faculties: Faculties.find({})
            };
        },
        waitOn: function() {
            var controller = this.params.controller;
            var model = this.params.model;
            var user = Meteor.users.findOne({_id: Meteor.userId()});

            if (controller === 'logout') {
                Meteor.logout();
                Router.go('/');
            }
            if (controller == null) {
                Router.go('/user/home');
            }
            if(controller === 'update' && model == null){
                Router.go('/user/update/objects')
            }
            else {
                return [
                    Meteor.subscribe("userOrganizations", Meteor.userId()),
                    Meteor.subscribe("userObjects", Meteor.userId()),
                    Meteor.subscribe("userGroups", Meteor.userId()),
                    Meteor.subscribe("userFaculties", Meteor.userId())
                ];
            }
        }
    });
})