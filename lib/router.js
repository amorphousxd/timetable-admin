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
        path: '/user/:id?/:controller?',
        loadingTemplate: '',
        layoutTemplate: 'userLayout',
        yieldTemplates: { 'userHome': {to: 'content'} },
        data: function() {
            var username = Router.current().params.username;
            return {
                user: Meteor.users.findOne({username: username})
                //messages: Messages.find({$or: [{from: username}, {to: username}]}),
                //documents: Documents.find({$or: [{from: username}, {to: username}]}),
                //orders: Orders.find({username: username})
            };
        },
        waitOn: function() {
            var controller = this.params.controller;
            if (controller === 'logout') {
                Meteor.logout(); Router.go('/');
            }
            if (controller == null) {
                Router.go('/user/'+this.params.id+'/home');
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
                    if (Meteor.user()) {
                        var user = Meteor.user();
                        if (user._id !== this.params.id) {
                            console.log('Not allowed to proceed. Not this user.');
                            this.stop();
                        }
                        else this.next();
                    }
                    else {
                        this.redirect('login');
                        this.stop();
                    }
                }
            }
            else {
                var user = Meteor.user();
                if (user._id !== this.params.id) {
                    this.stop();
                    this.redirect('/');
                }
                else this.next();
            }
        }
    });
})