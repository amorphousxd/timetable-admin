Meteor.startup(function() {

    Template.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

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
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'groups' && Router.current().params.id == null;
    });
    Template.registerHelper('isUserListAuditories', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'auditories'
    });
    Template.registerHelper('isUserListObjects', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'objects'
    });

    // Update

    Template.registerHelper('isUserUpdateGroups', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'groups' && Router.current().params.id != null;
    });

    Template.registerHelper('isUserUpdateAuditories', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'auditories' && Router.current().params.id != null;
    });

    Template.registerHelper('isUserUpdateObjects', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'objects' && Router.current().params.id != null;
    });

    Template.registerHelper('isUserUpdateFaculties', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'faculties' && Router.current().params.id != null;
    });

    // Work

    Template.registerHelper('isUserWorkGroups', function () {
        return Router.current().params.controller && Router.current().params.controller === 'update' && Router.current().params.model === 'groups';
    });
});