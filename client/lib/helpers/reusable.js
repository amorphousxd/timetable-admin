Meteor.startup(function() {

    Template.registerHelper('isUserHome', function () {
        return Router.current().params.controller && Router.current().params.controller === 'home'
    });
    Template.registerHelper('isUserGenerate', function () {
        return Router.current().params.controller && Router.current().params.controller === 'generate'
    });
    Template.registerHelper('isUserOther', function () {
        return Router.current().params.controller && Router.current().params.controller === 'other'
    });
    Template.registerHelper('isUserUpdate', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update'
    });

});