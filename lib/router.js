var onBeforeActions = {
    loginRequired: function(pause) {
        if (!Meteor.userId()) {
            this.render('/');
        } else {
            this.next();
        }
    }
};

/*Router.onBeforeAction(onBeforeActions.loginRequired, {
    only: ['user', 'about']
});*/

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
        path: '/user/:controller',
        loadingTemplate: '',
        layoutTemplate: 'userLayout',
        yieldTemplates: { 'userHome': {to: 'content'} },
        data: function() {
            console.log(Meteor.user())
            return {
                user: Meteor.users.findOne({_id: Meteor.userId()})
                //messages: Messages.find({$or: [{from: username}, {to: username}]}),
                //documents: Documents.find({$or: [{from: username}, {to: username}]}),
                //orders: Orders.find({username: username})
            };
        },
        waitOn: function() {
            var controller = this.params.controller;
            if (controller === 'logout') {
                Meteor.logout();
                Router.go('/');
            }
            if (controller == null) {
                Router.go('/user/home');
            }
            else {
                return [
                    //Meteor.subscribe("userProfile", this.params.username),
                    //Meteor.subscribe("userMessages", this.params.username),
                    //Meteor.subscribe("userDocuments", this.params.username),
                    //Meteor.subscribe("userOrders", this.params.username),
                    //Meteor.subscribe("meta")
                ];
            }
        },
        onBeforeAction: function(){
            if (!Meteor.user()) {
                if (Meteor.loggingIn()) {}
                else {
                    console.log('abc');
                    this.redirect('/');
                }
            }
            else {
                this.next();
            }
        }
    });
})