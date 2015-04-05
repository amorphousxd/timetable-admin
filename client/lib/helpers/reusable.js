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

    // List

    Template.registerHelper('isUserListGroups', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'groups'
    });
    Template.registerHelper('isUserListAuditories', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'auditories'
    });
    Template.registerHelper('isUserListObjects', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'objects'
    });

    // Update

    Template.registerHelper('isUserUpdateGroups', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update'
    });

});